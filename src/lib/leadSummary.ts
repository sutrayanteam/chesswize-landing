/**
 * Type-safe sessionStorage handoff from BottomForm.onSubmit → /thank-you.
 *
 * The /thank-you page needs the lead's data to render personalized content
 * (parent first name, child name, slot, concern, etc). We could fetch this
 * from the CRM by event_id, but that adds round-trip latency and a new auth
 * surface for what is just last-mile rendering. Instead, on a successful
 * submit BottomForm writes a sanitized snapshot of the form to
 * sessionStorage keyed by the same event_id Meta CAPI uses, and /thank-you
 * reads it on mount.
 *
 * Privacy:
 *   • sessionStorage is tab-scoped; data evaporates the moment the tab
 *     closes. Refresh in the same tab keeps it (which is what we want —
 *     the parent gets the same personalized page).
 *   • Phone is omitted on purpose. We don't need it for any rendering and
 *     keeping PII in sessionStorage longer than needed has no upside.
 *   • Email + name + child name remain because they drive personalization.
 *     They're already known to the parent and were just typed by them.
 *   • A shared /thank-you?eid=… URL opened in a different browser sees no
 *     sessionStorage entry → falls back to the generic page. As intended.
 */

const KEY_PREFIX = "cw_lead_";

export type AgeRange = "4-6" | "7-9" | "10-12" | "13+";
export type ChildLevel =
  | "never-played"
  | "knows-rules"
  | "beginner"
  | "intermediate"
  | "advanced";
export type Commitment = "casual" | "serious" | "competitive";

/** Concern values defined in BottomForm step 3. */
export const CONCERN_VALUES = [
  "focus",
  "math",
  "screen_time",
  "tournament",
  "confidence",
  "exploring",
] as const;
export type Concern = (typeof CONCERN_VALUES)[number];

export interface LeadSummary {
  parent_name: string;
  parent_email: string;
  child_name: string;
  child_age_range: AgeRange;
  child_level: ChildLevel;
  city: string;
  parent_concern: Concern[];
  parent_commitment: Commitment;
  /** "YYYY-MM-DD HH:mm" in Asia/Kolkata local time. */
  preferred_datetime: string;
  /** Epoch ms — write time. Used only for stale-data detection (none today). */
  ts: number;
}

function key(eid: string): string {
  return `${KEY_PREFIX}${eid}`;
}

const VALID_AGE: ReadonlySet<AgeRange> = new Set(["4-6", "7-9", "10-12", "13+"]);
const VALID_LEVEL: ReadonlySet<ChildLevel> = new Set([
  "never-played",
  "knows-rules",
  "beginner",
  "intermediate",
  "advanced",
]);
const VALID_COMMITMENT: ReadonlySet<Commitment> = new Set(["casual", "serious", "competitive"]);
const VALID_CONCERNS: ReadonlySet<string> = new Set(CONCERN_VALUES);

/** Strip whitespace/control chars + cap length. Defense against weird drafts. */
function clean(s: unknown, max = 200): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, max);
}

/**
 * Persist a form snapshot keyed by event_id. Best-effort — quota errors
 * (extremely rare for ~500 bytes of JSON) are swallowed; the /thank-you
 * page degrades to the generic copy if nothing is stored.
 */
export function writeLeadSummary(eid: string, raw: Record<string, unknown>): void {
  if (!eid || typeof window === "undefined") return;
  try {
    const summary: LeadSummary = {
      parent_name: clean(raw.parent_name, 80),
      parent_email: clean(raw.parent_email, 200),
      child_name: clean(raw.child_name, 80),
      child_age_range: VALID_AGE.has(raw.child_age_range as AgeRange)
        ? (raw.child_age_range as AgeRange)
        : "7-9",
      child_level: VALID_LEVEL.has(raw.child_level as ChildLevel)
        ? (raw.child_level as ChildLevel)
        : "knows-rules",
      city: clean(raw.city, 80),
      parent_concern: Array.isArray(raw.parent_concern)
        ? (raw.parent_concern as unknown[])
            .filter((c): c is Concern => typeof c === "string" && VALID_CONCERNS.has(c))
            .slice(0, 6)
        : [],
      parent_commitment: VALID_COMMITMENT.has(raw.parent_commitment as Commitment)
        ? (raw.parent_commitment as Commitment)
        : "casual",
      preferred_datetime: clean(raw.preferred_datetime, 24),
      ts: Date.now(),
    };
    sessionStorage.setItem(key(eid), JSON.stringify(summary));
  } catch {
    /* quota / SSR / private mode — silently fall through */
  }
}

/**
 * Read a snapshot back. Returns null if missing, malformed, or not for
 * this event_id — caller renders generic copy in that case.
 */
export function readLeadSummary(eid: string | null | undefined): LeadSummary | null {
  if (!eid || typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key(eid));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const r = parsed as Record<string, unknown>;
    if (typeof r.parent_name !== "string" || typeof r.child_name !== "string") return null;
    return r as unknown as LeadSummary;
  } catch {
    return null;
  }
}

/** Lowercase first name from a free-text full name. Empty string if unsure. */
export function firstName(full: string): string {
  if (!full) return "";
  const cut = full.trim().split(/\s+/)[0] ?? "";
  // Title-case: Tarun → Tarun, JOHN → John.
  return cut.charAt(0).toUpperCase() + cut.slice(1).toLowerCase();
}
