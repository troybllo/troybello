"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";
import { useTicker } from "@/lib/ticker";

type MediaCycleProps = {
  /** Frames to cycle through, in order. Ignored when `video` is set. */
  images: string[];
  /** Once set, a looping video replaces the frame cycler entirely. */
  video?: string;
  poster?: string;
  /** Milliseconds per frame. */
  interval?: number;
  alt?: string;
  /** CSS aspect-ratio, e.g. "3/4". */
  aspect?: string;
  radius?: "none" | "xs" | "sm";
  sizes?: string;
  /** Eager-load the first frame. Off by default — every cycler is below the fold. */
  priority?: boolean;
  className?: string;
};

// Cross-fades through a set of stills on a fixed beat — the moving-frame
// counterpart to <Media>. Kept separate so Media stays server-renderable.
// The interval only runs while the frame is on-screen, the tab is visible,
// and the user hasn't asked for reduced motion.
export function MediaCycle({
  images,
  video,
  poster,
  interval = 1000,
  alt = "",
  aspect = "4/5",
  radius = "sm",
  sizes,
  priority = false,
  className,
}: MediaCycleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useTicker(wrapRef, () => setIndex((i) => (i + 1) % images.length), {
    interval,
    enabled: !video && images.length > 1,
  });

  // The image path pauses off-screen via useTicker; give the video path the
  // same contract so an off-screen reel isn't decoding frames.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Reduced motion keeps the poster frame rather than a looping reel.
    if (prefersReducedMotion()) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative overflow-hidden",
        radius === "xs" && "rounded-xs",
        radius === "sm" && "rounded-sm",
        className,
      )}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            aria-hidden={i !== 0 || undefined}
            fill
            sizes={sizes}
            priority={priority && i === 0}
            className={cn(
              "object-cover transition-opacity duration-(--dur-fast) ease-(--ease-out-expo)",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))
      )}
    </div>
  );
}
