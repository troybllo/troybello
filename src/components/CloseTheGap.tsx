"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Media } from "@/components/Media";

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

    if (prefersReducedMotion()) {
      img.style.transform = "scale(1.85)";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: () => `+=${section.offsetHeight * 0.72}`,
      onUpdate: (self) => {
        const p = self.progress;
        const shift = (1 - p) * 7;
        img.style.transform = `scale(${(0.5 + p * 1.35).toFixed(3)})`;
        left.style.transform = `translateX(${(-shift).toFixed(2)}vw)`;
        right.style.transform = `translateX(${shift.toFixed(2)}vw)`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} id="closegap" className="relative h-[180vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <div className="flex w-full items-center justify-center gap-[2vw]">
          <span
            ref={leftRef}
            className="text-display-xl whitespace-nowrap will-change-transform"
          >
            WE CLOSE
          </span>
          <div ref={imgRef} className="w-[min(22vw,300px)] shrink-0 will-change-transform">
            <Media
              src="/media/closegap.jpg"
              alt="Signature project"
              aspect="3/4"
              radius="xs"
              sizes="300px"
            />
          </div>
          <span
            ref={rightRef}
            className="text-display-xl whitespace-nowrap will-change-transform"
          >
            THAT GAP
          </span>
        </div>
        <p className="absolute bottom-[10vh] max-w-[46ch] px-(--space-inline) text-center text-[14px] leading-[1.55] text-fg-muted">
          Your website is where ideal clients decide if you&apos;re worth their
          time. I take what makes you irreplaceable, shape the entire
          experience around it, and make sure they feel it before they read
          another word.
        </p>
      </div>
    </section>
  );
}
