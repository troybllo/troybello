"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  ABOUT_AVAILABILITY,
  ABOUT_BIO,
  ABOUT_EVENT,
  ABOUT_LINKS,
  ABOUT_META,
  STATS,
} from "@/lib/about";
import { getLenis } from "@/lib/lenis";
import { HalftoneCanvas } from "@/components/HalftoneCanvas";

// Dusty rose against near-black — the one warm accent on an otherwise greige
// site. Passed as a literal because the canvas parses hex, not CSS vars.
const BLUSH = "#b5717a";

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
            <div className="flex items-center gap-2.5 font-mono text-mono-xs tracking-mono uppercase text-black-950/60">
              <span className="inline-block size-2 rounded-full bg-black-950/60" />
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

          <div className="mt-10 max-w-[46ch] space-y-5">
            {ABOUT_BIO.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lead-sm"
                    : "text-body-lg text-black-950/70"
                }
              >
                {para}
              </p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-black-950/12 pt-8">
            {STATS.map((stat) => (
              <div key={stat.num}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-[clamp(34px,4vw,52px)] leading-none font-semibold tracking-tight">
                    {stat.num}
                  </span>
                  <span className="mt-3 block text-body-sm text-black-950/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-8 border-t border-black-950/12 pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-mono-xs tracking-mono uppercase text-black-950/55">
                Get in touch
              </h3>
              <ul className="mt-4 space-y-2">
                {ABOUT_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="text-body-lg underline decoration-black-950/25 underline-offset-4 hover:decoration-black-950"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-3">
              {ABOUT_META.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <dt className="w-[64px] shrink-0 font-mono text-mono-xs tracking-mono uppercase text-black-950/55">
                    {item.label}
                  </dt>
                  <dd className="text-body-sm">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-auto flex items-center gap-2.5 pt-10 font-mono text-mono-xs tracking-mono uppercase text-black-950/55">
            <span aria-hidden className="size-1.5 rounded-full bg-current opacity-60" />
            <span>{ABOUT_AVAILABILITY}</span>
          </div>
        </div>

        {/* Generative panel rather than a photo — a portrait never sat well in
            a full-width band here. Falls back to the flat black block when
            WebGL2 is missing or the user prefers reduced motion. */}
        <div
          className="grain relative overflow-hidden bg-black-950"
          style={{ aspectRatio: "16/10" }}
        >
          <HalftoneCanvas
            className="absolute inset-0 size-full"
            bg="#080807"
            fg={BLUSH}
            pixelSize={3}
            amplitude={2.4}
            timeSpeed={0.009}
            gooeyness={0.72}
            contrast={1.9}
            bias={-0.12}
            invert={0}
            waveAmplitude={0.55}
            waveFrequency={6.2}
          />
          <span className="absolute top-6 left-6 text-[clamp(28px,3vw,44px)] font-medium text-greige-100 mix-blend-difference">
            listen
          </span>
          <span className="absolute right-6 bottom-6 text-[clamp(28px,3vw,44px)] font-medium text-greige-100 mix-blend-difference">
            create
          </span>
        </div>
      </div>
    </div>
  );
}
