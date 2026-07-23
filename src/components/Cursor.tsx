"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

// A dot that trails the mouse and grows over interactive elements.
// Fine pointers only; disabled on touch and under reduced motion.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    const reduced = prefersReducedMotion();
    if (!fine || reduced) return;
    const raf = requestAnimationFrame(() => setEnabled(true));

    const onMove = (e: PointerEvent) => {
      const dot = dotRef.current;
      if (dot)
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e: PointerEvent) => {
      setBig(!!(e.target as Element)?.closest?.("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, []);

  // Hide the native cursor only once the dot is actually on screen, and give it
  // back on teardown — otherwise a throw between the two leaves a page with no
  // cursor at all.
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.style.cursor = "none";
    return () => {
      root.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9997] mix-blend-difference"
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full bg-greige-100 transition-[width,height] duration-(--dur-fast)",
          big ? "size-14 opacity-30" : "size-2.5 opacity-100",
        )}
      />
    </div>
  );
}
