/**
 * ChessWize Lead-capture Worker
 *
 * Runs on chesswize.in/api/*. Handles:
 *   POST /api/leads       — creates Zoho CRM Lead + emails counsellor via
 *                           Resend + fires Meta Conversions API Lead event
 *   GET  /api/health      — returns worker status + which integrations are wired
 *
 * Fails gracefully: if Zoho env vars aren't set, the lead is still emailed.
 * If Resend isn't set, the lead is still pushed to Zoho. If neither is set,
 * the worker returns 200 with `stored: false` so the frontend's WhatsApp
 * fallback kicks in for the user-facing confirmation. CAPI is always fired
 * via ctx.waitUntil so a slow Meta endpoint never delays the user response.
 */

import { capiConfigured, sendCapiLead } from "./lib/capi";

export interface Env {
  // Zoho
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_ACCOUNTS_URL?: string; // e.g. https://accounts.zoho.in
  ZOHO_API_DOMAIN?: string;   // e.g. https://www.zohoapis.in

  // Resend
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  NOTIFY_EMAIL?: string;

  // Meta Conversions API
  META_PIXEL_ID?: string;        // "1315250227040245" — defaulted in wrangler.toml [vars]
  META_CAPI_TOKEN?: string;      // wrangler secret put META_CAPI_TOKEN
  META_TEST_EVENT_CODE?: string; // optional, wrangler secret put — remove in prod

  // Misc
  ALLOWED_ORIGINS?: string;

  // KV used as an in-memory access-token cache across cold starts
  TOKEN_CACHE?: KVNamespace;
}

interface LeadBody {
  child_name?: string;
  child_age_range?: string;
  child_level?: string;
  parent_name?: string;
  parent_email?: string;
  phone?: string;
  city?: string;
  parent_concern?: string[] | string;
  parent_commitment?: string;
  referral_source?: string;
  // Honeypot
  website_url?: string;
  // Anti-spam
  form_duration_s?: number;
  // First-touch attribution captured client-side (src/lib/attribution.ts)
  attribution?: LeadAttribution;
}

interface LeadAttribution {
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
}

const json = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers as Record<string, string> | undefined),
    },
  });

// Narrow-typed whitelist validator — lightweight since the worker can't pull
// in zod without ballooning the bundle. Each field is size-capped so a bad
// actor can't stuff Zoho with huge payloads.
function str(v: unknown, max = 200): string | undefined {
  return typeof v === "string" && v.length <= max ? v : undefined;
}

function strArr(v: unknown, maxItems = 20, maxEach = 200): string[] | undefined {
  if (!Array.isArray(v) || v.length > maxItems) return undefined;
  const out: string[] = [];
  for (const item of v) {
    if (typeof item !== "string" || item.length > maxEach) return undefined;
    out.push(item);
  }
  return out;
}

function validateAttribution(raw: unknown): LeadAttribution | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const out: LeadAttribution = {};
  const keys: (keyof LeadAttribution)[] = [
    "fbp", "fbc", "fbclid", "gclid",
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "landing_page", "referrer",
  ];
  for (const k of keys) {
    const v = str(r[k], 500);
    if (v) out[k] = v;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function validateLead(raw: unknown): { ok: true; value: LeadBody } | { ok: false; reason: string } {
  if (!raw || typeof raw !== "object") return { ok: false, reason: "not_object" };
  const r = raw as Record<string, unknown>;

  const phone = str(r.phone, 40);
  if (!phone || phone.replace(/[^0-9]/g, "").length < 10) {
    return { ok: false, reason: "phone_required" };
  }

  const value: LeadBody = {
    phone,
    child_name: str(r.child_name, 120),
    child_age_range: str(r.child_age_range, 20),
    child_level: str(r.child_level, 40),
    parent_name: str(r.parent_name, 120),
    parent_email: str(r.parent_email, 200),
    city: str(r.city, 80),
    parent_commitment: str(r.parent_commitment, 80),
    referral_source: str(r.referral_source, 80),
    parent_concern: Array.isArray(r.parent_concern) ? strArr(r.parent_concern) : str(r.parent_concern as unknown, 200),
    website_url: str(r.website_url, 200),
    form_duration_s: typeof r.form_duration_s === "number" ? r.form_duration_s : undefined,
    attribution: validateAttribution(r.attribution),
  };

  return { ok: true, value };
}

const originAllowed = (env: Env, origin: string | null): boolean => {
  if (!origin) return true; // same-origin fetches have no Origin header
  const list = (env.ALLOWED_ORIGINS ?? "chesswize.in,www.chesswize.in").split(",").map(s => s.trim().toLowerCase());
  try {
    const host = new URL(origin).hostname.toLowerCase();
    return list.some(allowed => host === allowed || host.endsWith("." + allowed) || allowed === "localhost" && host.startsWith("localhost"));
  } catch {
    return false;
  }
};

/* ──────────────────────────── Zoho helpers ──────────────────────────── */

const zohoConfigured = (env: Env) =>
  !!(env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN && env.ZOHO_ACCOUNTS_URL && env.ZOHO_API_DOMAIN);

async function getZohoAccessToken(env: Env): Promise<string | null> {
  if (!zohoConfigured(env)) return null;

  // Try cache first (valid for 50min — Zoho tokens last 60)
  if (env.TOKEN_CACHE) {
    const cached = await env.TOKEN_CACHE.get("zoho_access_token");
    if (cached) return cached;
  }

  const res = await fetch(`${env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: env.ZOHO_REFRESH_TOKEN!,
      client_id: env.ZOHO_CLIENT_ID!,
      client_secret: env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json<{ access_token?: string; expires_in?: number }>();
  if (!data.access_token) return null;

  if (env.TOKEN_CACHE && data.expires_in) {
    await env.TOKEN_CACHE.put("zoho_access_token", data.access_token, { expirationTtl: Math.max(300, data.expires_in - 120) });
  }
  return data.access_token;
}

async function pushLeadToZoho(env: Env, body: LeadBody): Promise<{ ok: boolean; id?: string; error?: string }> {
  const token = await getZohoAccessToken(env);
  if (!token) return { ok: false, error: "no_token" };

  const goals = Array.isArray(body.parent_concern) ? body.parent_concern.join(", ") : body.parent_concern ?? "";

  const payload = {
    data: [{
      Last_Name: body.parent_name || body.child_name || "Unknown",
      Phone: body.phone,
      Email: body.parent_email,
      City: body.city,
      Lead_Source: "Website – chesswize.in",
      Lead_Status: "Not Contacted",
      Description: [
        `Child: ${body.child_name ?? ""} (age ${body.child_age_range ?? "?"}, level ${body.child_level ?? "?"})`,
        goals ? `Goals: ${goals}` : "",
        body.parent_commitment ? `Commitment: ${body.parent_commitment}` : "",
        body.referral_source ? `Heard via: ${body.referral_source}` : "",
      ].filter(Boolean).join("\n"),
    }],
    trigger: ["workflow"],
  };

  const res = await fetch(`${env.ZOHO_API_DOMAIN}/crm/v7/Leads`, {
    method: "POST",
    headers: {
      authorization: `Zoho-oauthtoken ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json<{ data?: Array<{ code?: string; details?: { id?: string } }> }>().catch(() => ({} as any));
  if (!res.ok) return { ok: false, error: `zoho_${res.status}` };
  const rec = result.data?.[0];
  if (rec?.code !== "SUCCESS") return { ok: false, error: rec?.code ?? "unknown" };
  return { ok: true, id: rec.details?.id };
}

/* ─────────────────────────── Resend helpers ─────────────────────────── */

const resendConfigured = (env: Env) => !!(env.RESEND_API_KEY && env.FROM_EMAIL && env.NOTIFY_EMAIL);

async function sendLeadEmail(env: Env, body: LeadBody): Promise<{ ok: boolean; recipients?: Array<{ to: string; ok: boolean; error?: string }>; error?: string }> {
  if (!resendConfigured(env)) return { ok: false, error: "resend_not_configured" };

  const goals = Array.isArray(body.parent_concern) ? body.parent_concern.join(", ") : body.parent_concern ?? "";
  const subject = `🎯 New lead: ${body.parent_name ?? body.child_name ?? "Unknown"} (${body.city ?? "?"})`;
  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
<h2 style="color:#1d4ed8;">New demo booking from chesswize.in</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;width:160px;">Parent</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;">${escapeHtml(body.parent_name ?? "")}</td></tr>
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;">Phone / WhatsApp</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;"><a href="https://wa.me/${escapeHtml(String(body.phone ?? "").replace(/[^+0-9]/g, ""))}">${escapeHtml(body.phone ?? "")}</a></td></tr>
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;">City</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;">${escapeHtml(body.city ?? "")}</td></tr>
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;">Child</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;">${escapeHtml(body.child_name ?? "")} · ${escapeHtml(body.child_age_range ?? "?")} · ${escapeHtml(body.child_level ?? "?")}</td></tr>
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;">Goals</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;">${escapeHtml(goals)}</td></tr>
  <tr><td style="padding:6px;border-bottom:1px solid #e2e8f0;font-weight:600;">Commitment</td><td style="padding:6px;border-bottom:1px solid #e2e8f0;">${escapeHtml(body.parent_commitment ?? "")}</td></tr>
  <tr><td style="padding:6px;font-weight:600;">Source</td><td style="padding:6px;">${escapeHtml(body.referral_source ?? "")}</td></tr>
</table>
<p style="margin-top:24px;color:#64748b;font-size:12px;">Lead captured via chesswize.in worker @ ${new Date().toISOString()}</p>
</body></html>`;

  // Support comma-separated NOTIFY_EMAIL: send ONE email per recipient so a
  // single failing address (e.g. sandbox-restricted) doesn't block the rest.
  const recipients = (env.NOTIFY_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (recipients.length === 0) return { ok: false, error: "no_recipients" };

  const results = await Promise.all(
    recipients.map(async (to) => {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            authorization: `Bearer ${env.RESEND_API_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            from: env.FROM_EMAIL,
            to: [to],
            subject,
            html,
            reply_to: body.parent_email,
          }),
        });
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          return { to, ok: false, error: `resend_${res.status}${detail ? ": " + detail.slice(0, 120) : ""}` };
        }
        return { to, ok: true };
      } catch (e: any) {
        return { to, ok: false, error: e?.message ?? "fetch_error" };
      }
    }),
  );

  const anyOk = results.some((r) => r.ok);
  return { ok: anyOk, recipients: results };
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* ────────────────────────────── Handlers ────────────────────────────── */

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && !originAllowed(env, origin)) {
    return json({ ok: false, error: "origin_blocked" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Server-side shape validation — don't trust the client.
  // Treat anything malformed as a hard reject (400) so automated scripts
  // can't pollute Zoho with arbitrary data.
  const validation = validateLead(body);
  if (validation.ok === false) {
    return json({ ok: false, error: "invalid_payload", detail: validation.reason }, { status: 400 });
  }
  const lead: LeadBody = validation.value;

  // Honeypot
  if (lead.website_url && lead.website_url.length > 0) {
    return json({ ok: true, stored: false, note: "filtered" });
  }

  // Anti-spam time-gate
  if (typeof lead.form_duration_s === "number" && lead.form_duration_s < 8) {
    return json({ ok: false, error: "too_fast" }, { status: 429 });
  }

  // Server-generated event_id — shared with the browser fbq Lead so Meta
  // dedupes the two into a single Lead in the dashboard.
  const eventId = crypto.randomUUID();

  const [zoho, email] = await Promise.allSettled([
    pushLeadToZoho(env, lead),
    sendLeadEmail(env, lead),
  ]);

  const zohoOk = zoho.status === "fulfilled" && zoho.value.ok;
  const emailOk = email.status === "fulfilled" && email.value.ok;

  // Fire Meta CAPI without blocking the user response. ctx.waitUntil lets
  // the worker stay alive long enough to finish the Meta POST.
  if (capiConfigured(env)) {
    const origin = request.headers.get("origin") || "https://chesswize.in";
    const eventSourceUrl = `${origin.replace(/\/+$/, "")}/thank-you`;
    const clientIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = request.headers.get("user-agent") ?? undefined;
    ctx.waitUntil(
      sendCapiLead(env, {
        eventId,
        eventSourceUrl,
        clientIp,
        clientUserAgent,
        attribution: lead.attribution,
        parentName: lead.parent_name,
        parentEmail: lead.parent_email,
        phone: lead.phone,
        city: lead.city,
      }).then((r) => {
        if (!r.ok) {
          // eslint-disable-next-line no-console
          console.warn("[capi] lead send failed", r.status, r.detail);
        }
      }),
    );
  }

  return json({
    ok: true,
    stored: zohoOk || emailOk,
    event_id: eventId,
    zoho: zoho.status === "fulfilled" ? zoho.value : { ok: false, error: "rejected" },
    email: email.status === "fulfilled" ? email.value : { ok: false, error: "rejected" },
  });
}

function handleHealth(env: Env): Response {
  return json({
    ok: true,
    service: "chesswize-lead-api",
    integrations: {
      zoho: zohoConfigured(env) ? "configured" : "missing_env",
      resend: resendConfigured(env) ? "configured" : "missing_env",
      meta_capi: capiConfigured(env) ? "configured" : "missing_env",
    },
    ts: new Date().toISOString(),
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight — only echo the origin back if it's on the allowlist.
    // Without this check, arbitrary origins can probe the API for existence.
    if (request.method === "OPTIONS") {
      const origin = request.headers.get("origin");
      if (!originAllowed(env, origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": origin ?? "https://chesswize.in",
          "access-control-allow-methods": "POST, GET, OPTIONS",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          "vary": "Origin",
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      return handleHealth(env);
    }
    if (request.method === "POST" && url.pathname === "/api/leads") {
      const res = await handleLead(request, env, ctx);
      // If cross-origin allow it
      const origin = request.headers.get("origin");
      if (origin && originAllowed(env, origin)) {
        res.headers.set("access-control-allow-origin", origin);
        res.headers.set("vary", "origin");
      }
      return res;
    }

    return json({ ok: false, error: "not_found" }, { status: 404 });
  },
};
