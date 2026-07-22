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

- Next 16 (App Router) + TypeScript + Tailwind v4, Lenis + GSAP, Geist fonts
- Token layer in `globals.css` (`:root` vars + `@theme`) — colors, type scale,
  spacing, radii, motion; dark default theme + `.theme-light` for the work grid
- Shared primitives: Section, Reveal, LineReveal (both via `useInViewOnce`),
  Kicker, Media, MarqueeTrack, SwitcherRail, HalftoneCanvas
- Helpers: `lib/motion` (prefersReducedMotion, pad2), `lib/cn`, `lib/lenis`,
  `lib/about`

## Production

- Metadata + OpenGraph + Twitter card; generated `opengraph-image`, branded
  `icon.svg`, `robots.txt`, `sitemap.xml`
- `NEXT_PUBLIC_SITE_URL` env var drives canonical URLs
- Imagery: grayscale placeholders in `public/media`, wired through `<Media>` —
  swap files or the `image` fields for real assets, no code changes

## Remaining (optional)

- Real assets (hero reel, case studies, portrait, step visuals, brand logos)
- Deeper a11y sweep (focus-visible styles, screen-reader pass on drawer/nav)
- Tablet-breakpoint QA
