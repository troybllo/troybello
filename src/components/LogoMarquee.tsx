import { MarqueeTrack } from "@/components/MarqueeTrack";
import { Reveal } from "@/components/Reveal";

const brands = ["Align", "RightFuture", "Metalab", "Supersolid", "OH Studio"];

export function LogoMarquee() {
  return (
    <Reveal as="section" className="py-(--sect-sm)">
      <div className="mb-10 px-(--space-inline) font-mono text-mono tracking-mono-md uppercase text-fg-faint">
        Brands I&apos;ve helped
      </div>
      <MarqueeTrack duration={30} reverse gap={80}>
        {brands.map((b) => (
          <span
            key={b}
            className="text-logo-mark text-fg/40"
          >
            {b}
          </span>
        ))}
      </MarqueeTrack>
    </Reveal>
  );
}
