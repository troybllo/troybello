import { MarqueeTrack } from "@/components/MarqueeTrack";

const words = ["Design", "Build", "Ship", "Obsess", "Refine", "Launch"];

export function WordMarquee() {
  return (
    <section className="border-y border-hairline py-9">
      <MarqueeTrack duration={26} gap={56}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-14">
            <span className="text-marquee text-fg/85">{w}</span>
            <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
          </span>
        ))}
      </MarqueeTrack>
    </section>
  );
}
