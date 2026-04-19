/**
 * ChessWize Lead-capture Worker
 *
 * Runs on chesswize.in/api/*. Handles:
 *   POST /api/leads       — creates Zoho CRM Lead + emails counsellor via Resend
 *   GET  /api/health      — returns worker status + which integrations are wired
 *
 * Fails gracefully: if Zoho env vars aren't set, the lead is still emailed.
 * If Resend isn't set, the lead is still pushed to Zoho. If neither is set,
 * the worker returns 200 with `stored: false` so the frontend's WhatsApp
 * fallback kicks in for the user-facing confirmation.
 */

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

async function sendLeadEmail(env: Env, body: LeadBody): Promise<{ ok: boolean; error?: string }> {
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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [env.NOTIFY_EMAIL],
      subject,
      html,
      reply_to: body.parent_email,
    }),
  });
  if (!res.ok) return { ok: false, error: `resend_${res.status}` };
  return { ok: true };
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

async function handleLead(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && !originAllowed(env, origin)) {
    return json({ ok: false, error: "origin_blocked" }, { status: 403 });
  }

  let body: LeadBody;
  try {
    body = await request.json<LeadBody>();
  } catch {
    return json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot
  if (body.website_url && body.website_url.length > 0) {
    return json({ ok: true, stored: false, note: "filtered" });
  }

  // Anti-spam time-gate
  if (typeof body.form_duration_s === "number" && body.form_duration_s < 8) {
    return json({ ok: false, error: "too_fast" }, { status: 429 });
  }

  // Minimum validation
  if (!body.phone || String(body.phone).replace(/[^0-9]/g, "").length < 10) {
    return json({ ok: false, error: "phone_required" }, { status: 400 });
  }

  const [zoho, email] = await Promise.allSettled([
    pushLeadToZoho(env, body),
    sendLeadEmail(env, body),
  ]);

  const zohoOk = zoho.status === "fulfilled" && zoho.value.ok;
  const emailOk = email.status === "fulfilled" && email.value.ok;

  return json({
    ok: true,
    stored: zohoOk || emailOk,
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
    },
    ts: new Date().toISOString(),
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight (mostly for local dev)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": request.headers.get("origin") ?? "*",
          "access-control-allow-methods": "POST, GET, OPTIONS",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      return handleHealth(env);
    }
    if (request.method === "POST" && url.pathname === "/api/leads") {
      const res = await handleLead(request, env);
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
