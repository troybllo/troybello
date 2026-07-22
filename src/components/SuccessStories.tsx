import { Kicker } from "@/components/Kicker";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

const pad = (n: number) => String(n).padStart(2, "0");

const stories = [
  {
    name: "Align",
    desc: "Brand refresh and website for a team building calm, focused software for modern operators.",
    metric: "58%",
    metricLabel: "Increase in average session duration",
  },
  {
    name: "RightFuture",
    desc: "Website and design system for a climate-forward venture studio backing the next wave of founders.",
    metric: "$2M+",
    metricLabel: "In inbound enquiries within 3 months of launch",
  },
  {
    name: "Metalab",
    desc: "End-to-end site and interaction design for a product studio shipping category-defining work.",
    metric: "3.1x",
    metricLabel: "Lift in qualified inbound leads",
  },
];

/**
 * Success stories (Monolog layout): light section, sticky kicker left,
 * stacked project rows — landscape media + marker/name/desc/metric rail.
 */
export function SuccessStories() {
  return (
    <Section id="work" space="lg" hairline={false} className="theme-light bg-greige-100">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <div>
          <Kicker dot className="lg:sticky lg:top-28 text-fg-muted">
            Success Stories
          </Kicker>
        </div>

        <div>
          {stories.map((story, i) => (
            <Reveal
              key={story.name}
              className="grid grid-cols-1 items-start gap-10 border-b border-hairline py-16 first:pt-0 lg:grid-cols-[2.2fr_1fr] lg:gap-16"
            >
              <Media
                caption={`[ ${story.name} — case study ]`}
                aspect="3/2"
                radius="xs"
              />
              <div className="lg:pt-4">
                <div className="flex items-center gap-2 font-mono text-mono-xs uppercase text-fg-muted">
                  SS <span aria-hidden>⟵</span>
                  <span className="rounded-xs border border-hairline-mid px-1.5 py-0.5">
                    {pad(i + 1)}/{pad(stories.length)}
                  </span>
                </div>
                <h3 className="mt-5 text-h5">{story.name}</h3>
                <p className="mt-4 max-w-[38ch] text-body text-fg-muted">
                  {story.desc}
                </p>
                <div className="mt-14">
                  <span className="inline-block rounded-xs bg-greige-300 px-2.5 py-1 text-[19px] font-semibold">
                    {story.metric}
                  </span>
                  <p className="mt-4 max-w-[22ch] text-lead-sm font-medium">
                    {story.metricLabel}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* future /work archive link */}
          <div className="flex items-center justify-between gap-8 pt-10">
            <span className="text-h2 text-fg-muted">{pad(stories.length)}</span>
            <span className="flex-1 text-h2">View All Stories</span>
            <span aria-hidden className="text-h2">
              (→)
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
