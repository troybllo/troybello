"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ABOUT_EVENT } from "@/lib/about";
import { getLenis } from "@/lib/lenis";
import { Media } from "@/components/Media";

/**
 * About slide-over (bymonolog.com): a right-side panel that slides in when
 * "About" is triggered from the nav or footer. Light studio blurb + meta,
 * then a portrait with "listen"/"create" overlays. Closes on Esc, the Close
 * button, or a backdrop click; locks scroll and restores focus.
 */
export function AboutDrawer() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setMounted(true);
      requestAnimationFrame(() => {
        setOpen(true);
        closeRef.current?.focus();
      });
    };
    window.addEventListener(ABOUT_EVENT, onOpen);
    return () => window.removeEventListener(ABOUT_EVENT, onOpen);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
    window.setTimeout(() => setMounted(false), 600);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [mounted, close]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9995]" role="dialog" aria-modal="true" aria-label="About the studio">
      <button
        type="button"
        aria-label="Close about"
        onClick={close}
        className={cn(
          "absolute inset-0 cursor-default bg-black-950/50 backdrop-blur-sm transition-opacity duration-(--dur-normal)",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[640px] flex-col overflow-y-auto bg-greige-100 text-black-950 transition-transform duration-(--dur-slow) ease-(--ease-transition)",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-1 flex-col px-(--space-inline) py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 font-mono text-mono-xs tracking-mono uppercase text-ink/60">
              <span className="inline-block size-2 rounded-full bg-ink/60" />
              About the studio
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex items-center gap-2 rounded-xs bg-black-950 px-3 py-1.5 text-[13px] font-semibold text-greige-100"
            >
              Close <span className="text-greige-100/60">ESC</span>
            </button>
          </div>

          <p className="mt-10 max-w-[46ch] text-[clamp(16px,1.3vw,20px)] leading-[1.5]">
            Hey, I&apos;m Troy. I started freelancing because I watched
            exceptional founders stay invisible — their presence never catching
            up to who they&apos;d become despite the scale of their ambition.
            That gap became an obsession. I&apos;ve spent years breaking down
            what separates a forgettable digital presence from work that
            actually moves people, and I bring that to every project I take on.
            When I work with you, I&apos;m immersed in your story, ruthless about
            what matters, and built to close the gap between who you are and how
            the world sees you.
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-10 font-mono text-mono-xs tracking-mono uppercase text-ink/55">
            <span aria-hidden>✦</span>
            <span>EST 2022</span>
            <span>Based in Toronto</span>
          </div>
        </div>

        <div className="relative">
          <Media caption="" aspect="16/10" radius="none" className="w-full" />
          <span className="absolute top-6 left-6 text-[clamp(28px,3vw,44px)] font-medium text-greige-100">
            listen
          </span>
          <span className="absolute right-6 bottom-6 text-[clamp(28px,3vw,44px)] font-medium text-greige-100">
            create
          </span>
        </div>
      </div>
    </div>
  );
}
