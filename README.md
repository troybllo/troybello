# Troy Bello — Freelance Studio Site

A single-page, motion-heavy marketing site built with Next.js (App Router),
TypeScript, and Tailwind CSS v4. Design reference and copy live in `design/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Set the canonical URL for metadata, sitemap, and robots:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Structure

- `src/app` — route, layout, global tokens (`globals.css`), metadata, OG image
- `src/components` — sections and shared primitives
- `src/lib` — small helpers (Lenis handle, About-drawer event, `cn`)
- `public/media` — imagery

## Design tokens

Colors, type scale, spacing, radii, and motion are defined once in
`globals.css` (`:root` custom properties + Tailwind `@theme`). Sections use
those tokens only — no ad-hoc values in JSX.

## Replacing the imagery

Every image renders through `<Media>`, which accepts a `src` (image or video)
and falls back to a striped placeholder. The files in `public/media` are
temporary grayscale placeholders; drop in real assets at the same paths (or
update the `image` fields in the section data) with no code changes.

## Motion & accessibility

Lenis drives smooth scroll; GSAP ScrollTrigger drives the scroll-linked
effects; the hero and footer backgrounds are a raw-WebGL2 halftone shader.
All motion respects `prefers-reduced-motion`, and the custom cursor is
disabled on touch and fine-pointer-absent devices.
