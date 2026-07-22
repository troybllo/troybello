import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "We discover your story",
    desc: "I dig into your brand, surface what makes you irreplaceable, and shape it into sharp positioning and a strategy that connects in seconds.",
    image: "/media/journey-1.jpg",
  },
  {
    n: "02",
    title: "We design the experience",
    desc: "With the narrative locked, I design and build a site that feels premium, signals credibility, and gives your audience a reason to act.",
    image: "/media/journey-2.jpg",
  },
  {
    n: "03",
    title: "We ship it into the world",
    desc: "Your site goes live as a long-term asset — turning attention into opportunity and growing with you.",
    image: "/media/journey-3.jpg",
  },
];

export function ProjectJourney() {
  return (
    <section id="process" className="pt-(--sect-lg)">
      <h2 className="px-(--space-inline) pb-12 text-[10vw] leading-[0.9] font-bold tracking-tightest uppercase whitespace-nowrap">
        Project Journey
      </h2>
      <div>
        {steps.map((step) => (
          <Reveal
            key={step.n}
            className="grid grid-cols-1 border-t border-hairline lg:min-h-[85vh] lg:grid-cols-2"
          >
            <div className="grid grid-cols-[90px_1fr] gap-6 px-(--space-inline) py-14">
              <div className="font-mono text-mono-xs tracking-mono uppercase text-fg-faint">
                Step • {step.n}
              </div>
              <div>
                <h3 className="max-w-[16ch] text-h5">{step.title}</h3>
                <p className="mt-6 max-w-[34ch] text-body-sm text-fg-muted">
                  {step.desc}
                </p>
              </div>
            </div>
            <Media
              src={step.image}
              alt={step.title}
              aspect="16/10"
              radius="none"
              className="h-full w-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
