"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Kicker } from "@/components/Kicker";
import { Media } from "@/components/Media";
import { Section } from "@/components/Section";

const faqs = [
  {
    q: "Who actually works on my project?",
    a: "Me, end to end — strategy, design, and development. One point of contact, consistent craft, and no handoffs between people who never spoke to you.",
  },
  {
    q: "How long do projects usually take?",
    a: "Most run 6–12 weeks end to end. Timelines flex with scope, but we set milestones from day one so there are no surprises.",
  },
  {
    q: "How do we communicate?",
    a: "Simple and transparent. A shared workspace for timelines and deliverables, async Loom updates, and a weekly check-in over Slack or email. Calls are scheduled for the decisions that matter.",
  },
  {
    q: "What do you need to start?",
    a: "We talk through your goals on a discovery call, I send a tailored proposal, and once the contract's signed and the deposit's in, we start. I keep onboarding fast so we can get to work.",
  },
  {
    q: "What happens after launch?",
    a: "You get 30 days of hands-on support plus documentation and short training videos, so your team can update the site with ease. Ongoing care plans are available if you want them.",
  },
  {
    q: "What's the investment?",
    a: "Every package and price is listed openly on my Fiverr profile — no discovery call required to find out what something costs. Larger or custom builds get a fixed, tailored quote before we begin.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" space="lg" hairline={false} className="bg-bg-raise">
      <div className="grid min-h-svh grid-cols-1 gap-16 lg:grid-cols-[300px_1fr]">
        <div className="flex flex-col justify-between gap-16">
          <Kicker dot>FAQs</Kicker>
          <div>
            <Media
              src="/media/faq-troy.jpg"
              alt="Troy Bello"
              aspect="1/1"
              className="w-[220px]"
              radius="xs"
              sizes="220px"
            />
            <p className="mt-5 max-w-[20ch] text-body-sm text-fg-muted">
              Got more questions? Chat with me.
            </p>
            <a
              href="mailto:troybello25@gmail.com"
              className="mt-4 inline-flex items-center gap-2.5 rounded-xs bg-greige-100 px-3.5 py-2 text-body-sm font-semibold text-black-950 transition-colors hover:bg-greige-300"
            >
              Book a call <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="max-w-[16ch] text-h1">
            Here&apos;s what to consider before we work together.
          </h2>
          <div className="mt-20">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-b border-hairline">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-6 py-[22px] text-left text-[clamp(18px,1.4vw,22px)] font-semibold transition-colors duration-(--dur-fast)",
                      isOpen
                        ? "bg-greige-100 px-4 text-black-950"
                        : "text-fg hover:text-fg-muted",
                    )}
                  >
                    {faq.q}
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-current"
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    className={cn(
                      "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-(--dur-normal) motion-safe:ease-(--ease-out-expo)",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pt-5 pb-8 text-body text-fg-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
