/**
 * Meta Pixel (fbq) event helpers.
 *
 * Every call is guarded — if the pixel snippet is blocked by an ad-blocker,
 * hasn't finished loading, or the user is on a privacy browser, these are
 * silent no-ops instead of runtime errors. In DEV mode we log each fire to
 * console.debug so the developer sees events during QA.
 */

type FbqCommand = "track" | "trackCustom";

interface FbqOptions {
  eventID?: string;
}

type FbqFn = (
  command: FbqCommand,
  eventName: string,
  params?: Record<string, unknown>,
  options?: FbqOptions,
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: unknown;
  }
}

function fire(
  command: FbqCommand,
  eventName: string,
  params?: Record<string, unknown>,
  options?: FbqOptions,
) {
  try {
    const fn = window.fbq;
    if (typeof fn !== "function") return;
    fn(command, eventName, params, options);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[fbq]", command, eventName, params ?? {}, options ?? {});
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[fbq] error", err);
    }
  }
}

export function trackPageView() {
  fire("track", "PageView");
}

export function trackViewContent() {
  fire("track", "ViewContent", {
    content_name: "landing_page",
    content_category: "chess_coaching",
  });
}

export function trackLeadFormStart() {
  fire("trackCustom", "LeadFormStart");
}

export function trackLeadStep2() {
  fire("trackCustom", "LeadStep2");
}

export function trackContact(source: string) {
  fire("track", "Contact", {
    content_name: "whatsapp_cta",
    content_category: source,
  });
}

/**
 * Fire the Lead event with the server-generated event_id so Meta can
 * deduplicate against the parallel CAPI event. Called from /thank-you.
 */
export function trackLead(eventID: string) {
  fire(
    "track",
    "Lead",
    {
      content_name: "free_demo_booking",
      content_category: "chess_coaching",
      currency: "INR",
    },
    { eventID },
  );
}
