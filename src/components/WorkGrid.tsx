"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { Media } from "@/components/Media";
import { PROJECTS, SERVICE_TAGS, type ServiceTag } from "@/lib/projects";

const ALL = "All Projects";
type Filter = typeof ALL | ServiceTag;

// Only offer filters that actually match something — an empty result set reads
// as a broken page.
const usedTags = SERVICE_TAGS.filter((t) =>
  PROJECTS.some((p) => p.tags.includes(t)),
);

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const options: Filter[] = [ALL, ...usedTags];

  const shown = useMemo(
    () =>
      filter === ALL
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(180px,20%)_1fr] lg:gap-(--work-gutter)">
      <div>
        <div className="flex items-center gap-2.5 text-body font-medium text-fg-muted">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-current" />
          Filter by service
        </div>

        <div
          className="mt-7 flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:items-start"
          role="group"
          aria-label="Filter projects by service"
        >
          {options.map((tag) => {
            const on = filter === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={on}
                className={cn(
                  "cursor-pointer rounded-xs px-2.5 py-1.5 text-body-sm transition-colors duration-(--dur-fast)",
                  on
                    ? "bg-fg text-bg"
                    : "bg-chip text-fg-muted hover:bg-chip-hover hover:text-fg",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div
          className="grid grid-cols-1 gap-x-(--work-gutter) gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
          aria-live="polite"
        >
          {shown.map((p) => {
            const Tag = p.href ? "a" : "div";
            return (
              <Tag
                key={p.name}
                {...(p.href
                  ? { href: p.href, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group block"
              >
                <Media
                  src={p.card}
                  alt={p.card ? `${p.name} project` : ""}
                  aspect="4/5"
                  radius="xs"
                  sizes="(min-width: 1280px) 28vw, (min-width: 640px) 44vw, 100vw"
                  className="transition-opacity duration-(--dur-normal) group-hover:opacity-85"
                />
                <h2 className="mt-6 text-card-title">{p.name}</h2>
                <p className="mt-2.5 max-w-[36ch] text-body-sm text-fg-muted">
                  {p.desc}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-xs bg-chip px-2 py-1 text-mono-sm tracking-mono-sm text-fg-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Tag>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="text-body text-fg-muted">
            Nothing under that service yet.
          </p>
        )}
      </div>
    </div>
  );
}
