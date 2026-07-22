"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Full-screen preloader: counts 0→100, holds briefly, then slides up.
 * Under reduced motion it resolves instantly. Removed from the tree once
 * the slide-up transition ends so it never traps focus or pointer events.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const raf = requestAnimationFrame(() => {
        setCount(100);
        setDone(true);
        setGone(true);
      });
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }

    let n = 0;
    const interval = setInterval(() => {
      n += Math.max(1, Math.round((100 - n) / 9));
      if (n >= 100) {
        n = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 380);
      }
      setCount(n);
    }, 90);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      onTransitionEnd={() => setGone(true)}
      className={cn(
        "fixed inset-0 z-[9999] flex items-end justify-between bg-black-950 px-(--space-inline) py-10 transition-transform duration-(--dur-slower) ease-(--ease-inout)",
        done && "-translate-y-full",
      )}
    >
      <div className="font-mono text-mono-sm tracking-mono-md uppercase text-fg-muted">
        Troy Bello<span className="text-accent">®</span> — loading
      </div>
      <div className="text-[clamp(80px,18vw,240px)] leading-[0.8] font-semibold tracking-tighter">
        {count}
      </div>
    </div>
  );
}
