/**
 * Sync lead submissions to the Payload admin dashboard.
 *
 * Calls `admin.chesswize.in/api/internal/leads/upsert` (a Next.js route in
 * the admin app, source at `apps/admin/src/app/api/internal/leads/upsert/`).
 *
 * The admin endpoint:
 *   - upserts by `lead_sid`
 *   - never downgrades full → partial
 *   - drops empty fields so a later partial save doesn't blank existing data
 *   - authenticates via shared `x-ingest-secret` header
 *
 * Designed to never fail the user-facing response — call via
 * `ctx.waitUntil(syncToPayload(...))` so a slow / failing admin doesn't
 * stall the worker's response to chesswize.in.
 *
 * If `PAYLOAD_INGEST_URL` or `PAYLOAD_INGEST_SECRET` aren't set, this is a
 * silent no-op (matches the "every integration is optional" worker design).
 */

export interface PayloadEnv {
  PAYLOAD_INGEST_URL?: string;
  PAYLOAD_INGEST_SECRET?: string;
}

export interface PayloadIngest {
  lead_sid: string;
  parent_name?: string;
  phone?: string;
  email?: string;
  child_age_range?: string;
  child_level?: string;
  child_name?: string;
  city?: string;
  parent_concern?: unknown;
  parent_commitment?: string;
  preferred_datetime?: string;
  referral_source?: string;
  source?: string;
  submission_state?: "partial" | "full";
  last_partial_step?: number;
  form_duration_s?: number;
  attribution_snapshot?: unknown;
}

export interface PayloadSyncResult {
  ok: boolean;
  status?: number;
  detail?: string;
}

export function payloadConfigured(env: PayloadEnv): boolean {
  return !!(env.PAYLOAD_INGEST_URL && env.PAYLOAD_INGEST_SECRET);
}

export async function syncToPayload(env: PayloadEnv, body: PayloadIngest): Promise<PayloadSyncResult> {
  if (!payloadConfigured(env)) return { ok: false, detail: "not_configured" };
  if (!body.lead_sid) return { ok: false, detail: "lead_sid_required" };

  try {
    const res = await fetch(env.PAYLOAD_INGEST_URL!, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-ingest-secret": env.PAYLOAD_INGEST_SECRET!,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.warn("[payload] sync failed", res.status, text.slice(0, 200));
      return { ok: false, status: res.status, detail: text.slice(0, 200) };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "fetch_error";
    // eslint-disable-next-line no-console
    console.warn("[payload] sync error", msg);
    return { ok: false, detail: msg };
  }
}
