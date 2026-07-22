"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type LineRevealProps = {
  as?: React.ElementType;
  lines: React.ReactNode[];
  /** Delay of the first line in seconds; each following line adds `stagger`. */
  baseDelay?: number;
  stagger?: number;
  className?: string;
};

/** Masked line reveal: each line rises from translateY(110%) with a stagger. */
export function LineReveal({
  as: Tag = "h2",
  lines,
  baseDelay = 0.05,
  stagger = 0.09,
  className,
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
