/**
 * Meta Conversions API — server-side Lead event sender.
 *
 * Fires in parallel with the browser fbq Lead (browser fires from /thank-you
 * after navigation). Both use the same event_id so Meta dedupes to a single
 * Lead in the dashboard. Without CAPI, ~30% of iOS/ad-blocker traffic never
 * produces a browser event and Meta's optimisation starves.
 */
import {
  normalizeCity,
  normalizeEmail,
  normalizeName,
  normalizePhone,
  sha256Hex,
  splitFullName,
} from "./hash";

export interface CapiEnv {
  META_PIXEL_ID?: string;
  META_CAPI_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

export interface CapiAttribution {
  fbp?: string;
  fbc?: string;
  fbclid?: string;
}

export interface CapiLeadInput {
  eventId: string;
  eventSourceUrl: string;
  clientIp?: string;
  clientUserAgent?: string;
  attribution?: CapiAttribution;
  parentName?: string;
  parentEmail?: string;
  phone?: string;
  city?: string;
}

export interface CapiResult {
  ok: boolean;
  status?: number;
  detail?: string;
}

export const capiConfigured = (env: CapiEnv) =>
  !!(env.META_PIXEL_ID && env.META_CAPI_TOKEN);

/**
 * Build an fbc cookie-format string from an fbclid when the Meta Pixel
 * hasn't yet synthesised the _fbc cookie on the client. Format is
 * `fb.1.<ts_seconds>.<fbclid>` per Meta's docs.
 */
function buildFbcFromFbclid(fbclid?: string, ts = Date.now()): string | undefined {
  if (!fbclid) return undefined;
  return `fb.1.${Math.floor(ts / 1000)}.${fbclid}`;
}

export async function sendCapiLead(env: CapiEnv, input: CapiLeadInput): Promise<CapiResult> {
  if (!capiConfigured(env)) return { ok: false, detail: "capi_not_configured" };

  const { first, last } = splitFullName(input.parentName);
  const emailNorm = normalizeEmail(input.parentEmail);
  const phoneNorm = normalizePhone(input.phone);
  const firstNorm = normalizeName(first);
  const lastNorm = normalizeName(last);
  const cityNorm = normalizeCity(input.city);

  const [em, ph, fn, ln, ct] = await Promise.all([
    emailNorm ? sha256Hex(emailNorm) : undefined,
    phoneNorm ? sha256Hex(phoneNorm) : undefined,
    firstNorm ? sha256Hex(firstNorm) : undefined,
    lastNorm ? sha256Hex(lastNorm) : undefined,
    cityNorm ? sha256Hex(cityNorm) : undefined,
  ]);

  const fbc = input.attribution?.fbc ?? buildFbcFromFbclid(input.attribution?.fbclid);

  const userData: Record<string, unknown> = {};
  if (em) userData.em = em;
  if (ph) userData.ph = ph;
  if (fn) userData.fn = fn;
  if (ln) userData.ln = ln;
  if (ct) userData.ct = ct;
  if (input.attribution?.fbp) userData.fbp = input.attribution.fbp;
  if (fbc) userData.fbc = fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        user_data: userData,
        custom_data: {
          content_name: "free_demo_booking",
          content_category: "chess_coaching",
          currency: "INR",
        },
      },
    ],
    ...(env.META_TEST_EVENT_CODE ? { test_event_code: env.META_TEST_EVENT_CODE } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${env.META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${env.META_CAPI_TOKEN}`,
        },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, status: res.status, detail: text.slice(0, 200) };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch_error";
    return { ok: false, detail: msg };
  }
}
