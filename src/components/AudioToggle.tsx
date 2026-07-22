"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sound toggle (Monolog): default off. When on, a short WebAudio "tick"
 * plays on hovering interactive elements (880Hz) and on click (560Hz).
 * AudioContext is created lazily on first interaction — never autoplays.
 */
export function AudioToggle() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(true);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const tick = (freq: number, dur: number) => {
      if (mutedRef.current) return;
      try {
        if (!ctxRef.current) {
          const AC =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          ctxRef.current = new AC();
        }
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch {
        /* no-op */
      }
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.("a, button, [data-cursor]")) tick(880, 0.035);
    };
    const onClick = () => tick(560, 0.05);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setMuted((m) => !m)}
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      className="flex size-9 items-center justify-center rounded-md border border-white/30 text-white transition-colors hover:bg-white/10"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />
        {muted ? (
          <path
            d="M16 9l5 5M21 9l-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M16 8.5a5 5 0 010 7M18.5 6a8 8 0 010 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
