"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type TickerOptions = {
  interval?: number;
  /** Temporarily hold the timer (hover, focus) without tearing it down. */
  paused?: boolean;
  enabled?: boolean;
  /** Change to restart the current dwell — e.g. after a manual step. */
  resetKey?: number;
};

/**
 * Calls `onTick` every `interval` ms, but only while `target` is on-screen and
 * the tab is visible — an off-screen carousel shouldn't burn timers. Disabled
 * outright under prefers-reduced-motion.
 */
export function useTicker(
  target: RefObject<HTMLElement | null>,
  onTick: () => void,
  { interval = 1000, paused = false, enabled = true, resetKey = 0 }: TickerOptions = {},
) {
  // Hold the latest callback so a re-render doesn't restart the dwell.
  const cb = useRef(onTick);
  useEffect(() => {
    cb.current = onTick;
  });

  useEffect(() => {
    const el = target.current;
    if (!el || !enabled || paused || prefersReducedMotion()) return;

    let timer: number | undefined;
    let visible = false;

    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const sync = () => {
      const shouldRun = visible && !document.hidden;
      if (shouldRun && timer === undefined) {
        timer = window.setInterval(() => cb.current(), interval);
      } else if (!shouldRun) {
        stop();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [target, interval, paused, enabled, resetKey]);
}

/**
 * Self-advancing carousel index for the SwitcherRail pairs (manifesto stats,
 * client stories). Spread `pauseProps` on the container so hovering or tabbing
 * into the content holds it still — required for auto-updating content, and it
 * keeps the arrows useful.
 */
export function useAutoAdvance(count: number, interval = 5000) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [nonce, setNonce] = useState(0);

  const step = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + count) % count);
      // A manual pick earns a full dwell rather than the timer's remainder.
      setNonce((n) => n + 1);
    },
    [count],
  );

  useTicker(ref, () => setIndex((i) => (i + 1) % count), {
    interval,
    paused,
    resetKey: nonce,
  });

  const pauseProps = {
    onPointerEnter: () => setPaused(true),
    onPointerLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return { ref, index, step, paused, pauseProps };
}
