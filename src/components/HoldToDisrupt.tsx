"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Hold to disrupt" chip that follows the cursor inside the footer band
 * (its offset parent). Rests bottom-left until the pointer enters, then
 * trails the cursor. Hidden on touch / reduced motion (stays bottom-left).
 */
export function HoldToDisrupt() {
  const ref = useRef<HTMLSpanElement>(null);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const band = el?.parentElement;
    if (!el || !band) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = band.getBoundingClientRect();
      el.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    };
    const onEnter = () => setFollow(true);
    const onLeave = () => setFollow(false);
    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerenter", onEnter);
    band.addEventListener("pointerleave", onLeave);
    return () => {
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerenter", onEnter);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={
        follow
          ? "pointer-events-none absolute top-0 left-0 z-10 -mt-3 -ml-8 rounded-xs bg-greige-100 px-2.5 py-1 text-[13px] font-medium whitespace-nowrap text-black-950 will-change-transform"
          : "pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-xs bg-greige-100 px-2.5 py-1 text-[13px] font-medium whitespace-nowrap text-black-950"
      }
    >
      Hold to disrupt
    </span>
  );
}
