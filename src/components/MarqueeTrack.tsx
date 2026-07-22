import { cn } from "@/lib/cn";

type MarqueeTrackProps = {
  /** Loop duration in seconds. */
  duration?: number;
  reverse?: boolean;
  /** Gap between items (and between the two copies), in px. */
  gap?: number;
  className?: string;
  children: React.ReactNode;
};

/** Infinite marquee: renders children twice and translates -50% on loop. */
export function MarqueeTrack({
  duration = 26,
  reverse,
  gap = 56,
  className,
  children,
}: MarqueeTrackProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={cn("marquee-track", className)}
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex items-center" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div
          className="flex items-center"
          style={{ gap, paddingRight: gap }}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
