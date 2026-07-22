"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LineReveal } from "@/components/LineReveal";
import { Media } from "@/components/Media";

export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const mover = section.querySelector("[data-move]");
    if (!mover) return;

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      mover,
      { x: 0 },
      {
        x: "14vw",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-(--space-inline) py-(--sect-lg)"
    >
      <div className="absolute inset-0" aria-hidden>
        <Media
          src="/media/contact-reel.jpg"
          radius="none"
          className="h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black-950/60" />
      </div>

      <div className="relative z-[1] w-full">
        <LineReveal
          as="h2"
          className="mx-auto w-fit text-display font-bold uppercase"
          lines={[
            <span key="l1">Let&apos;s build</span>,
            <span key="l2" className="block pl-[8vw]">
              An experience
            </span>,
            <span key="l3">That moves</span>,
            <span
              key="l4"
              data-move
              className="block pl-[10vw] will-change-transform"
            >
              <span aria-hidden>→ </span>People
            </span>,
          ]}
        />
        <div className="mt-16 text-center">
          <a
            href="mailto:troybello25@gmail.com"
            className="inline-flex items-center gap-4 rounded-xs bg-greige-100 px-6 py-3.5 text-[clamp(20px,2vw,30px)] font-semibold text-black-950 transition-colors hover:bg-greige-300"
          >
            Tell me your story
            <span
              aria-hidden
              className="rounded-xs bg-black-950 p-2 text-[0.65em] leading-none text-greige-100"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
