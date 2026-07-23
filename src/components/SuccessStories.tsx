import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StoryFrame } from "@/components/StoryFrame";
import { pad2 } from "@/lib/motion";

// Each story pairs a backdrop `still` with the site itself, supplied either as
// `video` (a looping reel) or `frames` (cross-faded screens) — swap one for the
// other with no code change. Assets live in /public/media/work/<slug>/; the
// reels there are web-encoded from the 4K source recordings in /public/media.
// `insetAspect` matches each recording so object-cover never crops it.
// `metric` describes the scope of the work, not a performance claim. It replaced
// three invented figures (58% / $2M+ / 3.1x). If real, verifiable results come
// in, they belong here — otherwise leave these as scope descriptors.
const stories = [
  {
    name: "Align",
    href: "https://www.alignyourstars.com",
    desc: "Brand refresh and website for a team building calm, focused software for modern operators.",
    metric: "Design + Build",
    metricLabel: "Brand refresh and full site, designed and developed end to end",
    still: "/media/work-align.jpg",
    video: "/media/work/align/reel.mp4",
    poster: "/media/work/align/poster.jpg",
    insetAspect: "1600/834",
  },
  {
    name: "RightFuture",
    href: "https://r-ight-future.vercel.app/",
    desc: "Website and design system for a climate-forward venture studio backing the next wave of founders.",
    metric: "Design System",
    metricLabel: "Website plus a reusable component system built to grow with them",
    still: "/media/work-rightfuture.jpg",
    video: "/media/work/rightfuture/reel.mp4",
    poster: "/media/work/rightfuture/poster.jpg",
    insetAspect: "1600/842",
  },
  {
    name: "Metalab",
    href: "https://metalab-five.vercel.app/",
    desc: "End-to-end site and interaction design for a product studio shipping category-defining work.",
    metric: "End to End",
    metricLabel: "Site and interaction design, from first strategy call through launch",
    still: "/media/work-metalab.jpg",
    video: "/media/work/metalab/reel.mp4",
    poster: "/media/work/metalab/poster.jpg",
    insetAspect: "16/9",
  },
];

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

          <div className="flex items-center justify-between gap-8 pt-10">
            <span className="text-h2 text-fg-muted">{pad2(stories.length)}</span>
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
