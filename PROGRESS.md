# Progress

Design source of truth: `design/README.md` + `design/sample.html`

## Status: production-ready

All sections and global interactions are built, the code has been cleaned, and
placeholder imagery is wired in. `npm run build` and `npm run lint` are clean.

## Sections (page.tsx order)

Preloader · Cursor · Nav (+ AudioToggle) · AboutDrawer · SectionCounter ·
[ Hero · WordMarquee · Manifesto · LogoMarquee · CloseTheGap · SuccessStories ·
Services · ProjectJourney · Faq · ContactCta · FooterNav ] · Footer

## Foundation

- Next 16 (App Router) + TypeScript + Tailwind v4, Lenis + GSAP
- Fonts: Geist Sans/Mono for UI + body; Archivo (variable, `wdth` axis) as the
  display face via the `.display-face` class — a stand-in for Monolog's Animo,
  which is commercially licensed. Scoped to the `text-display-xl` and
  `text-display` roles only (CloseTheGap, ContactCta)
- Token layer in `globals.css` (`:root` vars + `@theme`) — colors, type scale,
  spacing, radii, motion; dark default theme + `.theme-light` for the work grid
- Shared primitives: Section, Reveal, LineReveal (both via `useInViewOnce`),
  Kicker, Media, MediaCycle, StoryFrame, CursorCue, MarqueeTrack, SwitcherRail,
  HalftoneCanvas
- `MediaCycle` cross-fades stills on a 1s beat (pauses off-screen, on hidden
  tab, and under reduced motion). Pass `video="…"` to swap the whole cycler for
  a real looping reel — used by CloseTheGap
- Helpers: `lib/motion` (prefersReducedMotion, pad2), `lib/cn`, `lib/lenis`,
  `lib/about` (About-drawer copy + the shared `STATS` proof points, also
  consumed by Manifesto)

## Production

- Metadata + OpenGraph + Twitter card; generated `opengraph-image`, branded
  `icon.svg`, `robots.txt`, `sitemap.xml`
- `NEXT_PUBLIC_SITE_URL` env var drives canonical URLs
- Imagery in `public/media`, wired through `<Media>` / `<MediaCycle>` — swap
  files or the `image` fields for real assets, no code changes. 4K masters live
  in the gitignored `assets-src/`; see `design/ASSETS.md`

## In review

- Success Stories panes — `StoryFrame` composites the client's actual site over
  a backdrop still: entering view dims the still to 45% and fades/scales the
  inset in, then the site cycles. Per story, pass either `frames` (cross-faded
  screens) or `video` (a looping reel); add `href` to make the pane a link with
  a cursor-following "Visit …" cue. States live in `globals.css` under
  `.story-frame` / `.cursor-cue`. Wired to the three live client sites
- About drawer — expanded to a 3-paragraph bio, stats row, contact links, and
  an availability line. Compare against the reference screenshot
- CloseTheGap scroll-grow retuned (scale 0.38 → 2.2 across the section's full
  travel, words spread 9vw → 0). Desktop only; mobile stays stacked and static

## Remaining (optional)

- Real assets still on placeholders: contact CTA, FAQ portrait, about portrait,
  the six `gap-*.jpg` frames, and the two circular testimonial avatars (the
  avatars need a code change, not just files)
- `gap-4.jpg` is landscape (1.40) in the 3:4 gap frame — 46% cropped and soft
- Process step 01/02 media is low-res: `journey/01.mp4` is 854×480 and
  pillarboxed to a real 482×480; `journey-2.gif` is 720×560. Both are upscaled
  ~2× in a frame that renders ~1440px. Re-capture with a screen recorder
  rather than a phone pointed at a monitor
- Licensed Animo/KH Teka woff2 to replace the Archivo stand-in, if bought
- Deeper a11y sweep (focus-visible styles, screen-reader pass on drawer/nav)
- Tablet-breakpoint QA
