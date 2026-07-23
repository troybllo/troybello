"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/hooks/useHydrated";
import { prefersReducedMotion } from "@/lib/motion";

type CursorCueProps = {
  label: React.ReactNode;
  /** "sm" is the footer chip; "lg" is the case-study call to action. */
  size?: "sm" | "lg";
  /**
   * Where the chip sits when the pointer is away — parked bottom-centre inside
   * the parent, or absent until the parent is hovered.
   */
  rest?: "center" | "none";
};

const CHIP =
  "pointer-events-none block rounded-xs bg-greige-100 font-medium whitespace-nowrap text-black-950";
const SIZES = {
  sm: "px-2.5 py-1 text-[13px]",
  lg: "rounded-sm px-4 py-2.5 text-[15px] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)]",
};

/**
 * A chip that trails the pointer while its parent is hovered. The parent must
 * be positioned; the cue reads it from its own marker span.
 *
 * The following chip is portalled to <body> and positioned `fixed` from raw
 * client coordinates. Both call sites are `overflow-hidden`, so a chip rendered
 * in place would be clipped near their edges — and going through the viewport
 * layer also means no getBoundingClientRect on the pointermove path.
 *
 * Fine pointers only, and it stays parked under reduced motion.
 */
export function CursorCue({ label, size = "sm", rest = "none" }: CursorCueProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const [follow, setFollow] = useState(false);
  const portalReady = useHydrated();

  useEffect(() => {
    const band = markerRef.current?.parentElement;
    if (!band) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const chip = chipRef.current;
      // Client coordinates map straight onto the fixed layer — no layout read.
      if (chip) chip.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
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

  const parked = rest === "center" && !follow;

  return (
    <>
      {/* Stays in the parent: the resting chip, or a zero-size positional marker. */}
      <span
        ref={markerRef}
        aria-hidden
        className={cn(
          "absolute z-10",
          parked
            ? cn("bottom-8 left-1/2 -translate-x-1/2", CHIP, SIZES[size])
            : "top-0 left-0 size-0",
        )}
      >
        {parked ? label : null}
      </span>

      {portalReady &&
        createPortal(
          <span
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[9996]"
            // Promote only while it is actually moving.
            style={follow ? { willChange: "transform" } : undefined}
            ref={chipRef}
          >
            <span className={cn("cursor-cue", CHIP, SIZES[size], follow && "in")}>
              {label}
            </span>
          </span>,
          document.body,
        )}
    </>
  );
}
