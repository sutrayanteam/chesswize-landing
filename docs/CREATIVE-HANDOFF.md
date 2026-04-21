# ChessWize — Creative & Ops Handoff

Items blocked on non-dev inputs for the Meta campaign relaunch. Engineering shipped Part 3 of `/tmp/meta-audit/deep/CHESSWIZE-EXECUTION-BRIEF.md`; these are the remaining items.

## Blocked on Creative Team

### 1. Hero testimonial video — burned-in English captions
- **File:** `public/testimonial-kid-1.mp4`
- **Why:** 100% of historic ad spend was on mobile-app placements where autoplay is muted. A silent talking-head burns impressions. Brief Part 3.3 requires burned-in (not WebVTT) captions because WebVTT doesn't render in Meta's in-app browser preview or in Reels/Stories overlays.
- **Deliverable:** a new MP4 (same aspect ratio, H.264, <3 MB) with high-contrast English captions burned into the bottom third. Keep the poster (`testimonial-kid-1-poster.webp`) in sync if the first frame changes.

### 2. Counsellor headshot (optional)
- **Target:** Priya Sharma, Academic Counsellor.
- **Spec:** 256×256 square JPG/WebP, >80% face fill, neutral background.
- **Why:** the floating WhatsApp widget + thank-you page currently use the WhatsApp glyph. A real human face measurably lifts CTR on similar SaaS widgets. Not blocking — a green online dot already sits on the widget per brief 3.3.
- **Where it'd go:** `public/priya-headshot.webp`, swap in `WhatsAppWidget` and `/thank-you` hero block.

## Blocked on Client (Meta Business Manager)

Copying directly from Part 4 of the execution brief — these stop the campaigns from launching, regardless of dev work.

- **4.1 Domain verification** — add DNS TXT record for `chesswize.in` in Cloudflare. Verify in Meta BM.
- **4.2 Pixel settings** — turn on Automatic Advanced Matching for `1315250227040245`.
- **4.3 CAPI access token** — Events Manager → Conversions API → Generate Access Token. Ship to engineering via `wrangler secret put META_CAPI_TOKEN` (never commit, never paste in chat).
- **4.4 Aggregated Event Measurement** — set priority slots: Lead > Contact > LeadFormStart > ViewContent > PageView.
- **4.5 Test Events QA** — hand over `META_TEST_EVENT_CODE` during QA, remove before prod.
- **4.6 Retargeting ad** — change CTA from `BOOK_TRAVEL` → `SIGN_UP`, URL → `https://chesswize.in/`.
- **4.7 Upload Custom Audiences** — export 625 leads with quality flag, upload 5 segments (`paid` / `demo_attended` / `replied` / `contacted` / `raw`).
- **4.8 Exclusion audiences** — stack into every prospecting ad set.
- **4.9 301 redirect** — `chesswize.com/*` → `https://chesswize.in/$1` at Cloudflare.
- **4.10 Unify WhatsApp number** — pick `+91 70075 78072` (new LP) as the single number, deprecate `+91 84009 79997`.
- **4.11 Ad account top-up** — account is currently at ₹0 balance + spend cap.

## Part 9 Open Questions — need answers from client

1. Can the CRM export the 625 historical leads with a quality flag for Lookalike seeding?
2. How many of those 625 became paying customers? (baseline for CAC comparison)
3. Which WhatsApp number wins — `7007578072` or `8400979997`?
4. Monthly media budget for the rebuild? (Brief recommends ₹90k–₹120k for month 1.)
5. After-hours WhatsApp auto-responder setup — does one exist for <10 AM / >8 PM IST?
6. Does the form copy need explicit marketing-consent language (GDPR-style) for Advanced Matching?

## Engineering — post-ship checklist

Once creative + client items above are resolved:

- `wrangler secret put META_CAPI_TOKEN` in the `chesswize-lead-api` worker (and `META_TEST_EVENT_CODE` during QA).
- Run the Part 3.5 acceptance checklist (15 items) against staging with the test code. Capture Events Manager screenshot showing `Deduplicated` status on both browser + server Lead.
- Remove `META_TEST_EVENT_CODE` secret when moving to production.
- Confirm `_fbp` / `_fbc` cookies are present after landing with `?fbclid=TEST`.
- Sitemap already lists `/` + 5 legal pages; `/thank-you` deliberately excluded (noindex).

---

References:
- `/tmp/meta-audit/deep/CHESSWIZE-EXECUTION-BRIEF.md` — the full execution brief (three-reviewer synthesis).
- `/tmp/meta-audit/META-ADS-REPORT.md` — 46-check scorecard of the historical account.
- `worker/src/lib/capi.ts` — server-side Meta Conversions API sender.
- `src/lib/tracking.ts` — client-side fbq helpers.
- `src/lib/attribution.ts` — first-touch attribution store.
- `src/pages/ThankYou.tsx` — conversion route, fires dedup'd Lead fbq.
