import { cn } from "@/lib/cn";

type KickerProps = {
  /** Accent-colored label instead of the muted default. */
  accent?: boolean;
  /** Leading round dot, e.g. "● What I can help with". */
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Kicker({ accent, dot, className, children }: KickerProps) {
  return (
    <div
      className={cn(
        "font-mono text-mono tracking-mono-md uppercase",
        accent ? "text-accent" : "text-fg/50",
        dot && "flex items-center gap-2.5",
        className,
      )}
    >
      {dot && (
        <span className="inline-block size-2 shrink-0 rounded-full bg-accent" />
      )}
      {children}
    </div>
  );
}
