/**
 * Unified analytics fan-out for ChessWize.
 *
 * - PostHog: autocapture is enabled, so every <button>, <a>, and form
 *   submit gets logged automatically. We layer named events on top for
 *   high-value moments (drawer open, slot pick, etc.) so dashboards can
 *   build funnels without grovelling through CSS selectors.
 * - GA4: gtag('event', name, params) for the same named events. We
 *   don't try to mirror PostHog autocapture into GA — GA4 is for
 *   conversion-side reporting, not raw clickstream.
 * - Meta Pixel: fbq('trackCustom', name, params) for retargeting.
 *   Already used for LeadFormStart/LeadStep2/Lead via tracking.ts;
 *   `track()` here calls into that path too so a single trackEvent
 *   site fires everywhere at once.
 * - Sentry: error/breadcrumb tracking only — not for click events.
 *
 * All providers are env-var gated. If the key is missing, init is a
 * silent no-op and `track()` falls through. So a fresh dev box / a
 * preview deploy without secrets keeps working — the only effect is
 * that events don't ship anywhere. No exceptions.
 *
 * Env vars (set via `.env.local` or the Coolify build environment):
 *   VITE_POSTHOG_KEY    e.g. phc_XXXXXXXX...
 *   VITE_POSTHOG_HOST   defaults to https://app.posthog.com
 *   VITE_GA4_ID         e.g. G-XXXXXXXXXX
 *   VITE_SENTRY_DSN     e.g. https://...@oXX.ingest.sentry.io/...
 */

import posthog from "posthog-js";
import type { PostHog } from "posthog-js";

type FbqFn = (
  command: "track" | "trackCustom",
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) => void;

type GtagFn = (
  command: "config" | "event" | "set",
  target: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
    posthog?: PostHog;
    gtag?: GtagFn;
    dataLayer?: unknown[];
    Sentry?: { captureException: (err: unknown, ctx?: unknown) => void; addBreadcrumb?: (b: unknown) => void };
  }
}

let initialized = false;
let posthogReady = false;
let gaReady = false;
let sentryReady = false;

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
const POSTHOG_KEY = env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = env.VITE_POSTHOG_HOST || "https://app.posthog.com";
const GA4_ID = env.VITE_GA4_ID;
const SENTRY_DSN = env.VITE_SENTRY_DSN;
const IS_DEV = !!env.DEV;

/**
 * One-time bootstrap. Call from main.tsx before React renders.
 *
 * Each provider is initialised independently; a missing key for one
 * doesn't block the others. Errors during init are swallowed (logged
 * in dev) so a flaky third party never crashes the bundle.
 */
export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;
  if (typeof window === "undefined") return;

  // ─── PostHog (event/click stream) ────────────────────────────────
  if (POSTHOG_KEY) {
    try {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // Autocapture handles every click + form submit — saves us
        // from manually wiring 50 onClicks. Named events still fire
        // via `track()` for the high-value funnel steps.
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
        // Session recording is OFF by default — turn on later in
        // PostHog UI if you want it; recording PII without consent
        // is a DPDP concern.
        disable_session_recording: true,
        person_profiles: "identified_only",
        loaded: () => { posthogReady = true; },
      });
      window.posthog = posthog;
    } catch (err) {
      if (IS_DEV) console.warn("[analytics] PostHog init failed", err);
    }
  }

  // ─── Google Analytics 4 ──────────────────────────────────────────
  // Loaded async via gtag. The dataLayer queues commands until the
  // gtag.js script lands; once it does, the queue replays in order.
  if (GA4_ID) {
    try {
      window.dataLayer = window.dataLayer || [];
      // gtag is a thin wrapper that pushes to dataLayer.
      window.gtag = function gtag(...args: unknown[]) {
        // Cloudflare's older types are picky here — using any to avoid
        // pulling in @types/gtag.js for one helper.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.dataLayer as any).push(args);
      } as unknown as GtagFn;
      window.gtag("config", GA4_ID, { send_page_view: true });

      // Inject the gtag.js script once.
      if (!document.getElementById("__cw_ga4_script")) {
        const s = document.createElement("script");
        s.id = "__cw_ga4_script";
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
        document.head.appendChild(s);
      }
      gaReady = true;
    } catch (err) {
      if (IS_DEV) console.warn("[analytics] GA4 init failed", err);
    }
  }

  // ─── Sentry (errors only, NOT clickstream) ───────────────────────
  // Lazy-import so the @sentry/browser bundle (~50KB) never lands in
  // the main chunk when the DSN is unset.
  if (SENTRY_DSN) {
    void import("@sentry/browser").then((Sentry) => {
      try {
        Sentry.init({
          dsn: SENTRY_DSN,
          tracesSampleRate: 0.1,
          // Auto-capture browser errors + unhandled promise rejections.
          // Click breadcrumbs are added by the browser integration by
          // default; combined with PostHog's autocapture we get clicks
          // in two places (PostHog primary, Sentry as crash context).
          environment: env.MODE || "production",
        });
        window.Sentry = Sentry as unknown as Window["Sentry"];
        sentryReady = true;
      } catch (err) {
        if (IS_DEV) console.warn("[analytics] Sentry init failed", err);
      }
    }).catch((err) => {
      if (IS_DEV) console.warn("[analytics] Sentry import failed", err);
    });
  }
}

/**
 * Fire a named event to every configured destination. Falls through
 * silently if a provider is offline — never throws.
 *
 * Convention for `name`: snake_case verb_object, e.g. `demo_drawer_opened`,
 * `whatsapp_click`, `slot_selected`. Keep names stable across releases
 * so funnels don't break when we redeploy.
 */
export function track(name: string, props: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  // PostHog
  if (posthogReady && window.posthog) {
    try { window.posthog.capture(name, props); } catch { /* swallow */ }
  }

  // GA4
  if (gaReady && window.gtag) {
    try { window.gtag("event", name, props); } catch { /* swallow */ }
  }

  // Meta Pixel — fires as a custom event so it shows up in Events
  // Manager under "Custom Conversions" if you build a campaign rule
  // off it. Standard events (Lead, Contact, ViewContent) are still
  // fired separately via tracking.ts so we don't double-count those.
  if (window.fbq) {
    try { window.fbq("trackCustom", toFbqEventName(name), props); } catch { /* swallow */ }
  }

  if (IS_DEV) {
    // eslint-disable-next-line no-console
    console.debug("[track]", name, props);
  }
}

/**
 * Tag the current visitor with a stable id + traits once they've
 * given us identifying info (typically after step 1 of the form).
 * Lets PostHog stitch sessions across devices and lets GA tie
 * conversions back to specific leads.
 *
 * `id` should be the lead_sid (stable per session); pass the
 * partial-Zoho-id once we have it for de-anon.
 */
export function identifyUser(id: string, traits: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !id) return;

  if (posthogReady && window.posthog) {
    try { window.posthog.identify(id, traits); } catch { /* swallow */ }
  }
  if (gaReady && window.gtag && GA4_ID) {
    try { window.gtag("config", GA4_ID, { user_id: id }); } catch { /* swallow */ }
  }
}

/**
 * Forward a thrown error or descriptive context to Sentry. Use
 * sparingly — we don't want every form-validation failure ending up
 * here. Reserved for unexpected exceptions, payment errors, API
 * failures that hit the catch block.
 */
export function trackError(err: unknown, context: Record<string, unknown> = {}): void {
  if (sentryReady && window.Sentry) {
    try { window.Sentry.captureException(err, { extra: context }); } catch { /* swallow */ }
  }
  if (IS_DEV) {
    // eslint-disable-next-line no-console
    console.warn("[trackError]", err, context);
  }
}

/**
 * Map our snake_case event names to Meta Pixel's PascalCase convention.
 * Pixel expects custom events as a single CamelCase token; spaces or
 * underscores are silently dropped in their dashboard.
 */
function toFbqEventName(name: string): string {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
