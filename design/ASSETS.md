# Image & video assets — where things go

Everything lives in `public/`. A file at `public/media/foo.jpg` is referenced in
code as `/media/foo.jpg` (no `public`). Filenames are already wired up, so **the
simplest path is to overwrite the existing file with the same name** — no code
change needed.

Two rules that matter more than anything else:

1. **Export at 2× the rendered size.** The "Export at" column below is already
   doubled — use it as-is. Anything smaller looks soft on a retina screen.
2. **Match the aspect ratio.** Frames use `object-cover`, so a wrong ratio gets
   cropped from the centre, not letterboxed.

After swapping any file, Next's optimizer caches the old one for 4 hours under
the same URL. See "Cache" at the bottom.

---

## 1. "We close that gap" — the scroll-grow frame

`src/components/CloseTheGap.tsx`

A single tall frame that cross-fades through 6 stills on a 1s beat while it
scales up on scroll. This is the most prominent imagery on the page.

| Slot | File | Aspect | Export at |
|---|---|---|---|
| 6 cycling frames | `public/media/closegap/01.jpg … 06.jpg` | **3:4 portrait** | **900 × 1200** |

The six files exist and are wired up. **Overwrite them in place** — same names,
no code change. They currently hold temporary stand-ins cropped from other
assets on the site; every one should be replaced.

Portrait only. This frame scales up as it crosses the viewport, so it is the
largest imagery on the page — use the strongest work.

**Or replace all six with one video** — the component already supports it:

```tsx
<MediaCycle video="/media/closegap/reel.mp4" poster="/media/closegap/poster.jpg" … />
```

Video spec: 3:4 portrait, 900×1200, muted, looping, ≤8s, ≤2MB. Encode with the
command at the bottom.

---

## 2. Services — Web Design / Development / Website Strategy / …

`src/components/Services.tsx`, the `services` array at the top.

Six images. Only one is visible at a time — it swaps as you hover each row.

| Row | File | Aspect | Export at |
|---|---|---|---|
| Web Design | `public/media/svc-design.jpg` | **3:4 portrait** | **720 × 960** |
| Development | `public/media/svc-dev.jpg` | 3:4 | 720 × 960 |
| Website Strategy | `public/media/svc-strategy.jpg` | 3:4 | 720 × 960 |
| Design Systems | `public/media/svc-systems.jpg` | 3:4 | 720 × 960 |
| Shipping & Launch | `public/media/svc-launch.jpg` | 3:4 | 720 × 960 |
| Care & Support | `public/media/svc-3d.jpg` | 3:4 | 720 × 960 |

Overwrite in place, keep the names, done.

Note: a shimmer sweep animates over this panel. It reads as intentional on
abstract or textural images and as a glitch on a literal photo of a person —
worth keeping in mind when picking.

---

## 3. Everything else currently on a placeholder

### Process section ("Project Journey")

`src/components/ProjectJourney.tsx`. Three landscape images, one per step.
**16:10, export 1600 × 1000.** Overwrite in place.

| Step | File | Suits |
|---|---|---|
| 01 · We discover your story | `public/media/journey/01.mp4` (+ `01-poster.jpg`) | research, notes, whiteboard, early sketching |
| 02 · We design the experience | `public/media/journey-2.gif` | design in progress — Figma, wireframes, type studies |
| 03 · We ship it into the world | `public/media/journey-3.png` | the launched result — live site, device shot |

Each step takes an image, a GIF, or a video — `Media` branches on the file
extension. Animated GIFs are served unoptimized so they keep animating; Next's
image optimizer would otherwise flatten them to one frame.

### The rest

| Where | File | Aspect | Export at |
|---|---|---|---|
| Contact CTA background | `public/media/contact-reel.jpg` | wide, full-bleed | **2400 × 1350** |
| FAQ portrait | `public/media/faq-troy.jpg` | **1:1 square** | **440 × 440** |
| About drawer portrait | `public/media/about-portrait.jpg` | **16:10** | **1280 × 800** |
| Success Stories backdrops ×3 | `public/media/work-align.jpg`, `-rightfuture`, `-metalab` | **3:2** | **1800 × 1200** |

The contact CTA sits under a 60% black scrim with text over it — pick something
dark and low-contrast, or it will fight the copy.

`work-metalab.jpg` is currently 735×456 (soft) and `work-rightfuture.jpg` is
4:3 in a 3:2 frame (crops ~11% top and bottom). Both worth re-exporting.

### Not yet wired

The two small circular avatars — the testimonial in Services and the one in
Manifesto — are striped placeholders with no image support in the code. They
need a small code change, not just a file. Ask when you have headshots.

---

## Video encoding

Any reel on the site should be web-encoded first. Source recordings are often
4K/60fps at 40+ Mbps, which is 20–50MB per file; this brings them to ~1MB with
no visible loss at render size:

```sh
ffmpeg -i source.mp4 -an -vf "scale=1600:-2,fps=30" \
  -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart out.mp4
```

**Pick the CRF for the content.** 26 is right for photographic footage. Screen
recordings — UI, text, sharp edges — smear badly at 26; use **20** for those.
Drop `scale=` entirely if the source is already at or below 1600px wide, since
upscaling in the encoder adds nothing but bitrate.

Then pull a poster frame so there's no black box while it loads:

```sh
ffmpeg -ss 0.5 -i out.mp4 -frames:v 1 -q:v 4 poster.jpg
```

Keep the 4K masters in **`assets-src/`** at the repo root. It is gitignored, so
they never reach git or Vercel — anything in `public/` ships to visitors whether
it is referenced or not, and these files were briefly committed before being
purged from history. Only web encodes belong under `public/media/`.

---

## Cache — read this when a swapped image doesn't change

Next caches optimized images at `.next/dev/cache/images` with a **4-hour TTL**,
keyed on the URL. Overwriting a file doesn't change its URL, so the old image
keeps being served. To force it:

```sh
rm -rf .next/dev/cache/images     # then restart the dev server
```

Then hard-reload the browser (**Cmd+Shift+R**) — it caches the same URL too.
