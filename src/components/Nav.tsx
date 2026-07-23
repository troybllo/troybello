"use client";

import { AudioToggle } from "@/components/AudioToggle";
import { openAbout } from "@/lib/about";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
] as const;

// mix-blend-difference lets the whole bar composite as a group and invert
// against whatever scrolls behind it, staying legible over dark and light.
export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-(--space-inline) py-4 text-white mix-blend-difference">
      <a
        href="#top"
        className="font-mono text-[30px] font-extrabold tracking-mono uppercase"
      >
        BLLO<span>®</span>
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
            className="px-2.5 py-1 transition-colors duration-(--dur-fast) hover:bg-white hover:text-black-950"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="hidden items-center gap-2.5 md:flex">
        <AudioToggle />
        <a
          href="#contact"
          className="flex items-center gap-2.5  bg-white py-1.5 pr-1.5 pl-4 text-[16px] font-semibold text-black-950"
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
