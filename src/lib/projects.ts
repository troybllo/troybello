/**
 * Every client project, shared by the homepage Success Stories section and the
 * /work index so the two can never drift apart.
 *
 * `tags` drive the /work filter and must come from SERVICE_TAGS below —
 * anything else silently never matches a filter.
 *
 * TODO (Troy): confirm the tag mix on each project. These are a reasonable
 * reading of the scope descriptions, not something you told me.
 */

export const SERVICE_TAGS = [
  "Web Design",
  "Development",
  "Website Strategy",
  "Design Systems",
  "Shipping & Launch",
  "3D Development",
] as const;

export type ServiceTag = (typeof SERVICE_TAGS)[number];

export type Project = {
  name: string;
  /** Live site. Omit to render the card inert. */
  href?: string;
  desc: string;
  tags: ServiceTag[];
  /** Card image on /work. Omit for the striped placeholder. */
  card?: string;
  /** Backdrop still behind the inset reel on the homepage. */
  still?: string;
  video?: string;
  poster?: string;
  /** Matches the reel's own ratio so object-cover never crops it. */
  insetAspect?: string;
  /** Scope of the work — deliberately not a performance claim. */
  metric?: string;
  metricLabel?: string;
  /** Featured on the homepage Success Stories section. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "LeadPing",
    desc: "Lead capture and outreach tooling, designed and built end to end.",
    tags: ["Web Design", "Development", "Website Strategy"],
    // TODO: add /media/work-leadping.jpg and a live URL — the card renders the
    // striped placeholder until then.
  },
  {
    name: "Align",
    href: "https://www.alignyourstars.com",
    desc: "Brand refresh and website for a team building calm, focused software for modern operators.",
    tags: ["Web Design", "Development", "Website Strategy"],
    card: "/media/work-align.jpg",
    still: "/media/work-align.jpg",
    video: "/media/work/align/reel.mp4",
    poster: "/media/work/align/poster.jpg",
    insetAspect: "1600/834",
    metric: "Design + Build",
    metricLabel: "Brand refresh and full site, designed and developed end to end",
    featured: true,
  },
  {
    name: "RightFuture",
    href: "https://r-ight-future.vercel.app/",
    desc: "Website and design system for a climate-forward venture studio backing the next wave of founders.",
    tags: ["Web Design", "Development", "Design Systems"],
    card: "/media/work-rightfuture.jpg",
    still: "/media/work-rightfuture.jpg",
    video: "/media/work/rightfuture/reel.mp4",
    poster: "/media/work/rightfuture/poster.jpg",
    insetAspect: "1600/842",
    metric: "Design System",
    metricLabel: "Website plus a reusable component system built to grow with them",
    featured: true,
  },
  {
    name: "Metalab",
    href: "https://metalab-five.vercel.app/",
    desc: "End-to-end site and interaction design for a product studio shipping category-defining work.",
    tags: ["Web Design", "Development", "Website Strategy", "Shipping & Launch"],
    card: "/media/work-metalab.jpg",
    still: "/media/work-metalab.jpg",
    video: "/media/work/metalab/reel.mp4",
    poster: "/media/work/metalab/poster.jpg",
    insetAspect: "16/9",
    metric: "End to End",
    metricLabel: "Site and interaction design, from first strategy call through launch",
    featured: true,
  },
];

/** A featured project always has the backdrop still StoryFrame needs. */
export type FeaturedProject = Project & Required<Pick<Project, "still">>;

export const FEATURED_PROJECTS = PROJECTS.filter(
  (p): p is FeaturedProject => Boolean(p.featured && p.still),
);
