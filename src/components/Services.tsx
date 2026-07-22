"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Kicker } from "@/components/Kicker";
import { Media } from "@/components/Media";
import { Section } from "@/components/Section";
import { SwitcherRail } from "@/components/SwitcherRail";

const services = [
  {
    title: "Web Design",
    desc: "Interface and interaction design that signals credibility and gives people one clear reason to lean in.",
  },
  {
    title: "Development",
    desc: "Fast, accessible, hand-built front-ends — pixel-faithful, performant, and easy to maintain.",
  },
  {
    title: "Website Strategy",
    desc: "Positioning and structure that connects in seconds and turns attention into action.",
  },
  {
    title: "Design Systems",
    desc: "Scalable component libraries so your brand stays consistent as it grows.",
  },
  {
    title: "Shipping & Launch",
    desc: "From staging to production — I handle deployment, QA, and a smooth go-live.",
  },
  {
    title: "Care & Support",
    desc: "Post-launch support, docs, and training so your team can run the site with confidence.",
  },
];

/* placeholder client stories until real ones exist (README §9) */
const testimonials = [
  {
    quote:
      "Within weeks of launching, we were fielding two or three qualified inquiries a week. The site finally does our work justice.",
    name: "Client, Align",
    role: "Founder",
  },
  {
    quote:
      "Troy cares about your vision like it's his own. Talented, humble, and relentless about finding the elegant solution.",
    name: "Client, RightFuture",
    role: "Creative Director",
  },
  {
    quote:
      "Lead management got dramatically easier after launch — the design is impressive and genuinely stands out.",
    name: "Client, Metalab",
    role: "Director",
  },
];

/**
 * Services (Monolog layout): testimonial rail left, giant stacked hover
 * list center, sticky preview panel right. The active row is full white,
 * the rest sit dim; the panel shows the active service's media + copy.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const [panelTop, setPanelTop] = useState(0);
  const [story, setStory] = useState(0);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stepStory = (dir: number) =>
    setStory((s) => (s + dir + testimonials.length) % testimonials.length);

  /* the preview panel vertically centers on the active row */
  useEffect(() => {
    const row = rowRefs.current[active];
    if (row) setPanelTop(row.offsetTop + row.offsetHeight / 2);
  }, [active]);

  return (
    <Section id="services" space="lg" hairline={false}>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(260px,340px)_1fr]">
        {/* testimonial rail — placeholder client stories */}
        <div className="max-w-[340px]">
          <SwitcherRail index={story} count={testimonials.length} onStep={stepStory} />
          <div className="mt-8 font-mono text-mono-xs tracking-mono-md uppercase text-fg-faint">
            (Real client stories)
          </div>
          <div aria-live="polite">
            <p className="mt-5 text-body-lg font-medium">
              &ldquo;{testimonials[story].quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3.5">
              <div className="ph size-10 shrink-0 rounded-full" aria-hidden />
              <div className="text-body-sm">
                <div className="font-medium text-fg-muted">
                  {testimonials[story].name}
                </div>
                <div className="text-fg-faint">{testimonials[story].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* stacked hover list + floating preview */}
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
                    "block cursor-pointer py-0.5 text-left text-service transition-colors duration-[450ms] ease-(--ease-out-expo)",
                    i === active ? "text-fg" : "text-fg-dim",
                  )}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>

          {/* floats beside the active row (desktop only) */}
          <div
            className="pointer-events-none absolute right-0 z-10 hidden w-[360px] -translate-y-1/2 motion-safe:transition-[top] motion-safe:duration-(--dur-normal) motion-safe:ease-(--ease-out-expo) lg:block"
            style={{ top: panelTop }}
            aria-live="polite"
          >
            <div className="relative">
              <Media caption={`[ ${services[active].title} ]`} aspect="3/4" />
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
