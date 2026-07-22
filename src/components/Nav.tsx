"use client";

import { AudioToggle } from "@/components/AudioToggle";
import { openAbout } from "@/lib/about";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
] as const;

/**
 * Fixed nav in mix-blend-difference: the whole bar composites as a group and
 * inverts against whatever is behind it, so it stays legible over dark and
 * light sections alike (bymonolog.com). White base → white over dark, dark
 * over light. Center links highlight into a filled pill on hover; "Start a
 * project" is a solid button with the arrow in its own chip.
 */
export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-(--space-inline) py-4 text-white mix-blend-difference">
      <a
        href="#top"
        className="font-mono text-[14px] font-medium tracking-mono uppercase"
      >
        Troy Bello<span>®</span>
      </a>

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-[18px] font-semibold tracking-snug md:flex">
        <button
          type="button"
          onClick={openAbout}
          className="rounded-xs px-2.5 py-1 transition-colors duration-(--dur-fast) hover:bg-white hover:text-black-950"
        >
          About
        </button>
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-xs px-2.5 py-1 transition-colors duration-(--dur-fast) hover:bg-white hover:text-black-950"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <AudioToggle />
        <a
          href="#contact"
          className="flex items-center gap-2.5 rounded-md bg-white py-1.5 pr-1.5 pl-4 text-[16px] font-semibold text-black-950"
        >
          Start a project
          <span
            aria-hidden
            className="flex size-6 items-center justify-center rounded-xs bg-black-950 text-[13px] text-white"
          >
            ↗
          </span>
        </a>
      </div>
    </nav>
  );
}
