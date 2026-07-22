import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/motion";

type SwitcherRailProps = {
  index: number;
  count: number;
  onStep: (dir: 1 | -1) => void;
  className?: string;
};

// Carousel chrome shared by the manifesto stats and services testimonials.
export function SwitcherRail({ index, count, onStep, className }: SwitcherRailProps) {
  return (
    <div className={cn("relative border-t border-hairline-mid", className)}>
      <span
        className="absolute -top-px left-0 h-px bg-fg transition-all duration-(--dur-normal)"
        style={{ width: `${((index + 1) / count) * 100}%` }}
        aria-hidden
      />
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[18px]">
          <button
            onClick={() => onStep(-1)}
            aria-label="Previous"
            className="cursor-pointer text-fg-muted transition-colors hover:text-fg"
          >
            ←
          </button>
          <button
            onClick={() => onStep(1)}
            aria-label="Next"
            className="cursor-pointer text-fg-muted transition-colors hover:text-fg"
          >
            →
          </button>
        </div>
        <div className="font-mono text-mono-sm text-fg-faint">
          {pad2(index + 1)}/{pad2(count)}
        </div>
      </div>
    </div>
  );
}
