import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StoryFrame } from "@/components/StoryFrame";
import { pad2 } from "@/lib/motion";
import { FEATURED_PROJECTS as stories, PROJECTS } from "@/lib/projects";

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
              <StoryFrame
                name={story.name}
                href={story.href}
                still={story.still}
                video={story.video}
                poster={story.poster}
                insetAspect={story.insetAspect}
              />
              <div className="lg:pt-4">
                <div className="flex items-center gap-2 font-mono text-mono-xs uppercase text-fg-muted">
                  SS <span aria-hidden>⟵</span>
                  <span className="rounded-xs border border-hairline-mid px-1.5 py-0.5">
                    {pad2(i + 1)}/{pad2(stories.length)}
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

          <Link
            href="/work"
            className="group flex items-center justify-between gap-8 pt-10"
          >
            <span className="text-h2 text-fg-muted">
              {pad2(PROJECTS.length)}
            </span>
            <span className="flex-1 text-h2">View All Stories</span>
            <span
              aria-hidden
              className="text-h2 transition-transform duration-(--dur-normal) ease-(--ease-out-expo) group-hover:translate-x-2"
            >
              (→)
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
