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

  // Cloudflare Turnstile — server-side verification of the widget token.
  // Without TURNSTILE_SECRET_KEY the worker skips verification and logs a
  // warning, so the form still works during dev / initial rollout.
  TURNSTILE_SECRET_KEY?: string;

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
  preferred_datetime?: string;
  referral_source?: string;
  // Honeypot
  website_url?: string;
  // Anti-spam
  form_duration_s?: number;
  // Cloudflare Turnstile token — verified server-side before lead acceptance.
  turnstile_token?: string;
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

// Conservative email regex — catches obvious bad input (spaces, missing @,
// missing TLD) without tripping on valid addresses like `foo+bar@co.in`.
// Not RFC5321-complete by design; Resend is the authoritative validator.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateLead(raw: unknown): { ok: true; value: LeadBody } | { ok: false; reason: string } {
  if (!raw || typeof raw !== "object") return { ok: false, reason: "not_object" };
  const r = raw as Record<string, unknown>;

  const phone = str(r.phone, 40);
  if (!phone || phone.replace(/[^0-9]/g, "").length < 10) {
    return { ok: false, reason: "phone_required" };
  }

  // Normalise email: trim, lower, and drop it entirely if it fails the
  // shape check. Storing a malformed string in `parent_email` would let it
  // leak into Resend's `to`/`reply_to` (silent 422) and Zoho's Email field.
  const emailRaw = str(r.parent_email, 200);
  const emailTrim = emailRaw?.trim().toLowerCase();
  const emailOk = !!emailTrim && EMAIL_RE.test(emailTrim);
  const parentEmail = emailOk ? emailTrim : undefined;

  const value: LeadBody = {
    phone,
    child_name: str(r.child_name, 120),
    child_age_range: str(r.child_age_range, 20),
    child_level: str(r.child_level, 40),
    parent_name: str(r.parent_name, 120),
    parent_email: parentEmail,
    city: str(r.city, 80),
    parent_commitment: str(r.parent_commitment, 80),
    preferred_datetime: str(r.preferred_datetime, 30),
    referral_source: str(r.referral_source, 80),
    parent_concern: Array.isArray(r.parent_concern) ? strArr(r.parent_concern) : str(r.parent_concern as unknown, 200),
    website_url: str(r.website_url, 200),
    form_duration_s: typeof r.form_duration_s === "number" ? r.form_duration_s : undefined,
    turnstile_token: str(r.turnstile_token, 4096),
    attribution: validateAttribution(r.attribution),
  };

  return { ok: true, value };
}

/**
 * Verify a Turnstile widget token with Cloudflare's siteverify endpoint.
 * Returns { ok:true } on success. If TURNSTILE_SECRET_KEY is unset (dev /
 * initial rollout), returns { ok:true, skipped:true } — the honeypot +
 * time-gate still protect the endpoint in the meantime.
 */
async function verifyTurnstile(env: Env, token: string | undefined, remoteIp?: string): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!env.TURNSTILE_SECRET_KEY) {
    return { ok: true, skipped: true };
  }
  if (!token) {
    return { ok: false, error: "missing_token" };
  }
  try {
    const body = new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
    });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, error: (data["error-codes"] ?? ["invalid"]).join(",").slice(0, 200) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "fetch_error" };
  }
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
        body.preferred_datetime ? `Preferred call slot: ${formatPreferredDatetime(body.preferred_datetime)}` : "",
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

// Treat empty strings as "missing" everywhere — callers should not see
// empty parentheses or dangling separators. Matches what `?? "?"` meant in
// the old code, but handles the empty-string case too.
const present = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const clean = (v: unknown): string => (present(v) ? v.trim() : "");

// Human-readable child-age/level/goal labels so counsellors don't have to
// decode enum keys in-app. Missing lookups return the original key.
const CHILD_AGE_LABELS: Record<string, string> = {
  "4-6": "4 – 6 yrs",
  "7-9": "7 – 9 yrs",
  "10-12": "10 – 12 yrs",
  "13+": "13+ yrs",
};
const CHILD_LEVEL_LABELS: Record<string, string> = {
  "never-played": "Never played",
  "knows-rules": "Knows the rules",
  beginner: "Beginner (<800 Elo)",
  intermediate: "Intermediate (800–1200)",
  advanced: "Advanced (1200+)",
};
const CONCERN_LABELS: Record<string, string> = {
  focus: "Focus & attention",
  math: "Math + school",
  screen_time: "Replace screen time",
  tournament: "Tournaments / FIDE",
  confidence: "Confidence",
  exploring: "Just exploring",
};
const COMMITMENT_LABELS: Record<string, string> = {
  casual: "Casual (fun hobby)",
  serious: "Serious (long-term growth)",
  competitive: "Competitive (FIDE / tournaments)",
};
const REFERRAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  google: "Google Search",
  youtube: "YouTube",
  friend: "Friend / word of mouth",
  school: "School referral",
  other: "Other",
};

// Lead-temperature pill colour. Aligns with counsellor's prioritisation: a
// parent asking about FIDE ratings with a structured slot picked is hotter
// than one casually exploring.
function leadPriority(body: LeadBody): { label: string; bg: string; fg: string; border: string } {
  const commitment = (body.parent_commitment ?? "").toLowerCase();
  if (commitment === "competitive") return { label: "🔥 HOT", bg: "#fef2f2", fg: "#b91c1c", border: "#fecaca" };
  if (commitment === "serious")     return { label: "☀️ WARM", bg: "#fffbeb", fg: "#b45309", border: "#fde68a" };
  return { label: "❄️ EXPLORING", bg: "#eff6ff", fg: "#1d4ed8", border: "#bfdbfe" };
}

// Digit-only form of the phone for wa.me / tel: hrefs (E.164 without the +).
function phoneDigits(phone: string | undefined): string {
  return String(phone ?? "").replace(/[^0-9]/g, "");
}

async function sendLeadEmail(env: Env, body: LeadBody): Promise<{ ok: boolean; recipients?: Array<{ to: string; ok: boolean; error?: string }>; error?: string }> {
  if (!resendConfigured(env)) return { ok: false, error: "resend_not_configured" };

  const parentName = clean(body.parent_name) || clean(body.child_name) || "Unknown";
  const city = clean(body.city);
  const childName = clean(body.child_name);
  const childAge = CHILD_AGE_LABELS[clean(body.child_age_range)] ?? clean(body.child_age_range);
  const childLevel = CHILD_LEVEL_LABELS[clean(body.child_level)] ?? clean(body.child_level);
  const parentEmail = clean(body.parent_email);
  const phone = clean(body.phone);
  const phoneRaw = phoneDigits(body.phone);
  const goalKeys = Array.isArray(body.parent_concern) ? body.parent_concern : (present(body.parent_concern) ? [body.parent_concern] : []);
  const goals = goalKeys.map((k) => CONCERN_LABELS[k] ?? k).filter(Boolean);
  const commitment = COMMITMENT_LABELS[clean(body.parent_commitment)] ?? clean(body.parent_commitment);
  const referral = REFERRAL_LABELS[clean(body.referral_source)] ?? clean(body.referral_source);
  const slotLabel = formatPreferredDatetime(body.preferred_datetime);
  const priority = leadPriority(body);

  const subjectSuffix = city ? ` · ${city}` : "";
  const subject = `🎯 New lead: ${parentName}${subjectSuffix}${slotLabel ? ` · ${slotLabel}` : ""}`;

  // Child summary — build from non-empty parts only so we never render
  // "Aarav · ? · ?" or " · 7 – 9 yrs · " when the parent skipped a field.
  const childSummary = [childName, childAge, childLevel].filter((s) => s).join(" · ");

  // Small table-row helper: hides the whole row when value is empty so the
  // counsellor sees only facts that actually exist.
  const row = (label: string, value: string, accent = false) => {
    if (!value) return "";
    const color = accent ? "color:#1d4ed8;font-weight:700;" : "color:#0f172a;";
    return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:#64748b;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;${color}">${value}</td>
    </tr>`;
  };

  const waHref = phoneRaw ? `https://wa.me/${phoneRaw}?text=${encodeURIComponent(`Hi ${parentName.split(" ")[0]}! This is ChessWize calling about your chess evaluation booking for ${childName || "your child"}.`)}` : "";
  const telHref = phoneRaw ? `tel:+${phoneRaw}` : "";
  const mailtoHref = parentEmail ? `mailto:${parentEmail}?subject=${encodeURIComponent("Your ChessWize evaluation booking")}` : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0f172a;">
<center style="width:100%;background:#f1f5f9;padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,0.06);">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 45%,#0ea5e9 100%);padding:26px 28px 22px;color:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;opacity:0.9;">ChessWize · New demo booking</div>
              <div style="font-size:24px;font-weight:800;line-height:1.25;margin-top:6px;">${escapeHtml(parentName)}${city ? ` · <span style=\"opacity:0.9;\">${escapeHtml(city)}</span>` : ""}</div>
              ${slotLabel ? `<div style="font-size:13px;font-weight:500;opacity:0.95;margin-top:6px;">⏰ ${escapeHtml(slotLabel)}</div>` : ""}
            </td>
            <td align="right" valign="top" style="width:110px;">
              <span style="display:inline-block;background:${priority.bg};color:${priority.fg};border:1px solid ${priority.border};padding:6px 10px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:0.5px;">${priority.label}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Quick actions -->
    ${(waHref || telHref || mailtoHref) ? `
    <tr>
      <td style="padding:18px 28px 10px;">
        <div style="font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:10px;">Quick reach out</div>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            ${waHref ? `<td style="padding-right:8px;"><a href="${waHref}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;padding:11px 16px;border-radius:10px;">💬 WhatsApp${phone ? ` ${escapeHtml(phone)}` : ""}</a></td>` : ""}
            ${telHref ? `<td style="padding-right:8px;"><a href="${telHref}" style="display:inline-block;background:#ffffff;border:2px solid #0f172a;color:#0f172a;text-decoration:none;font-weight:800;font-size:13px;padding:9px 16px;border-radius:10px;">📞 Call</a></td>` : ""}
            ${mailtoHref ? `<td><a href="${mailtoHref}" style="display:inline-block;background:#ffffff;border:2px solid #2563eb;color:#1d4ed8;text-decoration:none;font-weight:800;font-size:13px;padding:9px 16px;border-radius:10px;">✉️ Email</a></td>` : ""}
          </tr>
        </table>
      </td>
    </tr>
    ` : ""}

    <!-- Details table -->
    <tr>
      <td style="padding:8px 22px 18px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          ${row("Parent", escapeHtml(parentName))}
          ${row("Email", parentEmail ? `<a href="mailto:${escapeHtml(parentEmail)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(parentEmail)}</a>` : "")}
          ${row("Phone", phoneRaw ? `<a href="${escapeHtml(waHref)}" style="color:#15803d;text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a>` : "")}
          ${row("City", escapeHtml(city))}
          ${row("Preferred slot", escapeHtml(slotLabel), true)}
          ${row("Child", escapeHtml(childSummary))}
          ${row("Goals", goals.map((g) => `<span style="display:inline-block;background:#eff6ff;color:#1d4ed8;padding:3px 8px;border-radius:6px;margin:0 4px 4px 0;font-size:12px;font-weight:700;">${escapeHtml(g)}</span>`).join(""))}
          ${row("Commitment", escapeHtml(commitment))}
          ${row("Source", escapeHtml(referral))}
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:14px 28px 24px;border-top:1px solid #e2e8f0;background:#f8fafc;">
        <div style="font-size:11px;color:#94a3b8;">Lead captured via chesswize.in · ${new Date().toISOString()}</div>
      </td>
    </tr>
  </table>
</center>
</body>
</html>`;

  // Plaintext twin — spam-filter friendly + readable in plain-text mailers.
  // Same "skip-if-empty" discipline as the HTML so nothing dangles.
  const textLines: string[] = [
    `NEW DEMO BOOKING — chesswize.in`,
    `================================`,
    ``,
    `Parent:   ${parentName}${city ? ` · ${city}` : ""}`,
  ];
  if (parentEmail) textLines.push(`Email:    ${parentEmail}`);
  if (phone)       textLines.push(`Phone:    ${phone}  (wa.me/${phoneRaw})`);
  if (slotLabel)   textLines.push(`Slot:     ${slotLabel}`);
  if (childSummary) textLines.push(`Child:    ${childSummary}`);
  if (goals.length) textLines.push(`Goals:    ${goals.join(", ")}`);
  if (commitment)  textLines.push(`Commit:   ${commitment}`);
  if (referral)    textLines.push(`Source:   ${referral}`);
  textLines.push(``, `Priority: ${priority.label.replace(/[^\w\s]/g, "").trim()}`);
  textLines.push(``, `Captured @ ${new Date().toISOString()}`);
  const text = textLines.join("\n");

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
            text,
            // Skip the header entirely when we have no valid parent email,
            // otherwise Resend rejects the whole send with 422.
            ...(body.parent_email ? { reply_to: body.parent_email } : {}),
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

// WhatsApp contact the parent thank-you and counsellor emails link to. Keep
// in sync with the value in src/lib/whatsapp.ts on the frontend.
const COUNSELLOR_WHATSAPP = "918400979997";
const COUNSELLOR_WHATSAPP_DISPLAY = "+91 84009 79997";

// The frontend picker stores "YYYY-MM-DD HH:mm" (IST wall-clock). Render
// that back into a human-readable string for the counsellor email + parent
// confirmation, explicitly tagged IST so NRI parents reading in a different
// tz don't mis-read. If the string doesn't match the expected format we
// return it verbatim so we never drop data silently.
function formatPreferredDatetime(v: string | undefined): string {
  if (!v) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(v);
  if (!m) return v;
  const [, y, mo, d, hh, mm] = m;
  const instant = new Date(`${y}-${mo}-${d}T${hh}:${mm}:00+05:30`);
  if (Number.isNaN(instant.getTime())) return v;
  try {
    const label = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(instant);
    return `${label} IST`;
  } catch {
    return v;
  }
}

// Compact slot label for email subject lines — "Sat 26 Apr · 5:00 PM IST"
function formatSlotCompact(v: string | undefined): string {
  if (!v) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(v);
  if (!m) return v;
  const [, y, mo, d, hh, mm] = m;
  const instant = new Date(`${y}-${mo}-${d}T${hh}:${mm}:00+05:30`);
  if (Number.isNaN(instant.getTime())) return v;
  try {
    const parts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short", day: "numeric", month: "short",
      hour: "numeric", minute: "2-digit", hour12: true,
    }).formatToParts(instant);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const time = `${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
    return `${get("weekday")} ${get("day")} ${get("month")} · ${time} IST`;
  } catch {
    return v;
  }
}

// Builds an RFC 5545 ICS calendar entry for the booked slot. 20-minute
// duration (matches the evaluation length). Output is attached to the
// parent email so one-tap-add to Google/Apple/Outlook calendar works.
function buildIcsForSlot(v: string | undefined, childName: string, eventId: string): string | null {
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(v);
  if (!m) return null;
  const [, y, mo, d, hh, mm] = m;
  const start = new Date(`${y}-${mo}-${d}T${hh}:${mm}:00+05:30`);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + 20 * 60 * 1000);
  const fmtUtc = (dt: Date) => dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const summary = esc(`ChessWize chess evaluation${childName ? ` — ${childName}` : ""}`);
  const description = esc([
    `Your free 20-min chess evaluation with a ChessWize FIDE-rated coach.`,
    ``,
    `Our counsellor will WhatsApp you the Zoom link a few minutes before the call.`,
    `If you need to reschedule, reply to the confirmation email or WhatsApp +91 84009 79997.`,
  ].join("\n"));
  // CRLF line endings per RFC 5545; keep lines < 75 octets when reasonable.
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ChessWize//Lead API//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${eventId}@chesswize.in`,
    `DTSTAMP:${fmtUtc(new Date())}`,
    `DTSTART:${fmtUtc(start)}`,
    `DTEND:${fmtUtc(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    "LOCATION:Zoom (link shared by ChessWize via WhatsApp)",
    "STATUS:CONFIRMED",
    "ORGANIZER;CN=ChessWize:mailto:support@chesswize.com",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// Workers runtime: btoa accepts Latin1 strings. Our ICS is pure ASCII so
// direct btoa is safe. UTF-8-aware variant kept for future-proofing.
function toBase64(s: string): string {
  // Encode UTF-8 safely — ICS is ASCII today but parent/child names may
  // contain Unicode in future payloads.
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

/**
 * Parent-facing thank-you email. Sends an .ics calendar attachment so the
 * parent can one-tap add the 20-min evaluation to Google / Apple / Outlook
 * calendar. Kept separate from sendLeadEmail so a single bad notify-email
 * address doesn't block the parent confirmation.
 *
 * Design goals:
 *   • reinforce the booking promise the form made,
 *   • echo back the picked slot + make it calendar-able,
 *   • surface the counsellor's WhatsApp as the primary next channel,
 *   • set expectations (what happens next + what to prepare),
 *   • reinforce the unused-sessions refund promise + social proof,
 *   • give a soft second-touchpoint if the counsellor's call is missed.
 */
async function sendParentThankYouEmail(env: Env, body: LeadBody, eventId: string): Promise<{ ok: boolean; error?: string }> {
  if (!env.RESEND_API_KEY || !env.FROM_EMAIL) return { ok: false, error: "resend_not_configured" };
  if (!body.parent_email) return { ok: false, error: "no_parent_email" };

  const firstName = clean(body.parent_name).split(/\s+/)[0] || "there";
  const childNameRaw = clean(body.child_name);
  const childName = childNameRaw || "your child";
  const phoneDisplay = clean(body.phone);
  const slotLabel = formatPreferredDatetime(body.preferred_datetime);
  const slotCompact = formatSlotCompact(body.preferred_datetime);
  const waHref = `https://wa.me/${COUNSELLOR_WHATSAPP}?text=${encodeURIComponent(`Hi, I just booked a free chess evaluation on chesswize.in for ${childName}.`)}`;
  const ics = buildIcsForSlot(body.preferred_datetime, childNameRaw, eventId);

  const subject = slotCompact
    ? `🎉 Booked: ChessWize evaluation · ${slotCompact}`
    : `🎉 Your free chess evaluation is booked, ${firstName}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0f172a;">
<!-- Preview text shown in inbox list before opening (hidden in body) -->
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
  You're in, ${escapeHtml(firstName)}. Your 20-min chess evaluation for ${escapeHtml(childName)} is confirmed${slotCompact ? ` — ${escapeHtml(slotCompact)}` : ""}.
</div>

<center style="width:100%;background:#f1f5f9;padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,0.08);">

    <!-- Hero -->
    <tr>
      <td style="background:linear-gradient(135deg,#1e1b4b 0%,#1d4ed8 45%,#0ea5e9 100%);padding:30px 30px 26px;color:#ffffff;text-align:center;">
        <div style="font-size:11px;font-weight:800;letter-spacing:4px;text-transform:uppercase;opacity:0.85;">✓ Booking confirmed</div>
        <div style="font-size:28px;font-weight:800;line-height:1.15;margin-top:10px;">You're in, ${escapeHtml(firstName)}. 🎉</div>
        <div style="font-size:15px;font-weight:500;line-height:1.55;margin-top:10px;opacity:0.92;max-width:440px;margin-left:auto;margin-right:auto;">
          Your free 20-min chess evaluation for <strong>${escapeHtml(childName)}</strong> is locked in.
        </div>
      </td>
    </tr>

    <!-- Slot card -->
    ${slotLabel ? `
    <tr>
      <td style="padding:24px 28px 6px;">
        <div style="border:2px solid #bfdbfe;border-radius:14px;padding:18px 20px;background:linear-gradient(180deg,#eff6ff 0%,#ffffff 100%);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;">
                <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#1d4ed8;">📅 Your evaluation slot</div>
                <div style="font-size:17px;font-weight:800;color:#0f172a;margin-top:6px;line-height:1.35;">${escapeHtml(slotLabel)}</div>
                <div style="font-size:13px;color:#475569;margin-top:6px;line-height:1.5;">20 minutes · on Zoom · FIDE-rated coach</div>
              </td>
              ${ics ? `<td align="right" valign="top" style="width:42px;">
                <span style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:11px;font-weight:800;padding:6px 10px;border-radius:8px;letter-spacing:0.3px;">.ics</span>
              </td>` : ""}
            </tr>
          </table>
          <div style="font-size:12px;color:#64748b;margin-top:12px;line-height:1.5;padding-top:10px;border-top:1px dashed #cbd5e1;">
            ${ics ? `📎 We've attached a <strong style="color:#1d4ed8;">calendar invite</strong> — open it to add this slot to your Google / Apple / Outlook calendar in one tap.` : ""}
          </div>
        </div>
      </td>
    </tr>
    ` : ""}

    <!-- Counsellor confirmation -->
    <tr>
      <td style="padding:16px 28px 6px;">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 16px;display:flex;align-items:center;">
          <span style="font-size:20px;margin-right:10px;">💬</span>
          <span style="font-size:13px;color:#166534;line-height:1.55;">
            <strong>Priya (our counsellor)</strong> will WhatsApp you within <strong>24 hours</strong> on ${escapeHtml(phoneDisplay || "your number")} to confirm the exact time and share the Zoom link.
          </span>
        </div>
      </td>
    </tr>

    <!-- What happens next -->
    <tr>
      <td style="padding:22px 28px 4px;">
        <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#64748b;">What happens next</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
          ${[
            { num: "1", emoji: "💬", title: "We WhatsApp you", body: `To confirm the exact time and share the Zoom link.${phoneDisplay ? ` On ${escapeHtml(phoneDisplay)}.` : ""}` },
            { num: "2", emoji: "🎯", title: "20-min live evaluation", body: `A FIDE-rated coach plays a few positions with ${escapeHtml(childName)} and reads the style + temperament.` },
            { num: "3", emoji: "📊", title: "Personalised growth plan", body: `A written report on strengths, gaps, and a recommended 30-day track lands in your inbox.` },
            { num: "4", emoji: "🙌", title: "Zero pressure to enrol", body: `If the chemistry isn't right, we'll say so first — and point you elsewhere.` },
          ].map((s) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:42px;vertical-align:top;">
                    <div style="width:36px;height:36px;border-radius:10px;background:#eff6ff;border:1px solid #bfdbfe;text-align:center;line-height:36px;font-size:18px;">${s.emoji}</div>
                  </td>
                  <td style="padding-left:14px;">
                    <div style="font-size:14px;font-weight:800;color:#0f172a;line-height:1.3;">${s.title}</div>
                    <div style="font-size:13px;color:#475569;margin-top:4px;line-height:1.55;">${s.body}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`).join("")}
        </table>
      </td>
    </tr>

    <!-- Prep checklist -->
    <tr>
      <td style="padding:22px 28px 6px;">
        <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:14px;padding:18px 20px;">
          <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#64748b;">Quick prep · 2 minutes</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
            ${[
              "Laptop or tablet with a working camera and mic",
              `A quiet 20 minutes when ${escapeHtml(childName)} is fresh, not tired`,
              "Optional: a physical board nearby — some kids focus better with one",
              "Past tournament or rating details, if applicable",
            ].map((t) => `
            <tr>
              <td style="padding:5px 0;vertical-align:top;">
                <span style="color:#10b981;font-weight:800;display:inline-block;width:18px;">✓</span>
                <span style="font-size:13px;color:#334155;line-height:1.55;">${t}</span>
              </td>
            </tr>`).join("")}
          </table>
        </div>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:24px 28px 8px;text-align:center;">
        <a href="${waHref}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;padding:14px 28px;border-radius:12px;box-shadow:0 6px 18px rgba(37,211,102,0.38);">
          💬 Message Priya on WhatsApp
        </a>
        <div style="font-size:12px;color:#64748b;margin-top:12px;">
          Save our number: <strong style="color:#0f172a;">${escapeHtml(COUNSELLOR_WHATSAPP_DISPLAY)}</strong>
        </div>
      </td>
    </tr>

    <!-- Guarantee + social proof (side-by-side on desktop, stacked on mobile) -->
    <tr>
      <td style="padding:22px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:14px 16px;">
              <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#047857;">🛡️ Refund on unused sessions</div>
              <div style="font-size:13px;line-height:1.55;color:#065f46;margin-top:4px;">If ${escapeHtml(childName)} stops attending for any reason, we refund every session you haven't used — no questions, no forms to fight.</div>
            </td>
          </tr>
          <tr><td style="height:10px;line-height:10px;">&nbsp;</td></tr>
          <tr>
            <td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:14px 16px;">
              <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#b45309;">🏆 You're in good company</div>
              <div style="font-size:13px;line-height:1.55;color:#9a3412;margin-top:4px;">2,400+ Indian parents have put their kids through ChessWize. First-cohort average: <strong>+220 Elo in 90 days</strong>.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:18px 28px 26px;border-top:1px solid #e2e8f0;background:#fafafa;">
        <div style="font-size:12px;line-height:1.6;color:#64748b;">
          Questions before the call? Just reply to this email — a real human (not a bot) reads every message within 4 hours on weekdays.
        </div>
        <div style="font-size:11px;line-height:1.6;color:#94a3b8;margin-top:12px;">
          ChessWize · India's fastest-growing online chess academy · <a href="https://chesswize.in" style="color:#94a3b8;text-decoration:underline;">chesswize.in</a>
        </div>
      </td>
    </tr>
  </table>

  <div style="font-size:11px;color:#94a3b8;padding:18px 12px 0;max-width:600px;margin:0 auto;">
    You're receiving this email because you booked a free chess evaluation on chesswize.in. If you didn't make this booking, reply to this email and we'll remove your details.
  </div>
</center>
</body>
</html>`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Your free 20-min chess evaluation for ${childName} is confirmed.`,
    slotLabel ? `Slot: ${slotLabel}` : `Our counsellor will pick a time that works.`,
    ``,
    `Priya (our counsellor) will WhatsApp you within 24 hours on ${phoneDisplay || "your number"} to confirm the exact time and share the Zoom link.`,
    ics ? `A calendar invite (.ics) is attached so you can add this slot to your calendar in one tap.` : ``,
    ``,
    `WHAT HAPPENS NEXT`,
    `  1. We WhatsApp you to confirm the slot.`,
    `  2. 20-min live evaluation with a FIDE-rated coach on Zoom.`,
    `  3. You receive a written growth plan for ${childName}.`,
    `  4. Zero pressure to enrol.`,
    ``,
    `QUICK PREP`,
    `  • Laptop or tablet with working camera + mic`,
    `  • A quiet 20 minutes when ${childName} is fresh`,
    `  • Optional: a physical board`,
    `  • Any past tournament / rating details if applicable`,
    ``,
    `Want to reach us directly? WhatsApp ${COUNSELLOR_WHATSAPP_DISPLAY}.`,
    ``,
    `Refund on unused sessions — cancel any time and the money for sessions you haven't used comes back.`,
    ``,
    `— Team ChessWize · chesswize.in`,
  ].filter((l) => l !== undefined).join("\n");

  // Attach the .ics calendar file when we have a picked slot so the parent
  // can one-tap-add it to Google/Apple/Outlook. Resend accepts base64 in
  // `attachments[].content` with `filename` + optional `content_type`.
  const attachments = ics
    ? [{
        filename: "chesswize-evaluation.ics",
        content: toBase64(ics),
        content_type: "text/calendar; charset=utf-8; method=PUBLISH",
      }]
    : undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [body.parent_email],
        subject,
        html,
        text,
        reply_to: env.NOTIFY_EMAIL?.split(",")[0]?.trim() || env.FROM_EMAIL,
        ...(attachments ? { attachments } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `resend_${res.status}${detail ? ": " + detail.slice(0, 120) : ""}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "fetch_error" };
  }
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

  // Cloudflare Turnstile verification — skipped only when secret is unset
  // (dev / initial rollout). Once TURNSTILE_SECRET_KEY is set, any lead
  // without a valid token is rejected outright.
  const remoteIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || undefined;
  const turnstile = await verifyTurnstile(env, lead.turnstile_token, remoteIp);
  if (!turnstile.ok) {
    return json({ ok: false, error: "turnstile_failed", detail: turnstile.error }, { status: 403 });
  }

  // Server-generated event_id — shared with the browser fbq Lead so Meta
  // dedupes the two into a single Lead in the dashboard.
  const eventId = crypto.randomUUID();

  const [zoho, email, parentEmail] = await Promise.allSettled([
    pushLeadToZoho(env, lead),
    sendLeadEmail(env, lead),
    sendParentThankYouEmail(env, lead, eventId),
  ]);

  const zohoOk = zoho.status === "fulfilled" && zoho.value.ok;
  const emailOk = email.status === "fulfilled" && email.value.ok;

  // Local-dev convenience: when *nothing* is configured (pure localhost
  // wrangler without .dev.vars), treat the submit as stored so the frontend
  // happy path — /thank-you navigation, Meta browser Lead, confirmation
  // UI — can be exercised without provisioning real Zoho/Resend credentials.
  // Prod always has at least one integration configured, so this bypass is
  // inert outside of a clean dev environment.
  const devMockStorage = !zohoConfigured(env) && !resendConfigured(env) && !capiConfigured(env);

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

  const stored = zohoOk || emailOk || devMockStorage;

  // When nothing persisted, return 502 so the frontend surfaces a retry
  // instead of silently sending the parent to /thank-you. Body still carries
  // the per-integration detail so ops can inspect what failed.
  return json(
    {
      ok: stored,
      stored,
      event_id: eventId,
      dev_mock: devMockStorage || undefined,
      zoho: zoho.status === "fulfilled" ? zoho.value : { ok: false, error: "rejected" },
      email: email.status === "fulfilled" ? email.value : { ok: false, error: "rejected" },
      parent_email: parentEmail.status === "fulfilled" ? parentEmail.value : { ok: false, error: "rejected" },
    },
    stored ? {} : { status: 502 },
  );
}

function handleHealth(env: Env): Response {
  return json({
    ok: true,
    service: "chesswize-lead-api",
    integrations: {
      zoho: zohoConfigured(env) ? "configured" : "missing_env",
      resend: resendConfigured(env) ? "configured" : "missing_env",
      meta_capi: capiConfigured(env) ? "configured" : "missing_env",
      turnstile: env.TURNSTILE_SECRET_KEY ? "configured" : "missing_env",
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
