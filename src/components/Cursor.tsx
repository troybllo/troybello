"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Custom cursor (fine pointers only): a small accent dot that follows the
 * mouse and grows over interactive elements. Uses mix-blend-difference so
 * it reads on both light and dark. Never renders on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.style.cursor = "none";

    const onMove = (e: PointerEvent) => {
      const dot = dotRef.current;
      if (dot) dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
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
      document.documentElement.style.cursor = "";
    };
  }, []);

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
