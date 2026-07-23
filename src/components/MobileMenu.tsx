"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { openAbout } from "@/lib/about";
import { getLenis } from "@/lib/lenis";

const links = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Contact", "#contact"],
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <div className="fixed top-0 right-0 z-[55] px-(--space-inline) py-4 mix-blend-difference">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex size-9 flex-col items-center justify-center gap-1.5"
        >
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-6 bg-white" />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-black-950 px-(--space-inline) py-4 transition-opacity duration-(--dur-normal)",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[14px] font-medium tracking-mono uppercase text-white">
            Troy Bello<span className="text-accent">®</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2  bg-white px-3 py-1.5 text-[13px] font-semibold text-black-950"
          >
            Close <span className="text-black-950/50">ESC</span>
          </button>
        </div>

        <nav className="mt-14 flex flex-col" aria-label="Mobile">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openAbout();
            }}
            className="border-b border-hairline py-4 text-left text-[clamp(32px,9vw,56px)] font-semibold tracking-tight text-white"
          >
            About
          </button>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 text-[clamp(32px,9vw,56px)] font-semibold tracking-tight text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
