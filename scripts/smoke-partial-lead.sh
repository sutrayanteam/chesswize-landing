#!/usr/bin/env bash
# scripts/smoke-partial-lead.sh
#
# Black-box smoke test for the /api/leads/partial endpoint. Verifies:
#   1. Endpoint reachable + returns expected validator errors on bad input.
#   2. Lenient validator accepts phone-only and email-only.
#   3. First call creates a Zoho draft and returns zoho_id + zoho_sig.
#   4. Subsequent call WITH the issued sig is accepted (worker trusts it).
#   5. An attacker spoof attempt (real zoho_id + bogus sig) is REJECTED —
#      the worker should fall back to KV / create new, not overwrite the
#      victim's record.
#   6. A different lead_sid using the original sig is REJECTED.
#
# Usage:
#   bash scripts/smoke-partial-lead.sh
#   ENDPOINT=https://chesswize.in bash scripts/smoke-partial-lead.sh
#   ENDPOINT=http://localhost:8787 bash scripts/smoke-partial-lead.sh   # wrangler dev
#
# Exit code 0 = all passed. Non-zero = at least one assertion failed.
#
# Notes
# - These tests do create real Zoho leads via the worker. Use a safe
#   phone like 9999900000 and a clearly-flagged parent_name like
#   "SMOKE TEST — DELETE" so they're easy to identify and prune.
# - The script assumes `curl`, `jq`, and `python3` are available.

set -uo pipefail

ENDPOINT="${ENDPOINT:-https://chesswize.in}"
URL="${ENDPOINT%/}/api/leads/partial"

pass=0
fail=0
fails=()

ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; pass=$((pass+1)); }
bad()  { printf "  \033[31m✗\033[0m %s\n" "$1"; fail=$((fail+1)); fails+=("$1"); }
hdr()  { printf "\n\033[1m── %s ──\033[0m\n" "$1"; }

# JSON helper — pulls a key from a JSON body; '' if missing.
jget() {
  python3 -c "import json,sys; d=json.loads(sys.stdin.read() or '{}'); v=d.get('$1', ''); print(v if isinstance(v,(str,int,float,bool)) else json.dumps(v))" 2>/dev/null
}

post() {
  curl -s -X POST -H "content-type: application/json" -H "origin: https://chesswize.in" \
    --max-time 15 "$URL" -d "$1"
}

printf "Smoke testing \033[1m%s\033[0m\n" "$URL"

# ─── 1. Validator: missing lead_sid → 400 ─────────────────────────────────
hdr "1. Validator errors"
body=$(post '{}')
err=$(echo "$body" | jget error)
if [[ "$err" == "lead_sid_required" ]]; then ok "missing lead_sid → lead_sid_required"
else bad "expected lead_sid_required, got: $body"; fi

# ─── 2. Validator: lead_sid present but no contact field ─────────────────
body=$(post '{"lead_sid":"smoke-no-contact","fields":{"parent_name":"X"}}')
stored=$(echo "$body" | jget stored)
reason=$(echo "$body" | jget reason)
if [[ "$stored" == "False" || "$stored" == "false" ]] && [[ "$reason" == "no_contact_field" ]]; then
  ok "no phone/email → stored:false reason:no_contact_field"
else
  bad "expected stored:false reason:no_contact_field, got: $body"
fi

# ─── 3. Lenient validator: phone-only OK ─────────────────────────────────
hdr "2. Lenient acceptance"
SID1="smoke-$(date +%s)-phone"
body=$(post "$(printf '{"lead_sid":"%s","fields":{"phone":"+91 9999900000","parent_name":"SMOKE TEST — DELETE phone-only"}}' "$SID1")")
stored=$(echo "$body" | jget stored)
zoho_id=$(echo "$body" | jget zoho_id)
zoho_sig=$(echo "$body" | jget zoho_sig)
if [[ "$stored" == "True" || "$stored" == "true" ]] && [[ -n "$zoho_id" ]]; then
  ok "phone-only accepted → zoho_id=$zoho_id"
else
  bad "phone-only should be accepted; got: $body"
fi
if [[ -n "$zoho_sig" ]]; then ok "response carries zoho_sig"
else bad "response missing zoho_sig (LEAD_SECRET unset on worker?)"; fi

# ─── 4. Lenient validator: email-only OK ─────────────────────────────────
SID2="smoke-$(date +%s)-email"
body=$(post "$(printf '{"lead_sid":"%s","fields":{"parent_email":"smoke+%s@example.com","parent_name":"SMOKE TEST — DELETE email-only"}}' "$SID2" "$SID2")")
stored=$(echo "$body" | jget stored)
if [[ "$stored" == "True" || "$stored" == "true" ]]; then ok "email-only accepted"
else bad "email-only should be accepted; got: $body"; fi

# ─── 5. Same sid + correct sig → trusted, updates the SAME record ─────────
hdr "3. HMAC signature trust"
if [[ -n "$zoho_id" && -n "$zoho_sig" ]]; then
  body=$(post "$(printf '{"lead_sid":"%s","zoho_id":"%s","zoho_sig":"%s","fields":{"phone":"+91 9999900000","parent_name":"SMOKE TEST — DELETE updated"}}' "$SID1" "$zoho_id" "$zoho_sig")")
  rid=$(echo "$body" | jget zoho_id)
  if [[ "$rid" == "$zoho_id" ]]; then
    ok "valid (sid, zoho_id, sig) → same zoho_id returned (record updated)"
  else
    bad "expected same zoho_id $zoho_id, got $rid; body: $body"
  fi
else
  bad "skipping — first request didn't return zoho_id/zoho_sig"
fi

# ─── 6. SECURITY: spoofed sig → must NOT trust the client zoho_id ────────
hdr "4. HMAC spoof-attempt rejection"
if [[ -n "$zoho_id" ]]; then
  bogus="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  body=$(post "$(printf '{"lead_sid":"smoke-spoof-%s","zoho_id":"%s","zoho_sig":"%s","fields":{"phone":"+91 9999900001","parent_name":"SPOOF ATTEMPT — DELETE"}}' "$(date +%s)" "$zoho_id" "$bogus")")
  rid=$(echo "$body" | jget zoho_id)
  if [[ -n "$rid" && "$rid" != "$zoho_id" ]]; then
    ok "bogus sig + victim zoho_id → server created NEW record ($rid), did not overwrite victim"
  else
    bad "SECURITY: bogus sig was trusted? returned zoho_id=$rid (victim was $zoho_id); body: $body"
  fi
else
  bad "skipping — no victim zoho_id captured"
fi

# ─── 7. Same sig but different lead_sid → not trusted ────────────────────
if [[ -n "$zoho_id" && -n "$zoho_sig" ]]; then
  body=$(post "$(printf '{"lead_sid":"smoke-other-sid-%s","zoho_id":"%s","zoho_sig":"%s","fields":{"phone":"+91 9999900002","parent_name":"SID-MISMATCH — DELETE"}}' "$(date +%s)" "$zoho_id" "$zoho_sig")")
  rid=$(echo "$body" | jget zoho_id)
  if [[ -n "$rid" && "$rid" != "$zoho_id" ]]; then
    ok "sig from lead_sid A reused on lead_sid B → server created NEW record (sig is sid-bound)"
  else
    bad "SECURITY: sig was trusted across lead_sids; returned zoho_id=$rid (was $zoho_id); body: $body"
  fi
fi

# ─── 8. Honeypot — silently filtered, never written ──────────────────────
hdr "5. Honeypot"
body=$(post '{"lead_sid":"smoke-honeypot","fields":{"phone":"+91 9999900099","website_url":"http://spam.example"}}')
stored=$(echo "$body" | jget stored)
note=$(echo "$body" | jget note)
if [[ "$stored" == "False" || "$stored" == "false" ]] && [[ "$note" == "filtered" ]]; then
  ok "website_url honeypot → stored:false, note:filtered"
else
  bad "honeypot should silent-filter; got: $body"
fi

# ─── Summary ─────────────────────────────────────────────────────────────
printf "\n\033[1m──────────────────────────────────────────\033[0m\n"
printf "  \033[32m%d passed\033[0m  \033[31m%d failed\033[0m\n" "$pass" "$fail"
if [[ $fail -gt 0 ]]; then
  printf "\nFailures:\n"
  for f in "${fails[@]}"; do printf "  - %s\n" "$f"; done
  exit 1
fi
exit 0
