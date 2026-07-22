"use client";

import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type LineRevealProps = {
  as?: React.ElementType;
  lines: React.ReactNode[];
  /** Delay of the first line in seconds; each following line adds `stagger`. */
  baseDelay?: number;
  stagger?: number;
  className?: string;
};

export function LineReveal({
  as: Tag = "h2",
  lines,
  baseDelay = 0.05,
  stagger = 0.09,
  className,
}: LineRevealProps) {
  const ref = useInViewOnce<HTMLElement>();

  return (
    <Tag ref={ref} className={cn("reveal-lines", className)}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span
            className="line-inner"
            style={{ transitionDelay: `${baseDelay + i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
