# Landing Page Source Backups

Full snapshots of `src/App.tsx` at key checkpoints in the session. Each is self-contained and can be `cp`-ed back to `src/App.tsx` to restore that exact state.

| File | Checkpoint | Approx. lines | What it contains |
|------|-----------|---------------|------------------|
| `App.01-original-pre-session.tsx`  | Commit b01297d | 2300 | Original state before this session's work |
| `App.02-post-overhaul.tsx`         | Commit f4ce628 | 3500 | After: pricing rewrite, premium icons, trust signals, CRO P0/P1/P2 items |
| `App.03-post-hero-rewrite.tsx`     | Commit 94e78ff | 3500 | After: hero CRO rewrite (cut 5 benefit pills, research card, 3 mini cards) |
| `App.04-post-cuts-CURRENT.tsx`     | Uncommitted working copy | ~3500 | After: 10 CRO sections removed from render order |

## Also available
- `src/components/HeroLegacy.backup.txt` — just the pre-rewrite Hero function (12KB).

## What the 3-way CRO audit cut from the render order (10 sections)
Sections that still exist as functions in the file but are no longer rendered:
- `ProgramStats`, `Transformation`, `Curriculum`, `LearningModes`, `FounderStory`,
  `ParentAssessmentQuiz`, `DailyRegimen`, `MidPageCTA`, `EloProjectionCalculator`, `InteractivePuzzle`

## Restore recipes

```sh
# Full revert to pre-CRO-cut state (most common rollback you'd want):
cp src/backups/App.03-post-hero-rewrite.tsx src/App.tsx

# Full revert to just before this entire session:
cp src/backups/App.01-original-pre-session.tsx src/App.tsx

# Revert only the hero (keep everything else current):
# Open src/components/HeroLegacy.backup.txt, replace the current Hero function in src/App.tsx with it.

# Add back a cut section (e.g. ParentAssessmentQuiz) without full revert:
# In src/App.tsx, inside the LandingPage function, add back:
#   <ParentAssessmentQuiz />
# at the position you want. The function definition is still in the file.
```

After any restore, run `bun run lint` to typecheck before deploying.
