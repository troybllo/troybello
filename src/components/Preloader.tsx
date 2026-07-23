"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SEEN_KEY = "preloader-seen";

// Counts to 100, then slides up and unmounts. Instant under reduced motion, and
// skipped outright once per session — a returning visitor should not sit
// through the count again on every navigation.
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");
    document.body.style.overflow = "hidden";
    const skip = prefersReducedMotion() || seen;

    if (skip) {
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
