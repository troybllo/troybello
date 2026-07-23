"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaCycle } from "@/components/MediaCycle";

export function CloseTheGap() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const img = imgRef.current;
    if (!section || !left || !right || !img) return;

    // The scrub-grow layout only exists on desktop; leave the stacked mobile
    // version static.
    const desktop = window.matchMedia("(min-width: 768px)");
    if (!desktop.matches || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    // Growth runs across the section's whole travel, so the frame is still
    // scaling up while the layout is pinned rather than topping out early.
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const shift = (1 - p) * 9;
        // Caps at 1.45 (≈435×580 on desktop). Anything larger swallows the
        // caption below and dwarfs the reference, whose frame holds near
        // 12% of viewport width.
        img.style.transform = `scale(${(0.35 + p * 1.1).toFixed(3)})`;
        left.style.transform = `translateX(${(-shift).toFixed(2)}vw)`;
        right.style.transform = `translateX(${shift.toFixed(2)}vw)`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="closegap"
      className="relative py-(--sect-lg) md:h-[180vh] md:py-0"
    >
      <div className="flex flex-col items-center justify-center gap-8 overflow-hidden md:sticky md:top-0 md:h-svh md:gap-0">
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-[2vw]">
          <span
            ref={leftRef}
            className="display-face text-display-xl whitespace-nowrap will-change-transform"
          >
            WE CLOSE
          </span>
          <div
            ref={imgRef}
            className="w-[60vw] shrink-0 will-change-transform md:w-[min(22vw,300px)]"
          >
            {/* Portrait 3:4 frames, 900×1200 each — overwrite in place to swap
                the reel. Pass video="…" instead to run a single looping clip. */}
            <MediaCycle
              images={[
                "/media/gap-1.jpg",
                "/media/gap-2.jpg",
                "/media/gap-3.jpg",
                "/media/gap-4.jpg",
                "/media/gap-5.jpg",
                "/media/gap-6.jpg",
              ]}
              alt="Selected work"
              aspect="3/4"
              radius="xs"
              sizes="(min-width: 768px) 300px, 60vw"
            />
          </div>
          <span
            ref={rightRef}
            className="display-face text-display-xl whitespace-nowrap will-change-transform"
          >
            THAT GAP
          </span>
        </div>
        <p className="mt-4 max-w-[46ch] px-(--space-inline) text-center text-[14px] leading-[1.55] text-fg-muted md:absolute md:bottom-[10vh] md:mt-0">
          Your website is where ideal clients decide if you&apos;re worth their
          time. I take what makes you irreplaceable, shape the entire
          experience around it, and make sure they feel it before they read
          another word.
        </p>
      </div>
    </section>
  );
}
