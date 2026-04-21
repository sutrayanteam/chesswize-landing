/**
 * SHA-256 + PII normalization for Meta Conversions API payloads.
 *
 * Rules Meta enforces (or penalises EMQ for getting wrong):
 *   em / ph / fn / ln / ct / external_id → SHA-256 hex (lowercase), normalized
 *   fbp / fbc / client_ip_address / client_user_agent → NEVER hashed
 *
 * Normalization:
 *   email  — trim + lowercase
 *   phone  — strip non-digits, prepend 91 if India-local 10-digit, strip leading 0
 *   name   — trim + lowercase + strip diacritics (NFKD)
 *   city   — trim + lowercase + strip spaces
 */

export async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalizeEmail(email?: string): string | undefined {
  const v = email?.trim().toLowerCase();
  return v && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? v : undefined;
}

export function normalizePhone(phone?: string, defaultCc = "91"): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/[^0-9]/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (!digits.startsWith(defaultCc) && digits.length === 10) digits = defaultCc + digits;
  return digits.length >= 10 ? digits : undefined;
}

export function normalizeName(name?: string): string | undefined {
  const v = name?.trim().toLowerCase();
  if (!v) return undefined;
  // Strip combining diacritical marks after NFKD decomposition.
  return v.normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function normalizeCity(city?: string): string | undefined {
  const v = city?.trim().toLowerCase().replace(/\s+/g, "");
  return v && v.length > 0 ? v : undefined;
}

export function splitFullName(full?: string): { first?: string; last?: string } {
  if (!full) return {};
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { first: parts[0] };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}
