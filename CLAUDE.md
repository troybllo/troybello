# Project: [Troy Bello] — Freelance Site

## Source of truth (priority order)

1. ./design/README.md and ./design/sample.html (from Claude Design).
   These own CONTENT, copy, sections, and intended structure.
2. Visual reference: <https://bymonolog.com>.
   Use ONLY as the quality bar and aesthetic north star for typography, glitch background,
   spacing rhythm, whitespace, and motion and assests.
3. On conflict: README wins on WHAT content exists and how it's organized;
   the reference wins on HOW it looks and feels. If a real conflict appears,
   stop and ask instead of guessing.

## Stack (override if I say otherwise)

- Next.js (App Router) + TypeScript
- Tailwind with a real token layer (no magic numbers scattered in JSX)
- Framer Motion for tasteful entrance/scroll motion
- Fonts self-hosted via next/font

## Design system — build ONCE, reuse everywhere

Before building any section, extract into tailwind.config + a globals token layer:
type scale (families, weights, sizes, line-heights), color palette, spacing
scale, radii, shadows, motion timings. Every section uses these tokens only.

## Working style

- Work SECTION BY SECTION. Build one, stop, wait for my review, then continue.
- Before coding a section, restate in 2-3 lines what it is and the key decisions.
- Reuse components before creating new ones. Keep them small and composable.
- Maintain PROGRESS.md: todo / in-review / done.
- Match the FEEL and QUALITY of the reference, not a pixel clone. Typography
  and whitespace are the top priority; the prior design was weak there.

## Constraints

- Responsive, accessible (semantic HTML, keyboard nav, alt text, prefers-reduced-motion).
- No lorem where the README provides real copy.
- No heavy dependencies without telling me why. Ask before large refactors.
