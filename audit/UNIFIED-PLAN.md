# ChessWize — Unified Implementation Plan

**Source:** 3-way audit (Claude browser + Codex CLI + Gemini CLI) — see `CONSOLIDATED-AUDIT.md`.
**Branch:** `audit-fixes`
**Scope:** Everything all three auditors agreed on, MINUS button flattening (user wants to keep the premium button chrome).

Target: move from **4.8 → 7.5+** in ~8 engineering hours.

---

## Guardrails

- **Keep** the gradient + shadow button style (`.gs-btn-primary`). User explicitly wants to preserve this premium weight.
- **Keep** pricing transparency, refund guarantee, parent-dashboard mockup, multi-step form architecture, video testimonials, Worker+Resend+Zoho pipeline.
- **Don't rewrite** — subtract. Delete first; change second; add only when deleting would leave a hole.

---

## Phase 1 — Trust hygiene (30 min, blast radius: low, user-visible: very high)

| # | Change | Location |
|---|---|---|
| 1.1 | Replace `chesswize79@gmail.com` → `hello@chesswize.in` everywhere (footer + 6 legal pages + Resend sender) | `App.tsx:3075, 3577, 3588, 3661, 3678, 3694, 3723, 3786, 3822` |
| 1.2 | Remove "Designed by Engaze Digital" footer credit + legal credit | `App.tsx:3122, 3496` |
| 1.3 | Delete unrendered `ExitIntentPopup` function (dead bundle weight) | `App.tsx:2943+` |
| 1.4 | Move hero video from `chesswize.com/wp-content/.../WhatsApp-Video-….mp4` → `/public/hero-live-training.mp4` (or re-use existing local asset) | `App.tsx:265` |
| 1.5 | Move `chesswize.com/wp-content/.../Untitled-design-*.png` (Star Performers + review avatars) to `/public/` with meaningful names | `App.tsx:2187, 2195, 2203, 2261+` |
| 1.6 | Remove the "FOLLOW US" social block if no real accounts exist (trust drain) | footer |

## Phase 2 — Color discipline (45 min, blast radius: medium, user-visible: high)

Target accent palette:
- **Brand blue** = primary (`#2563EB` / `blue-600`)
- **Emerald** = success-state ONLY (refund, ✅ bullets)
- **Red** = error/warning ONLY (Problem section retains it; nowhere else)
- **Amber** = certificate iconography ONLY (not headlines, not eyebrows)
- **Orange** = DELETE entirely

| # | Change | Location |
|---|---|---|
| 2.1 | Delete rainbow gradient bar at top of BottomForm: `from-blue-600 via-emerald-500 to-amber-500` → solid `bg-blue-600` | `App.tsx:2654` |
| 2.2 | Delete rainbow vertical timeline: `from-blue-200 via-emerald-200 to-amber-200` → solid `bg-blue-200` | `App.tsx:1530` |
| 2.3 | Normalize all orange/amber headline gradients to brand blue: "Excellence is **engineered**" (star performers), "Graduate with **Distinction**" (certificate), "Hear it from **real families**" (testimonials) — emphasis word goes blue or neutral-bold instead | various H2s |
| 2.4 | Normalize non-semantic green "THE PROCESS"/"TAKE THE NEXT STEP" eyebrows → blue or slate | eyebrows |
| 2.5 | Audit Badge components and collapse to 2 variants: `brand` (blue) and `semantic` (green=success / red=error) | component usage |

## Phase 3 — Hero declutter (1 hr, blast radius: high, user-visible: very high)

**Keep above fold:**
- H1 + sub
- Age select + primary "Book Free Demo" CTA
- "Or ask us on WhatsApp" secondary CTA
- Video panel (right column on desktop)

**Remove from above fold:**
- 4-step mini-preview strip
- Pulse badge "STRICTLY MAX 6 KIDS PER BATCH" → delete or move to scarcity footer strip
- Priya Sharma counselor avatar strip → move to "What happens after you book" section below

| # | Change | Location |
|---|---|---|
| 3.1 | Drop pulse eyebrow | `App.tsx` hero block |
| 3.2 | Drop 4-step mini-preview inside form panel | `App.tsx:212`ish |
| 3.3 | Move counselor strip below form (into value-stack section or new "next steps" block) | `App.tsx:220`ish |
| 3.4 | Reduce hero video overlay chrome (no "Inside Live Training" red badge if video already clearly plays) | `App.tsx:260`ish |
| 3.5 | Remove hero framer-motion fade-in from content (keep for decorative bits only) so LCP lands instantly | `App.tsx:170+` |

## Phase 4 — Mentor section (20 min)

| # | Change | Location |
|---|---|---|
| 4.1 | "Tarun Sir" → "Tarun R., Head Coach & Founder" | mentor card |
| 4.2 | Remove sun emoji badge | mentor card |
| 4.3 | Enlarge coach photo from ~60px to 200px+ | mentor card |
| 4.4 | Soften "Only the top 1% of coaches make it in" → "6 head coaches, hired from 380 applicants in 2025" (replace with verifiable number) OR delete the claim | section headline |
| 4.5 | Reduce pill row (Background-verified, FIDE-titled only, Classes recorded) to integrated bullets | pill row |

## Phase 5 — Testimonials (1 hr)

**Target format per review:**
```
[⭐⭐⭐⭐⭐]  "One-line punchy headline."
           "Two-line supporting quote." — 1 sentence of context.
           [Metric: e.g. "800 → 1340 Elo in 6 months"]
           — Rupali, Lucknow · Mar 2026
```

| # | Change | Location |
|---|---|---|
| 5.1 | Cut each 6–8 line paragraph to: headline (1 line) + quote (2 lines) + 1 metric + name/city/date | `App.tsx:2261-2310` |
| 5.2 | Replace emoji/generic yellow ★ with custom SVG star (brand amber `#D97706`, 14px, 2px gap) | render logic |
| 5.3 | Fix test poster framing: play button moves from center to bottom-right; or add `object-position: top` so faces aren't cropped at nose | `VideoCard` |

## Phase 6 — Form copy (20 min)

| # | Change | Before → After |
|---|---|---|
| 6.1 | "We review every application by hand." | → "Our academic counsellor uses these answers to match the right coach and batch." |
| 6.2 | "Incomplete or vague submissions are discarded." | → *delete entirely* |
| 6.3 | "Only 12 evaluations this week" / "strict cohort capacity" | → remove fake-scarcity lines |
| 6.4 | "This isn't a generic sign-up form." | → keep, already calm |

## Phase 7 — Polish (45 min)

| # | Change | Location |
|---|---|---|
| 7.1 | `.gs-glass` → `rgba(255,255,255,0.72) + saturate(180%) blur(20px)` (Apple pattern), eliminates text bleed | `index.css:121` |
| 7.2 | Unify meta description: pick one accreditation story (FIDE OR AICF, not both) and age range (5–14) | `index.html` + copy scan |
| 7.3 | Clean section IDs: delete `star-_r_0_`-style IDs, keep only meaningful ones | section usage |
| 7.4 | Make `<div>` header logo into `<button>` or `<Link to="/">` | `App.tsx:125` |
| 7.5 | Remove `hover-lift` from purely informational cards (problem comparison, value stack) | various cards |
| 7.6 | Remove `font-optical-sizing: auto; word-spacing: -0.02em` (no-op on Jakarta Sans) | `index.css:140` |
| 7.7 | Remove `drop-shadow-sm` on headings | heading utilities |

## Phase 8 — Verify on localhost (30 min)

1. `bun run dev`
2. Walk: hero → problem → testimonials → mentor → methodology → tuition → certificate → FAQ → form → footer
3. Check mobile viewport (DevTools 390×844)
4. Check dark/contrast leaks on nav at each section boundary
5. Lighthouse sanity check (not the goal, but a smoke test)

---

## Explicit NOT-doing in this pass

- Button flattening (user keeping premium chrome)
- Copywriting overhaul beyond testimonials + form
- Photography reshoot (noted as ~20h follow-up)
- Certificate redesign
- Coach additions (only 1 coach → 3+) — needs real data

---

## Commit strategy

One commit per phase so any regression can be bisected. Branch: `audit-fixes`. PR to main once localhost verify passes.
