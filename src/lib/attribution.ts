/**
 * First-touch attribution capture.
 *
 * Persists UTM params, fbclid, gclid, _fbp, _fbc cookies, landing page, and
 * referrer to sessionStorage the first time a user lands in a session.
 * First-write-wins — subsequent captures return the original value so an
 * in-session navigation can't clobber the ad source.
 *
 * TTL is 30 days; older data is discarded. Sits on sessionStorage (not
 * localStorage) so each new browser session is clean — matches the Meta CAPI
 * session-scoped semantics for fbp/fbc.
 */

const KEY = "cw_attribution";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  fbp?: string;
  fbc?: string;
  landing_page: string;
  referrer: string;
  ts: number;
}

function readCookie(name: string): string | undefined {
  try {
    const pattern = new RegExp(`(?:^|; )${name}=([^;]+)`);
    const m = document.cookie.match(pattern);
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch {
    return undefined;
  }
}

function buildFromWindow(): Attribution {
  const url = new URL(window.location.href);
  const q = url.searchParams;
  return {
    utm_source: q.get("utm_source") ?? undefined,
    utm_medium: q.get("utm_medium") ?? undefined,
    utm_campaign: q.get("utm_campaign") ?? undefined,
    utm_content: q.get("utm_content") ?? undefined,
    utm_term: q.get("utm_term") ?? undefined,
    fbclid: q.get("fbclid") ?? undefined,
    gclid: q.get("gclid") ?? undefined,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    landing_page: url.pathname + url.search,
    referrer: document.referrer || "",
    ts: Date.now(),
  };
}

/**
 * Return the stored attribution, or null if none / expired.
 * Refreshes fbp/fbc from cookies on read since the pixel sets those cookies
 * a moment after init — they may be absent when captureAttribution first runs.
 */
export function getAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed.ts || Date.now() - parsed.ts > TTL_MS) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    if (!parsed.fbp) parsed.fbp = readCookie("_fbp");
    if (!parsed.fbc) parsed.fbc = readCookie("_fbc");
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Capture first-touch attribution. Safe to call on every landing — returns
 * the existing stored entry if one is present, otherwise writes a fresh one.
 */
export function captureAttribution(): Attribution {
  const existing = getAttribution();
  if (existing) return existing;
  const fresh = buildFromWindow();
  try {
    sessionStorage.setItem(KEY, JSON.stringify(fresh));
  } catch {
    /* private mode / quota / SSR — ignore */
  }
  return fresh;
}

/**
 * Append stored attribution as query params to a URL. Used to propagate
 * source info to third-party redirects (not WhatsApp — see buildWhatsAppHref
 * for that, which embeds the info in the message body).
 */
export function appendAttributionToUrl(href: string): string {
  const attr = getAttribution();
  if (!attr) return href;
  try {
    const url = new URL(href);
    const add = (k: string, v: string | undefined) => {
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    };
    add("utm_source", attr.utm_source);
    add("utm_medium", attr.utm_medium);
    add("utm_campaign", attr.utm_campaign);
    add("utm_content", attr.utm_content);
    add("utm_term", attr.utm_term);
    add("fbclid", attr.fbclid);
    add("gclid", attr.gclid);
    return url.toString();
  } catch {
    return href;
  }
}
