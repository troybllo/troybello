import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MobileMenu } from "@/components/MobileMenu";
import { AboutDrawer } from "@/components/AboutDrawer";
import { AwayTitle } from "@/components/AwayTitle";
import { WorkGrid } from "@/components/WorkGrid";
import { PROJECTS } from "@/lib/projects";
import { pad2 } from "@/lib/motion";

export const metadata: Metadata = {
  title: "All success stories — Troy Bello®",
  description:
    "Every client project — websites designed, built and shipped end to end.",
};

export default function WorkPage() {
  return (
    <>
      <AwayTitle />
      <Nav />
      <MobileMenu />
      <AboutDrawer />
      <main
        id="main"
        className="theme-light min-h-svh px-(--space-inline) pt-32 pb-(--sect-lg)"
      >
        <header className="flex flex-col justify-between gap-8 pb-12 md:flex-row md:items-end">
          <h1 className="max-w-[9ch] text-display-lg">All success stories</h1>
          <span
            aria-hidden
            className="shrink-0 text-display-lg leading-none tabular-nums"
          >
            ({pad2(PROJECTS.length)})
          </span>
          <span className="sr-only">{PROJECTS.length} projects</span>
        </header>

        <div className="border-t border-hairline pt-12">
          <WorkGrid />
        </div>

        <div className="mt-(--sect-lg) border-t border-hairline pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-h5 transition-colors hover:text-fg-muted"
          >
            <span aria-hidden>(←)</span> Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
