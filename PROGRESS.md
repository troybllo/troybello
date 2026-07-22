# Progress

Plan: `~/.claude/plans/read-design-readme-md-and-design-sample-glimmering-hejlsberg.md`
Design source of truth: `design/README.md` + `design/sample.html`

## In review (latest turn — interactions)

- **Animated grain**: oversized body::after now jitters between positions
  (`@keyframes grain`, steps(1), 0.7s) for boiling static; reduced-motion off
- **About slide-over** (`AboutDrawer`): nav + footer "About" dispatch an
  `open-about` event → right-side panel slides in (studio blurb + EST/Toronto
  meta + portrait with listen/create overlays). Esc/Close/backdrop close,
  focus restore, Lenis stopped via shared `getLenis()`. Inline About section
  removed (Monolog has About as drawer only). Font switched to Geist.
- **Manifesto fill**: now diagonal top-left→bottom-right (per-word position
  threshold) and much slower (scrub over 2.4× paragraph height)

## Prior turn — refinements

- **Nav reactivity**: back to `mix-blend-difference` (composites as a group) —
  auto-inverts over any dark/light background; filled "Start a project"
  button + hover pills invert with it
- **Hero**: brighter smoky halftone fg (#9c968a), reworked vignette (bright
  mid-frame / dark edges) + top-darken strip so the difference nav stays legible
- **Manifesto**: text-manifesto → clamp(30,3.8vw,66), section min-h-svh, wider
  paragraph column
- **Success stories**: media aspect 3/2, image column 2.2fr, taller rows,
  bigger name/metric type
- **Services**: floating preview 300→360px
- **Footer nav meta**: time/location row bigger + medium weight
- **Footer**: "Hold to disrupt" chip now follows the cursor across the band
  (HoldToDisrupt), rests bottom-center otherwise

## Prior turn

- **Hero glitch 1:1**: HalftoneCanvas upgraded with bias/invert/wave uniforms;
  hero now uses Monolog's exact params (amplitude 1.53, pixelSize 3,
  gooeyness 0, contrast 0.9, bias -0.25, invert 0, wave 0.29/3.9), brighter
  fg for the smoky look
- **Static**: global grain opacity .11 → .17
- **Hero wordmark**: 26vw → 18vw so "TROY BELLO" fits/bleeds like MONOLOG,
  greige-300 color
- **Navbar rebuilt 1:1**: scroll-based light detection over `.theme-light`
  (dark text over work section); center links highlight into a filled pill
  on hover; "Start a project" is a solid filled button with the arrow in its
  own chip; sound toggle icon added
- **AudioToggle**: WebAudio ticks (880Hz hover / 560Hz click), default off,
  lazy AudioContext — wired into the nav
- **About** (README §12): portrait + lead/body/meta (Toronto)
- **LogoMarquee**: "Brands I've helped" reverse marquee
- **Preloader**: 0→100 count, slide-up, reduced-motion instant
- **Cursor**: accent dot, grows over interactive, fine-pointer only
- **SectionCounter**: fixed bottom-left NN/TT via IntersectionObserver

## Section order (page.tsx)

Preloader · Cursor · Nav · SectionCounter · [Hero · Manifesto · LogoMarquee ·
CloseTheGap · SuccessStories · Services · ProjectJourney · About · Faq ·
ContactCta · FooterNav] · Footer

## Done

Every planned section + global interaction is built. Full section list, in order,
all implemented: Preloader, Nav (+ AudioToggle), Cursor, SectionCounter, Hero
(halftone shader), Manifesto (scroll word-fill), LogoMarquee, CloseTheGap
(sticky scroll-grow), SuccessStories (light theme), Services (floating hover
preview), ProjectJourney, About, FAQ (accordion), ContactCta (line reveal +
scroll-slide), FooterNav (Toronto clock), Footer (glitch band).

Foundation: Next 16 App Router + TS + Tailwind v4 token layer, self-hosted
fonts, Lenis + GSAP, primitives (Section/Reveal/LineReveal/Kicker/Media/
MarqueeTrack/SwitcherRail/HalftoneCanvas). Palette = Monolog greige, dark
default + `.theme-light`.

## Remaining polish (not yet done)

- Final a11y sweep (keyboard traversal of every interactive element, focus-
  visible styles now that cursor:none is set, VoiceOver pass on accordion/nav)
- Responsive QA on real breakpoints (tablet especially: services floating
  panel, journey rows, footer nav columns)
- Real assets: hero reel, case-study media, portrait, brand logos, step
  visuals (all `Media` slots ready — drop-in, no refactor)
- Section counter counts `main > *` + footer; confirm the intended total
