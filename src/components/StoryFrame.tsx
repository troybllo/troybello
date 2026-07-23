"use client";

import Image from "next/image";
import { CursorCue } from "@/components/CursorCue";
import { MediaCycle } from "@/components/MediaCycle";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type StoryFrameProps = {
  /** Atmospheric backdrop still. Dims once the pane enters view. */
  still: string;
  /** Website screens to cross-fade inside the inset. Ignored when `video` is set. */
  frames?: string[];
  /** Looping reel of the site — replaces the frame cycler for this story. */
  video?: string;
  poster?: string;
  /** Live site URL. Omit while the real link is unknown; the pane then renders inert. */
  href?: string;
  name: string;
  interval?: number;
  /** Inset aspect. Default 16/9 — set it to match the source so nothing crops. */
  insetAspect?: string;
};

// A Success Stories pane: a full-frame backdrop still with the client's actual
// website composited on top in a smaller inset. The dim + scale-in is driven by
// the `in` class from useInViewOnce; the states live in globals.css so this file
// stays free of motion magic numbers.
export function StoryFrame({
  still,
  frames,
  video,
  poster,
  href,
  name,
  interval = 2200,
  insetAspect = "16/9",
}: StoryFrameProps) {
  const ref = useInViewOnce<HTMLElement>();
  const hasInset = Boolean(video || frames?.length);
  const Tag = href ? "a" : "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLAnchorElement & HTMLDivElement>}
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      className="story-frame group relative block overflow-hidden rounded-xs"
      style={{ aspectRatio: "3/2" }}
    >
      <Image
        src={still}
        alt={hasInset ? "" : `${name} case study`}
        aria-hidden={hasInset || undefined}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="story-still object-cover"
      />

      {hasInset && (
        <div className="story-inset absolute inset-0 grid place-items-center">
          <div className="w-[78%] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]">
            <MediaCycle
              images={frames ?? []}
              video={video}
              poster={poster}
              interval={interval}
              alt={`${name} website`}
              aspect={insetAspect}
              radius="none"
              sizes="(min-width: 1024px) 46vw, 78vw"
            />
          </div>
        </div>
      )}

      {href && (
        <CursorCue
          size="lg"
          label={
            <>
              Visit {hostname(href)}{" "}
              <span className="cursor-cue-arrow">↗</span>
            </>
          }
        />
      )}
    </Tag>
  );
}

function hostname(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}
