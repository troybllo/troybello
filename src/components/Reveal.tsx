"use client";

import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type RevealProps = {
  as?: React.ElementType;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ as: Tag = "div", delay, className, children }: RevealProps) {
  const ref = useInViewOnce<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
