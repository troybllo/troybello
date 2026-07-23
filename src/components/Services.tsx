"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Kicker } from "@/components/Kicker";
import { Media } from "@/components/Media";
import { Section } from "@/components/Section";
import { SwitcherRail } from "@/components/SwitcherRail";
import { useAutoAdvance } from "@/lib/ticker";

const services = [
  {
    title: "Web Design",
    desc: "Interface and interaction design that signals credibility and gives people one clear reason to lean in.",
    image: "/media/svc-design.jpg",
  },
  {
    title: "Development",
    desc: "Fast, accessible, hand-built front-ends — pixel-faithful, performant, and easy to maintain.",
    image: "/media/svc-dev.jpg",
  },
  {
    title: "Website Strategy",
    desc: "Positioning and structure that connects in seconds and turns attention into action.",
    image: "/media/svc-strategy.jpg",
  },
  {
    title: "Design Systems",
    desc: "Scalable component libraries so your brand stays consistent as it grows.",
    image: "/media/svc-systems.jpg",
  },
  {
    title: "Shipping & Launch",
    desc: "From staging to production — I handle deployment, QA, and a smooth go-live.",
    image: "/media/svc-launch.jpg",
  },
  {
    title: "3D Development",
    desc: "Real-time 3D and WebGL scenes that make a product tangible before anyone has read a word.",
    image: "/media/svc-3d.jpg",
  },
];

// How I work. This replaced three invented client testimonials — if real
// client quotes arrive, swap them back in here with correct attribution.
const principles = [
  {
    quote:
      "You approve it, then it ships. No handoffs to someone who never spoke to you, and no surprises at launch.",
    name: "Troy Bello",
    role: "Toronto",
  },
  {
    quote:
      "I take on a small number of projects at a time. That is the whole reason the work stays sharp and the replies stay fast.",
    name: "Troy Bello",
    role: "Toronto",
  },
  {
    quote:
      "Strategy, design, and the actual code are one job, not three. Nothing gets lost being thrown over a wall.",
    name: "Troy Bello",
    role: "Toronto",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const [panelTop, setPanelTop] = useState(0);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const {
    ref: storyRef,
    index: story,
    step: stepStory,
    paused: storyPaused,
    pauseProps: storyPauseProps,
  } = useAutoAdvance(principles.length, 7000);

  // Preview panel tracks the active row's vertical center.
  useEffect(() => {
    const row = rowRefs.current[active];
    if (row) setPanelTop(row.offsetTop + row.offsetHeight / 2);
  }, [active]);

  return (
    <Section id="services" space="lg" hairline={false}>
      <div className="services-grid">
        <div ref={storyRef} className="max-w-[300px]" {...storyPauseProps}>
          <SwitcherRail
            index={story}
            count={principles.length}
            onStep={stepStory}
          />
          <div className="mt-8 font-mono text-mono-xs tracking-mono-md uppercase text-fg-faint">
            (How I work)
          </div>
          <div aria-live={storyPaused ? "polite" : "off"}>
            <p className="mt-5 text-body-lg font-medium">
              &ldquo;{principles[story].quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3.5">
              <Media
                src="/media/avatar-troy.jpg"
                alt=""
                aspect="1/1"
                radius="none"
                className="size-10 shrink-0 rounded-full"
                sizes="40px"
              />
              <div className="text-body-sm">
                <div className="font-medium text-fg-muted">
                  {principles[story].name}
                </div>
                <div className="text-fg-faint">{principles[story].role}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Kicker dot className="mb-9">
            What I can help with
          </Kicker>
          <ul>
            {services.map((s, i) => (
              <li key={s.title}>
                <button
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "block cursor-pointer py-0.5 text-left text-service transition-colors duration-[450ms] ease-(--ease-out-expo) wide:text-[length:var(--text-service-3col)]",
                    i === active ? "text-fg" : "text-fg-dim",
                  )}
                >
                  {s.title}
                </button>

                {/* Below lg the floating preview panel is hidden, so the row
                    carries its own image and copy — otherwise the section is a
                    bare list of titles on phones and tablets. */}
                {i === active && (
                  <div className="mt-4 mb-8 wide:hidden">
                    <div className="relative max-w-[280px]">
                      <Media
                        src={s.image}
                        alt={s.title}
                        aspect="3/4"
                        sizes="280px"
                      />
                      <div className="shimmer rounded-sm" aria-hidden />
                    </div>
                    <p className="mt-4 max-w-[38ch] text-body-sm text-fg-muted">
                      {s.desc}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>

        </div>

        {/* Its own grid track once the viewport can actually hold three
            columns. Narrower than that, the preview stacks under the active
            row — a floating panel there would sit on top of the type. */}
        <div className="relative hidden wide:block">
          <div
            className="pointer-events-none absolute inset-x-0 z-10 -translate-y-1/2 motion-safe:transition-[top] motion-safe:duration-(--dur-normal) motion-safe:ease-(--ease-out-expo)"
            style={{ top: panelTop }}
            aria-live="polite"
          >
            <div className="relative">
              <Media
                src={services[active].image}
                alt={services[active].title}
                aspect="3/4"
                sizes="(min-width: 1920px) 360px, 300px"
              />
              <div className="shimmer rounded-sm" aria-hidden />
            </div>
            <p className="mt-4 text-body-sm text-fg-muted">
              {services[active].desc}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
