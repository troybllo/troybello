# Handoff: Troy Bello — Freelance Studio Site

## Overview
A single-page, dark-editorial marketing site for a freelance web designer/developer (Troy Bello). Sections: fixed nav, centered hero (grain background + bleeding wordmark), stats, marquees, scroll-fill manifesto, "close the gap" scroll-grow section, light "success stories" work grid with service filters, testimonials, a stacked hover services list, a 3-step process, about, FAQ accordion, a large contact CTA, and a footer. It's motion-heavy: preloader, smooth (lerp) scroll, scroll-driven type reveals, custom cursor, magnetic button, and optional UI audio.

## About the Design Files
The file in this bundle (`Troy Bello.dc.html`) is a **design reference created in HTML** — a prototype showing the intended look and behavior. It is **not** production code to copy directly (it uses a bespoke component runtime, `support.js`, that you should ignore). The task is to **recreate this design in a fresh Next.js codebase** using standard, production libraries and patterns described below. Treat the HTML as the source of truth for layout, copy, type, color, and interaction intent.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate the UI faithfully. The only placeholders are imagery (striped blocks with mono captions) — those mark where real photos/reels go.

## Recommended Stack & Libraries
- **Next.js (App Router)** + TypeScript. Single route `/` to start; leave room for `/work/[slug]` case-study pages later.
- **Styling:** Tailwind CSS or CSS Modules — either is fine. Values below are exact.
- **Smooth scroll:** [Lenis](https://github.com/darkroomengineering/lenis) instead of the prototype's hand-rolled rAF transform. Wrap the app once.
- **Scroll animations:** GSAP + ScrollTrigger for the word-fill manifesto, the "close the gap" scale/translate, and section reveals. (The prototype does these with manual `getBoundingClientRect` math — GSAP is more robust.)
- **Images:** `next/image` for case-study photos and the hero visual.
- **Fonts:** `next/font/google` — Space Grotesk (400/500/600/700), Instrument Serif (400 + italic), JetBrains Mono (400/500).
- **Do NOT** use the prototype's `#smooth` fixed-transform wrapper — Lenis handles scrolling on the real document, which avoids the position/IntersectionObserver quirks noted in the prototype.

## Design Tokens

### Colors
| Token | Hex / value | Use |
|---|---|---|
| `--bg` | `#0d0c0a` | page background (warm near-black) |
| `--fg` | `#f4f1ea` | primary text (warm white) |
| `--accent` | `#c9a86a` | gold accent (links hover, marks, metrics, ®) |
| `--ink` | `#16150f` | text on light sections |
| `--cream` | `#ece9e2` | light "success stories" section bg |
| `--cream-ph` | `#dcd8ce` | light placeholder fill |
| fg muted | `rgba(244,241,234,.6)` | body/secondary text on dark |
| fg dim | `rgba(244,241,234,.24)` | unfilled manifesto words |
| hairline | `rgba(244,241,234,.1)` – `.14` | section borders |
| selection | bg `#c9a86a`, text `#0d0c0a` | ::selection |

### Typography
- **Display / headings / body:** Space Grotesk. Weights 500–700. Tight tracking on big type: `letter-spacing: -0.02em` to `-0.03em`.
- **Editorial accent (italic phrases like "change-making", "that moves"):** Instrument Serif, italic, 400, colored `--accent`.
- **Labels / meta / counters / nav-logo:** JetBrains Mono, uppercase, `letter-spacing: .1em–.2em`, 11–13px.
- **Type scale (clamp):**
  - Hero statement: `clamp(22px, 2.7vw, 42px)`, weight 500, `max-width: 19ch`, centered.
  - Giant hero wordmark ("TROY BELLO"): `font-size: 26vw`, weight 700, `line-height: .7`, `letter-spacing: -.04em`, color `rgba(210,206,196,.9)`, `mix-blend-mode: soft-light`, `white-space: nowrap`, bleeds off bottom (`bottom: -2.4vw`, centered via `left:50%; translateX(-50%)`).
  - Stats numbers: `clamp(44px,5vw,76px)` weight 600.
  - Manifesto (word-fill): `clamp(26px,3.6vw,58px)` weight 500, `max-width: 22ch`.
  - "WE CLOSE" / "THAT GAP": `clamp(44px,9.5vw,168px)` weight 700.
  - "All success stories" title: `clamp(40px,7vw,116px)` weight 600, `line-height:.88`.
  - Stacked service rows: `clamp(30px,4.6vw,72px)` weight 600.
  - Process step titles: `clamp(26px,2.8vw,40px)` weight 600.
  - Contact CTA: `clamp(44px,9vw,150px)` weight 600, `line-height:.98`.

### Spacing / radius
- Section horizontal padding: `40px`. Vertical: `90–140px` (hero `100vh`; manifesto `26vh` top/bottom).
- Border radius: buttons/nav CTA `6px`; pills `100px`; cards/images `2–4px`; cursor dot circle.
- Hairline dividers: `1px solid rgba(244,241,234,.1)` between sections; `.12–.14` inside lists.

### Grain texture
Inline SVG feTurbulence as a `::after` overlay on the hero:
`baseFrequency 0.85, numOctaves 2, fractalNoise`, `opacity: .10`, `mix-blend-mode: overlay`, `pointer-events:none`, covers `inset:0`. Re-implement as a small tiling PNG or the same inline SVG data-URI.

## Screens / Views (single page, top to bottom)

### 0. Preloader
- Full-screen `#0d0c0a` overlay, `z-index:9999`.
- Bottom row: left mono label "Troy Bello® — loading"; right a giant counter `clamp(80px,18vw,240px)` counting **0→100** (ease-out increment: `n += max(1, round((100-n)/9))` every ~90ms).
- On reaching 100, wait ~380ms then slide up (`transform: translateY(-100%)`, `transition: 1s cubic-bezier(.76,0,.24,1)`). On completion, trigger the hero reveal.

### 1. Nav (fixed)
- Fixed top, full width, `padding: 22px 40px`, `mix-blend-mode: difference` (so it inverts over light/dark), `z-index:50`.
- **Left:** logo `Troy Bello®` — JetBrains Mono, 14px, uppercase, `.1em`, the `®` in `--accent`.
- **Center (absolute, `left:50%; translateX(-50%)`):** links `About · Work · Services · Process`, Space Grotesk 16px/500, gap 30px, `color:#fff`, hover → `--accent`.
- **Right:** `Start a project ↗` — bordered box `1px solid rgba(255,255,255,.5)`, `padding:9px 16px`, `radius:6px`, 15px/500. Links to contact.

### 2. Hero (`min-height:100vh`, centered)
- `display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;` grain overlay + radial vignette (`radial-gradient(120% 90% at 50% 25%, rgba(13,12,10,.15), .55 @55%, .95 @100%)`).
- Full-bleed background image behind everything (currently a striped placeholder → real hero photo, desaturated/dark).
- Top-right mono caption `[ Key visual — hero reel / signature project ]`.
- Centered content (max-width 920px): mono kicker "Freelance web design & development" (`--accent`), a `✦` mark (`--accent`, 28px), the hero statement (see type scale; "change-making" is Instrument Serif italic accent), then a mono "Scroll to explore ↓".
- Giant "TROY BELLO" wordmark bleeding off the bottom (see wordmark spec).
- **Reveal:** hero statement fades/rises in when the preloader finishes (opacity 0→1, `translateY(34px)→0`, `1s cubic-bezier(.16,1,.3,1)`). Make this reveal fire on preloader-done AND a mount fallback so it can never get stuck hidden.

### 3. Stats
- Auto-fit grid `minmax(220px,1fr)`, gap 48px, top hairline. Three items:
  - `40+` — "Projects shipped for founders and creative teams worldwide"
  - `6yr` — "Freelancing across design, front-end, and full delivery"
  - `100%` — "Founder-led — you work directly with me, start to finish"
- Number large (see scale); label JetBrains Mono 12px muted, `max-width:34ch`.

### 4. Marquee (words)
- Full-bleed, top+bottom hairline, `overflow:hidden`. Two duplicated tracks translate `-50%` on loop (`26s linear infinite`).
- Words in Instrument Serif italic `clamp(34px,4vw,58px)`, separated by `✦` in `--accent`. Words: Design ✦ Build ✦ Ship ✦ Obsess ✦ Refine ✦ Launch.

### 5. Manifesto — scroll word-fill (`id=gap`)
- Padding `26vh 40px`. Mono kicker "(The gap)".
- Paragraph split into **word spans**; each starts dim `rgba(244,241,234,.24)`.
- As the section scrolls through, words fill to full white **left-to-right**, one boundary word interpolated. In the prototype: `prog = clamp((winH*0.82 - rect.top) / (rect.height*0.62), 0, 1)`, `lit = prog * wordCount`; words `< floor(lit)` → alpha 1, the `floor` word → `0.24 + 0.76*frac`, rest → 0.24. **In production use GSAP ScrollTrigger** scrubbing over the section, staggering each word's color.
- Text: "Most people I work with have built something significant — but their website doesn't show it yet. That gap costs more than revenue. It costs the certainty that your brand is finally being understood."

### 6. Client logos marquee
- Mono label "Brands I've helped". Reverse-direction marquee (`30s`). Names as large dim wordmarks `clamp(28px,3vw,44px)` weight 600, `rgba(244,241,234,.4)`: Align, RightFuture, Metalab (duplicated). Replace with real SVG logos when available.

### 7. Close the gap — scroll-grow (`id=closegap`)
- Tall section `height:180vh`; inner is `position:sticky; top:0; height:100vh` centered.
- Row: `WE CLOSE` · [center image] · `THAT GAP` (huge, weight 700). Center image starts small (`min(22vw,300px)`, aspect 3/4) and **scales up** while the two words **slide inward** as you scroll.
- Prototype math: `p = clamp((winH - rect.top) / (rect.height*0.72), 0, 1)`; image `scale(0.5 + p*1.35)`; left word `translateX(-(1-p)*7vw)`; right word `translateX((1-p)*7vw)`. **Production: GSAP ScrollTrigger scrub** pinning the sticky inner.
- Supporting line below (muted, `max-width:42ch`): "Your website is where ideal clients decide if you're worth their time. I take what makes you irreplaceable, shape the entire experience around it, and make sure they feel it before they read another word."

### 8. Success stories — LIGHT section (`id=work`)
- Background `#ece9e2`, text `#16150f`. Padding `100px 40px 110px`.
- Header: big "All success stories" title left; live count `(NN)` right (zero-padded count of filtered projects).
- Two-column body: `230px` filter sidebar + project grid (`auto-fill minmax(280px,1fr)`, gap 30px).
- **Filter sidebar:** mono label "● Filter by service". Chips (buttons): All Projects, Web Design, Development, Website Strategy, Design Systems. Default chip bg `rgba(20,21,15,.06)`, text `--ink`; hover `.12`; **active** bg `--ink`, text `--cream`. Clicking filters the grid; count updates.
- **Project card:** light striped placeholder image (aspect 4/5) with mono `[ {name} — case study ]`; on card hover the image `scale(1.03)`. Title 22px/600; desc 15px muted; tag chips (mono 11px, bg `rgba(20,21,15,.06)`).
- Projects (name / desc / services):
  - **Align** — "Brand refresh and website for a team building calm, focused software for modern operators." — [Web Design, Website Strategy]
  - **RightFuture** — "Website and design system for a climate-forward venture studio backing the next wave of founders." — [Web Design, Development, Design Systems]
  - **Metalab** — "End-to-end site and interaction design for a product studio shipping category-defining work." — [Web Design, Development]
- Filter logic: show project if filter is "All Projects" OR `project.services.includes(filter)`.

### 9. Testimonials
- Mono kicker "(Real client stories)". Auto-fit grid `minmax(300px,1fr)`, gap 48px. Each: quote `clamp(18px,1.5vw,22px)` weight 500, then a round avatar placeholder + name (15/600) + role (mono 11px muted). Content is placeholder client quotes — replace with real ones.

### 10. Services — stacked hover list (`id=services`)
- Mono kicker "● What I can help with". Two columns: `1.5fr` list + `.7fr` sticky preview (`top:120px`).
- **Rows:** `01`–`06` + title, each `clamp(30px,4.6vw,72px)`/600, top hairline. Default color `rgba(244,241,234,.26)`; the **hovered/active** row → full `--fg` (transition `.45s cubic-bezier(.16,1,.3,1)`). Hover sets active index.
- **Preview panel:** striped placeholder (aspect 3/4) with a shimmer sweep + mono `[ {activeTitle} ]`, plus the active service's description below. Updates to whichever row is active.
- Services (n / title / desc):
  1. Web Design — "Interface and interaction design that signals credibility and gives people one clear reason to lean in."
  2. Development — "Fast, accessible, hand-built front-ends — pixel-faithful, performant, and easy to maintain."
  3. Website Strategy — "Positioning and structure that connects in seconds and turns attention into action."
  4. Design Systems — "Scalable component libraries so your brand stays consistent as it grows."
  5. Shipping & Launch — "From staging to production — I handle deployment, QA, and a smooth go-live."
  6. Care & Support — "Post-launch support, docs, and training so your team can run the site with confidence."

### 11. Process (`id=process`)
- Header: "The process" + mono "Three steps, no surprises". Three rows, grid `120px 1.2fr 1fr`, top hairline, gap 40px.
  - STEP 01 — "We discover your story" — "I dig into your brand, surface what makes you irreplaceable, and shape it into sharp positioning and a strategy that connects in seconds."
  - STEP 02 — "We design the experience" — "With the narrative locked, I design and build a site that feels premium, signals credibility, and gives your audience a reason to act."
  - STEP 03 — "We ship it into the world" — "Your site goes live as a long-term asset — turning attention into opportunity and growing with you."
- Right cell: media placeholder with mono `See step 0N in action ↗`.

### 12. About (`id=about`)
- Two columns, gap 70px. Left: portrait placeholder (aspect 4/5) `[ Portrait — Troy Bello ]`. Right: mono "About" kicker; lead paragraph `clamp(19px,1.7vw,26px)`/500; body paragraph muted; a meta row (EST 2022 / BASED Working worldwide / FOCUS Design · Build · Ship).
- Copy (lead): "Hey, I'm Troy. I freelance because I watched too many great people stay invisible — their presence never catching up to who they'd become." (body): "That gap became an obsession. I've spent years breaking down what separates a forgettable website from work that actually moves people — and I bring that to every project I take on. When I work with you, I'm immersed in your story, ruthless about what matters, and built to close the gap between who you are and how the world sees you."

### 13. FAQ (accordion)
- Mono kicker "● FAQs"; heading "Here's what to consider before we work together." (`clamp(26px,3vw,44px)`).
- Accordion rows (top hairline, `max-width:900px`): question `clamp(18px,1.6vw,23px)`/500 + a `+` in `--accent` that rotates 45° when open; answer expands via `max-height` + opacity (`.5s cubic-bezier(.16,1,.3,1)`). One open at a time; first open by default.
- Q/A pairs:
  - "Who actually works on my project?" — "Me, end to end — strategy, design, and development. You get one point of contact and consistent craft, whatever the scope. For larger builds I bring in a small, hand-picked set of collaborators."
  - "How long do projects usually take?" — "Most run 6–12 weeks end to end. Timelines flex with scope, but we set milestones from day one so there are no surprises."
  - "How do we communicate?" — "Simple and transparent. A shared workspace for timelines and deliverables, async Loom updates, and a weekly check-in over Slack or email. Calls are scheduled for the decisions that matter."
  - "What do you need to start?" — "We talk through your goals on a discovery call, I send a tailored proposal, and once the contract's signed and the deposit's in, we start. I keep onboarding fast so we can get to work."
  - "What happens after launch?" — "You get 30 days of hands-on support plus documentation and short training videos, so your team can update the site with ease. Ongoing care plans are available if you want them."
  - "What's the investment?" — "Projects start around $8k, with most landing between $12k and $30k depending on scope and complexity. You'll always get a fixed, tailored quote before we begin."

### 14. Contact CTA (`id=contact`)
- Padding `140px 40px 120px`. Mono kicker "Ready to start?". Huge headline (3 lines): "Let's build / an experience / *that moves* people" — "that moves" Instrument Serif italic `--accent`. Lines rise in with a masked line-reveal (overflow-hidden mask, inner `translateY(110%)→0`, staggered `.05/.14/.23s`).
- Button "Tell me your story →" — solid `--fg` bg, `--ink` text, pill radius, **magnetic** (follows cursor within ~160px), hover bg `--accent`. Links to `mailto:troybello25@gmail.com`.

### 15. Footer
- Grid `2fr 1fr 1fr`. Left: "Troy Bello®" big + Instrument Serif italic tagline "Refuse to be underestimated." Middle: Navigation links (Work/Services/Process/About). Right: "Get in touch" — email `troybello25@gmail.com`, LinkedIn `https://www.linkedin.com/in/troybello/`, GitHub `https://github.com/troybllo`.
- Bottom bar (mono, muted): "Booking projects for Q3 '2026" · "Back to top ↑" · "© 2026 Troy Bello".

## Global Interactions & Behavior
- **Custom cursor** (pointer:fine only): 9px accent dot following the mouse (`mix-blend-mode:difference`); grows to 56px translucent over `a, button, [data-cursor], .story`. `body { cursor:none }` on fine pointers; disable on touch.
- **Magnetic button:** contact CTA translates toward cursor when within ~160px (`dx*0.28, dy*0.34`), springs back otherwise.
- **Section counter** (fixed bottom-left, mono, `mix-blend-mode:difference`): `NN / TT` current section / total, updated via IntersectionObserver (threshold 0.5). Zero-padded.
- **Audio toggle** (fixed bottom-right pill): "Sound off/on", default OFF. When on, a short WebAudio sine "tick" (880Hz/35ms) on hovering interactive elements and a lower tick (560Hz) on click. Never autoplay; create/resume AudioContext on first interaction.
- **Smooth scroll:** Lenis on the whole page. All the scroll-scrub effects (5, 7, reveals) hang off ScrollTrigger synced to Lenis.
- **Reveals:** sections fade + rise (`opacity 0→1`, `translateY(34px)→0`, `1s cubic-bezier(.16,1,.3,1)`) as they enter the viewport (ScrollTrigger batch or `once:true`).
- **Reduced motion:** respect `prefers-reduced-motion` — skip preloader count animation length, disable lerp/scrub, show everything statically.

## State Management
- `openFaq: number` (which FAQ row is expanded; -1 = none).
- `workFilter: string` (active service filter for the work grid).
- `activeService: number` (hovered service row index driving the preview panel).
- `muted: boolean` (audio toggle).
- `sectionIndex` / `sectionTotal` (counter).
- Preloader progress is local/animation state.
All local component state — no data fetching needed for v1. If a CMS is added later, projects/testimonials/FAQ become fetched collections.

## Assets
- **Fonts:** Google Fonts — Space Grotesk, Instrument Serif, JetBrains Mono (via `next/font`).
- **Imagery:** none included — every image is a placeholder in the prototype. Needed: hero background reel/photo, one "signature project" image for the close-the-gap section, 3 case-study images (Align, RightFuture, Metalab), 3 testimonial avatars, a Troy portrait, 3 process step visuals, and client logo SVGs. Ask the client for these; use `next/image`.
- **Grain:** inline SVG feTurbulence (spec above) or a small tiling noise PNG.
- **Icons:** simple glyphs only (✦, ↗, ↓, ⮡, +) — no icon library required.

## Files
- `Troy Bello.dc.html` — the full design reference (all sections + interactions). Open it in a browser to see intended behavior. Ignore `support.js` and the `<x-dc>` / `data-dc-script` wrapper — those are the prototype runtime, not part of the design. The `<style>` block, inline styles, the logic class's `renderVals()` data arrays, and the scroll/cursor/audio methods are the useful references.
