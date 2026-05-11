/**
 * Durable submission backup.
 *
 * Writes every POST to /api/leads and /api/leads/partial into a D1 table
 * BEFORE any validation or destination side-effect. The intent: if the
 * worker validator rejects, or Zoho/Resend/Meta/Payload are down, we
 * still have the raw lead data on disk to recover later.
 *
 * Designed to never fail the request: any throw is swallowed (the
 * primary delivery path is more important than a backup write).
 */

export interface BackupEnv {
  LEAD_BACKUP_DB?: D1Database;
}

export interface BackupInput {
  endpoint: "leads" | "leads_partial";
  request: Request;
  body: unknown;
}

export interface BackupOutcome {
  validationOk: boolean;
  validationReason?: string;
  eventId?: string;
  leadSid?: string;
  zohoOk?: boolean;
  resendOk?: boolean;
  capiOk?: boolean;
  payloadOk?: boolean;
  httpStatus?: number;
}

function safeStr(v: unknown, max = 200): string | null {
  if (typeof v !== "string") return null;
  return v.slice(0, max);
}

function pickFromBody(body: unknown, key: string): string | null {
  if (!body || typeof body !== "object") return null;
  const r = body as Record<string, unknown>;
  // /api/leads has fields at top level; /api/leads/partial has a nested `fields` object
  if (typeof r[key] === "string") return safeStr(r[key]);
  if (r.fields && typeof r.fields === "object") {
    const f = r.fields as Record<string, unknown>;
    if (typeof f[key] === "string") return safeStr(f[key]);
  }
  return null;
}

/**
 * Write a backup row. Called BEFORE validation so we have a record of
 * every attempt — including ones that will get rejected. Returns the
 * generated row id which downstream code can pass to `updateBackup` to
 * stamp the validation/destination outcome.
 */
export async function writeBackup(env: BackupEnv, input: BackupInput): Promise<string | null> {
  if (!env.LEAD_BACKUP_DB) return null;

  try {
    const id = crypto.randomUUID();
    const now = Date.now();
    const headers = input.request.headers;

    // Body becomes the source of truth; structured fields are an
    // optimization for spreadsheet exports.
    const bodyJson = JSON.stringify(input.body ?? null).slice(0, 16384);

    await env.LEAD_BACKUP_DB.prepare(
      `INSERT INTO submissions
        (id, created_at, endpoint, origin, ip, user_agent, lead_sid,
         body_json, parent_name, parent_email, phone, child_name, city,
         validation_ok)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    )
      .bind(
        id,
        now,
        input.endpoint,
        safeStr(headers.get("origin"), 200),
        safeStr(headers.get("cf-connecting-ip") || headers.get("x-real-ip"), 50),
        safeStr(headers.get("user-agent"), 300),
        pickFromBody(input.body, "lead_sid"),
        bodyJson,
        pickFromBody(input.body, "parent_name"),
        pickFromBody(input.body, "parent_email"),
        pickFromBody(input.body, "phone"),
        pickFromBody(input.body, "child_name"),
        pickFromBody(input.body, "city"),
        0, // validation_ok — default to 0; updateBackup sets the real value
      )
      .run();

    return id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[backup] writeBackup failed (non-fatal)", err);
    return null;
  }
}

/** Stamp the validation + destination outcome on an existing backup row. */
export async function updateBackup(
  env: BackupEnv,
  id: string | null,
  outcome: BackupOutcome,
): Promise<void> {
  if (!id || !env.LEAD_BACKUP_DB) return;
  try {
    await env.LEAD_BACKUP_DB.prepare(
      `UPDATE submissions SET
        validation_ok = ?,
        validation_reason = ?,
        event_id = ?,
        zoho_ok = ?,
        resend_ok = ?,
        capi_ok = ?,
        payload_ok = ?,
        http_status = ?
       WHERE id = ?`,
    )
      .bind(
        outcome.validationOk ? 1 : 0,
        outcome.validationReason ?? null,
        outcome.eventId ?? null,
        outcome.zohoOk === undefined ? null : outcome.zohoOk ? 1 : 0,
        outcome.resendOk === undefined ? null : outcome.resendOk ? 1 : 0,
        outcome.capiOk === undefined ? null : outcome.capiOk ? 1 : 0,
        outcome.payloadOk === undefined ? null : outcome.payloadOk ? 1 : 0,
        outcome.httpStatus ?? null,
        id,
      )
      .run();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[backup] updateBackup failed (non-fatal)", err);
  }
}

/* ──────────────────────────── CSV export ──────────────────────────── */

const CSV_COLUMNS: { col: string; label: string }[] = [
  { col: "id", label: "id" },
  { col: "created_at", label: "created_at_ms" },
  { col: "endpoint", label: "endpoint" },
  { col: "parent_name", label: "parent_name" },
  { col: "parent_email", label: "parent_email" },
  { col: "phone", label: "phone" },
  { col: "child_name", label: "child_name" },
  { col: "city", label: "city" },
  { col: "validation_ok", label: "validation_ok" },
  { col: "validation_reason", label: "validation_reason" },
  { col: "event_id", label: "event_id" },
  { col: "lead_sid", label: "lead_sid" },
  { col: "zoho_ok", label: "zoho_ok" },
  { col: "resend_ok", label: "resend_ok" },
  { col: "capi_ok", label: "capi_ok" },
  { col: "payload_ok", label: "payload_ok" },
  { col: "http_status", label: "http_status" },
  { col: "origin", label: "origin" },
  { col: "ip", label: "ip" },
  { col: "user_agent", label: "user_agent" },
  { col: "body_json", label: "body_json" },
];

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function exportBackupCsv(
  env: BackupEnv,
  fromTs: number,
  toTs: number,
): Promise<string> {
  if (!env.LEAD_BACKUP_DB) return "";
  const stmt = env.LEAD_BACKUP_DB.prepare(
    `SELECT ${CSV_COLUMNS.map((c) => c.col).join(", ")}
     FROM submissions
     WHERE created_at >= ? AND created_at < ?
     ORDER BY created_at ASC`,
  ).bind(fromTs, toTs);
  const { results } = await stmt.all<Record<string, unknown>>();

  const header = CSV_COLUMNS.map((c) => c.label).join(",");
  const rows = (results ?? []).map((r) =>
    CSV_COLUMNS.map((c) => csvEscape(r[c.col])).join(","),
  );
  return [header, ...rows].join("\n") + "\n";
}
