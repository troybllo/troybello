import { HalftoneCanvas } from "@/components/HalftoneCanvas";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-(--space-inline)"
    >
      <HalftoneCanvas
        className="absolute inset-0 z-0 size-full"
        fg="#9c968a"
        pixelSize={3}
        amplitude={1.53}
        timeSpeed={0.0065}
        gooeyness={0}
        contrast={0.9}
        bias={-0.25}
        invert={0}
        waveAmplitude={0.29}
        waveFrequency={3.9}
      />

      {/* radial vignette — bright smoke mid-frame, dark edges */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(115% 80% at 50% 38%, rgba(8,8,7,0) 0%, rgba(8,8,7,.35) 52%, rgba(8,8,7,.9) 100%)",
        }}
      />
      {/* Keeps the difference-blend nav legible over the bright smoke. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,7,.75) 0%, rgba(8,8,7,0) 100%)",
        }}
      />

      <div className="absolute top-24 right-(--space-inline) z-[2] text-right font-mono text-mono-sm tracking-mono-lg uppercase text-fg-faint">
        [ Key visual — hero reel / signature project ]
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-1.6vw] left-1/2 z-[1] -translate-x-1/2 text-[18vw] leading-[0.7] font-bold tracking-tightest whitespace-nowrap text-greige-300/90"
      >
        TROY BELLO
      </div>

      <div className="relative z-[2] flex max-w-[920px] flex-col items-center text-center">
        <p className="mb-[22px] font-mono text-mono tracking-mono-lg uppercase text-fg-muted">
          Freelance web design &amp; development
        </p>
        <div aria-hidden className="mb-[22px] text-[28px] text-accent">
          ✦
        </div>
        <Reveal as="h1" className="max-w-[34ch] text-lead">
          I build change-making websites that finally match what you&apos;ve
          actually built — for founders whose ambition has outgrown their
          presence.
        </Reveal>
        <a
          href="#work"
          className="mt-10 flex items-center gap-2.5 font-mono text-mono tracking-mono-md uppercase text-fg-muted hover:text-fg"
        >
          Scroll to explore <span aria-hidden>↓</span>
        </a>
      </div>
    </header>
  );
}
