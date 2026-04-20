# ChessWize.in — Deep UI/UX Audit

**Three-way audit:** Claude (browser walkthrough + code read) · Codex CLI (code audit) · Gemini CLI (code audit)
**Date:** 2026-04-20
**Full reports:** `audit/gemini_report.md`, `audit/codex_report.md`

---

## Verdict

| Auditor | Score | One-line summary |
|---|---|---|
| **Codex** | 4.2 / 10 | Overdesigned + overpersuaded — premium cosplay |
| **Gemini** | 5.5 / 10 | Good copy, rainbow palette + Web 2.0 chrome |
| **Claude** | 4.8 / 10 | Strong bones, amateur finishing — 6 accent colors, stock chrome, domain leaks |
| **Consensus** | **~4.8 / 10** | Reads as *trying hard to look premium*, not premium. |

**The diagnosis all three agree on:** Content and product substance are there. The execution layer — color discipline, typographic restraint, trust/domain hygiene, visual chrome — is what's dragging it below world-class. Not a rewrite. A *subtraction*.

---

## Top 10 Fixes That Move The Needle Most (ranked)

1. **Kill the 6-color rainbow accent system.** Blue is your brand. Amber = certification only. Emerald = success-state only. Red = errors only. Remove orange entirely. Strip the rainbow divider at `App.tsx:2654` and the blue→emerald→amber timeline at `App.tsx:1530`.
2. **Replace `chesswize79@gmail.com` everywhere.** Footer + 6 legal pages. Switch to `hello@chesswize.in`. A Gmail with a numeric suffix is the single most amateur-looking element on the site.
3. **Fix the domain identity leak.** Hero video still pulls from `chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-…mp4` (`App.tsx:265`). Three testimonial photos at `App.tsx:2187/2195/2203` and all review avatars are on `chesswize.com/wp-content/…`. Move to `/public` with clean filenames.
4. **Remove "Designed by Engaze Digital" from footer and legal pages.** `App.tsx:3122` and `App.tsx:3496`. Agency credit on a premium brand footer is a tell. Delete.
5. **Rebuild the hero.** Delete counselor strip, 4-step mini-preview, pulsing badge, "strictly max 6 kids" eyebrow. Keep: headline, subhead, one CTA, one proof row. Move everything else below fold. (All three auditors called this.)
6. **Flatten buttons.** `.gs-btn-primary` in `index.css:173+` stacks: gradient + 2 inset shadows + 2 drop shadows + text-shadow. Replace with a single flat color + 1px inner highlight. Linear/Stripe are flat.
7. **Shorten testimonials.** `App.tsx:2257` — 6-to-8-line paragraphs read like fabricated marketing copy. Convert each to: one-line headline + 2-line quote + metric + identity. Add dates.
8. **Fix the sticky nav bleed.** `.gs-glass` is `rgba(255,255,255,0.95)` — 5% transparent, so dark text visibly shows through. Bump to `0.85` + `backdrop-filter: saturate(180%) blur(20px)` (Apple pattern), or bump to solid `#fff` with `box-shadow: 0 1px 0 rgba(0,0,0,.05)`.
9. **Replace "Tarun Sir" with a professional name treatment.** `Tarun R.` or `Tarun [Lastname], Head Coach`. "Sir" reads as informal in a premium context.
10. **Remove the unrendered `ExitIntentPopup` component (`App.tsx:2943`).** Dead code in bundle. User already removed it from rendering — finish the job.

---

## CRITICAL — trust-breakers, bounce triggers

### C1. Gmail domain address (`chesswize79@gmail.com`)
- **Where:** Footer `App.tsx:3075`, Privacy `:3577/3588`, Terms `:3661`, Refund `:3678/3694`, Disclaimer `:3786/3822`, Cookie `:3723`.
- **Why amateur:** No world-class SaaS uses Gmail. The "79" suffix looks like a personal inbox someone created when `chesswize@gmail.com` was taken. Compare to `support@linear.app`, `help@stripe.com`.
- **Fix:** Set `hello@chesswize.in` + `support@chesswize.in` in Resend (chesswize.in already has the `updates.` subdomain verified — adding root domain is trivial).

### C2. Hero video sourced from WordPress backend URL
- **Where:** `App.tsx:265` → `https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22.mp4`.
- **Why amateur:** Exposes that the "Inside Live Training" video is a WhatsApp-exported file on an old WordPress install. Anyone hitting DevTools sees the filename and the illusion breaks.
- **Fix:** Re-encode and rename to `/public/hero-live-training-1080p.mp4`; serve through Cloudflare CDN (already wired).

### C3. Testimonial photos + avatars live on a different domain
- **Where:** `App.tsx:2187, 2195, 2203` (Star Performers) and all `App.tsx:2261+` review avatars → `chesswize.com/wp-content/…/Untitled-design-*.png`.
- **Why amateur:** File names literally say "Untitled-design-28.png". Mixing domains creates CORS-style trust seams a savvy parent notices. Also images labeled "Untitled" means no art direction happened.
- **Fix:** Bring images local, rename meaningfully (`saanvika-tournament.webp`, `parent-rupali-lucknow.webp`), convert to WebP via `cwebp -q 85`.

### C4. Rainbow color palette destroys brand identity
- **Where:** Blue (hero, nav, CTA), Orange (testimonials eyebrow + "real families" gradient + "Parent" badges), Red (Problem section), Amber (Certificate, "Graduate with Distinction"), Emerald (refund panel, "Best for" pills, "training process" gradient), Purple (methodology glow), plus an actual **rainbow bar** at `App.tsx:2654` (`from-blue-600 via-emerald-500 to-amber-500`) and `App.tsx:1530` timeline (`from-blue-200 via-emerald-200 to-amber-200`).
- **Why amateur:** World-class brands use 1–2 accents. Stripe = blurple. Linear = near-mono with a single cool glow. Apple = neutral + brand hue per product. Six accent systems reads as "pieced together from multiple templates."
- **Fix:** One accent (blue). Semantic only: emerald for success-states, red for errors, amber for award/certificate iconography. Delete the rainbow gradient bars entirely.

### C5. "Designed by Engaze Digital" agency credit
- **Where:** `App.tsx:3122` (footer), `App.tsx:3496` (legal page footer).
- **Why amateur:** White-label agency credits are the #1 signal that the brand doesn't own its own design. Stripe/Linear/Apple do not link to their outside agencies.
- **Fix:** Remove both references. Legal copyright is `© 2026 Chesswize Education LLP.` — enough.

### C6. Sticky-nav transparency bleed
- **Where:** `.gs-glass` in `index.css:121` — `rgba(255, 255, 255, 0.95)` + 12px blur.
- **Why amateur:** 5% transparency with a mere 12px blur is visibly leaky — dark body text shows through when scrolling past dark sections (Tuition, Methodology). Captured in screenshots. Apple uses `rgba(255,255,255,0.72) + saturate(180%) + blur(20px)` precisely because higher-saturation blur masks the leak.
- **Fix:**
  ```css
  .gs-glass {
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }
  ```
  Or fully opaque with a hairline shadow: `background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,0.06);`

### C7. Coercive + inflated trust copy
- **Where:** "Strictly max 6 kids per batch" (hero), "top 1% of coaches" (mentor), "we mathematically prevent this" (problem), "only 12 new evaluations this week" (form), "incomplete or vague submissions are discarded" (form submit). `App.tsx:164, 236, 1731, 2880`.
- **Why amateur:** Performance marketing vocabulary. Parents recognize funnel tactics. Premium brands don't bully belief.
- **Fix:** Replace "top 1%" → "We hired 6 head coaches from 380 applicants in 2025." Replace "mathematically prevent this" → "Every student is tracked on 5 pedagogical dimensions and a coach adjusts when any stall for 2 weeks." Delete the "discarded" threat completely.

### C8. Testimonial videos use un-curated phone-selfie thumbnails
- **Where:** `/public/testimonial-*-poster.webp`.
- **Why amateur:** Posters crop parents' faces at nose-level with a blue play button placed over the mouth. Reads as unvetted WhatsApp videos. MasterClass / Superhuman use consistent framing + studio lighting.
- **Fix:** Re-frame each poster — select a frame where subject is waist-up with eyes in the upper third. Move play button to bottom-right corner, not center-of-face. OR: use a blurred/desaturated poster and let click-to-play reveal the raw video.

---

## MAJOR — visible quality gap vs Linear/Stripe/Apple

### M1. Hero is overloaded
- 11 elements above the fold: pulse eyebrow, headline, subhead, age dropdown, primary CTA, WhatsApp CTA, counselor strip, next-batch strip, video panel with play chip, red badge, refund pill. World-class heroes have **4**.
- **Fix:** Headline + subhead + one CTA + one proof row. Move counselor, process-preview, and refund messaging to a dedicated "What happens next" section.

### M2. Button styling (`.gs-btn-primary`) is Web 2.0
- `index.css:173+`. Gradient + double inset + double outer shadow + text-shadow. Nothing premium has shipped with this stack since ~2014.
- **Fix:** `background: #1D4ED8; box-shadow: inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 2px rgba(15,23,42,0.1);` — that's all Stripe does.

### M3. Badge + eyebrow spam
- Almost every section has: tiny uppercase eyebrow + Lucide icon + colored pill. `App.tsx:415, 526, 638, 706, 755, 804, 1686, 2033…`
- **Fix:** Remove ~80% of eyebrows. Let H2 + spacing carry hierarchy. Keep eyebrows only for marquee moments (hero, final CTA).

### M4. Long-form reviews read as fabricated
- `App.tsx:2257+`. 6–8 line paragraphs with chess jargon ("puzzle accuracy 25% → 61%", "K+R vs K+R endgames", "Checks-Captures-Threats drill").
- **Fix:** One-line summary headline + 2-line quote + single metric + name/city/date. Link to "Read the full story" for long-form.

### M5. Competing mobile CTAs
- WhatsApp FAB + MobileStickyCTA + floating "Academic Counselor" pill = 3 persistent floating elements.
- **Fix:** Consolidate into one bottom bar with two icon buttons (WhatsApp + Book Demo). Kill the pill.

### M6. Only one coach on a "top 1%" page
- "Only the top 1% of coaches make it in" but only Tarun Sir is shown, as a 60px thumbnail with a sun-emoji badge.
- **Fix:** Show 3–6 coaches minimum with consistent portraits (same lighting/crop). Replace "Tarun Sir" with "Tarun [Lastname]" + title. Drop the emoji badge.

### M7. Certificate mockup looks like Canva
- Fake gold double-border + centered trophy + serif "CERTIFICATE OF EXCELLENCE" at `App.tsx:2033+` region.
- **Fix:** Redesign as a clean modern certificate (inspired by: Apple Developer Program certs, Stripe ATLAS, CS50). Or omit the image and show only the Certificate *fact* as a trust feature.

### M8. Form asks for too much on a cold page
- Name, age, level, goals, commitment, phone, city, referral before any human contact.
- **Fix:** Step 1 = name + phone + child age + chess level. Rest happens on WhatsApp.

### M9. Form copy threatens applicants
- "We review every application by hand" + "incomplete or vague submissions are discarded" + "strict cohort capacity."
- **Fix:** Calm concierge tone: "Our counselor uses these details to match the right coach and batch."

### M10. Stars in parent reviews are generic yellow emoji
- `App.tsx:2257+` area.
- **Fix:** Custom SVG star set in brand amber (`#D97706` at 85% saturation), 14px, tight 2px gap.

### M11. Typography is doing too much
- Gradient text + `drop-shadow-sm` + extra-tight tracking on multiple headings = startup-template energy.
- **Fix:** Remove `drop-shadow-sm` from headings. Limit gradient-text moment to ONE per page (probably the hero verb).

### M12. Optical sizing rule that does nothing
- `index.css:140-142` sets `font-optical-sizing: auto` + `word-spacing: -0.02em` globally on headings. Plus Jakarta Sans has no optical size axis.
- **Fix:** Delete lines. Rely on Tailwind tracking utilities.

### M13. `font-optical-sizing` + tiny type patches
- `index.css:83` has mobile overrides for `text-[9px]/[10px]/[11px]` → `11px/12px/12.5px`. If you need a global rescue rule, the scale is broken upstream.
- **Fix:** Raise the minimum body-support size to 13px mobile / 14px desktop. Remove the rescue rules.

### M14. Comparison section is adversarial
- "Hobby Clubs ❌ vs ChessWize Programme ✅" at `App.tsx:603`.
- **Fix:** Rename to "Why parents switch to ChessWize" with evidence rows and quotes, not cartoon X/✓ oppositions.

### M15. Section rhythm is metronomic
- Almost every section: `py-16 md:py-24` + centered heading stack + card grid.
- **Fix:** Three rhythms only — hero, narrative block (asymmetric), dense proof block (grid). Alternate intentionally.

### M16. Meta copy inconsistency: FIDE vs AICF, age 5–14 vs 6–16
- Meta `description` says "FIDE-rated coaches… ages 6–16." Hero says "think deeper / max 6 kids, FIDE-rated masters." Stars say "Background-verified | FIDE-titled only." AICF language is missing.
- **Fix:** Pick one accreditation narrative and repeat it verbatim. Pick one age range.

---

## MINOR / MICRO — polish debt

- **Logo is a `<div>`, not a link** (`App.tsx:125`). Make it `<Link to="/">`.
- **SVG logo viewBox was normalized to v2** — keep but ensure naturalWidth never returns 0 in older Chromium.
- **`hover-lift` applied to non-clickable cards.** Reserve for interactive elements only.
- **Section IDs leak React `useId()`** — `star-_r_0_`, `seal-_r_k_`, `base-ui-_r_r_` all exposed. Only `#testimonials`, `#mentors`, `#problem`, `#faq`, `#tuition`, `#methodology` should be addressable.
- **Hero video auto-fade-in** creates a ~1.2s blank hero on first paint. Drop the `opacity:0 → opacity:1` on hero content; animate only the decoration.
- **Academic Counsellor chat pill** (bottom-right) overlaps the hero "You'll talk to Priya Sharma" strip.
- **Social icons** (LinkedIn/Facebook/Instagram) with no real account = trust drain. Remove until populated.
- **Gmail email displayed + "1500+ parents" claim** — pick one source of authority.
- **`a:active` global transform** + button-specific active transform = mushy press feel.
- **"FOLLOW US" heading** in footer with dead social icons.
- **Copyright `© 2026 BY CHESSWIZE`** — redundant "BY" syntax.
- **`ExitIntentPopup` function still in bundle** (not rendered) — dead weight.

---

## STRENGTHS — do not regress

1. **Copy foundations.** "Help your child think deeper, not scroll longer" is a genuinely sharp headline.
2. **Pricing transparency.** Three tiers with real ₹ values + discount breakdown beats 90% of education sites.
3. **Parent-dashboard mockup.** `App.tsx:822` gives the page actual product substance.
4. **Video-first testimonials.** Real parents > text reviews on a kids-education site.
5. **Form validation + multi-step flow.** Technical implementation is competent.
6. **Worker + Resend + Zoho pipeline.** Infrastructure is solid; no leaks here.
7. **Refund guarantee + "parents welcome to observe" callout.** Real differentiators.
8. **Tailwind v4 + React 19 + Vite.** Tech choices are current.

---

## What world-class teams do that this site doesn't

| Dimension | World-class (Stripe/Linear/Apple) | ChessWize current |
|---|---|---|
| Accent colors | 1 primary + semantic reds/greens only | 6 decorative accents |
| Button style | Flat, single tint, 1px inner highlight | Gradient + 5 shadows + text-shadow |
| Hero elements | 4 (headline, sub, 1 CTA, 1 proof) | 11 |
| Testimonial length | 1-line hook + 2-line quote | 6–8 line paragraphs |
| Imagery | All real product / studio-consistent | Mixed stock + phone-selfies + WordPress backend |
| Domain hygiene | All assets on brand domain | Mixed `.in` / `.com` / Gmail |
| Typography | 3–4 sizes, 2 weights, disciplined | Many sizes, many weights, patched at 9px |
| Motion | Purposeful (reinforces structure) | Ornamental (everything fades/lifts) |
| Social proof | Logos, metrics, named quotes | Long generated-feeling paragraphs |

---

## Execution order (if we ship this week)

**Day 1** (30 min): Delete `ExitIntentPopup` function, remove Engaze footer + legal credits, fix Gmail → `hello@chesswize.in`, clean section IDs.

**Day 2** (2 hr): Strip hero of counselor/steps/mini-badge — only head+sub+CTA+one proof row. Flatten `.gs-btn-primary`. Remove `hover-lift` from non-interactive cards.

**Day 3** (3 hr): Recompress testimonial posters with proper face framing. Re-encode hero video + move to local CDN. Bring all WordPress-hosted images to `/public` with proper names.

**Day 4** (2 hr): Color audit — replace all non-semantic emerald/amber/red with blue. Delete rainbow bars at `:1530` and `:2654`.

**Day 5** (2 hr): Shorten testimonials to new format. Rewrite form copy to concierge tone. Fix meta description + AICF/FIDE unification.

**Day 6** (1 hr): Nav `gs-glass` fix, button styling, typography cleanup.

**Total: ~10 engineering hours** to move from 4.8 → 7.5. Another ~20 hours (photography, copywriting, certificate redesign) to reach 8.5+.
