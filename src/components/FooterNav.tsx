"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Kicker } from "@/components/Kicker";
import { openAbout } from "@/lib/about";

const navLinks = [
  ["Work", "/work"],
  ["Services", "/#services"],
  ["Process", "/#process"],
  ["Contact", "/#contact"],
] as const;

function useTorontoClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(new Date()));
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(t);
    };
  }, []);
  if (!now) return { time: "—", date: "—" };

  const time = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);
  const offset =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      timeZoneName: "shortOffset",
    })
      .formatToParts(now)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  return { time, date: `${date} (${offset})` };
}

export function FooterNav() {
  const { time, date } = useTorontoClock();

  return (
    <section className="flex min-h-svh flex-col justify-between px-(--space-inline) pt-(--sect-md) pb-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Kicker dot className="mb-12">
            Navigation
          </Kicker>
          <nav aria-label="Footer">
            <ul>
              <li className="border-b border-hairline">
                <button
                  type="button"
                  onClick={openAbout}
                  className="group flex w-full items-center justify-between py-3 text-left text-[clamp(28px,3vw,48px)] font-semibold tracking-tight transition-colors duration-(--dur-fast) hover:bg-greige-100 hover:px-5 hover:text-black-950"
                >
                  About
                  <span
                    aria-hidden
                    className="opacity-0 transition-opacity duration-(--dur-fast) group-hover:opacity-100"
                  >
                    →
                  </span>
                </button>
              </li>
              {navLinks.map(([label, href]) => (
                <li key={href} className="border-b border-hairline">
                  <Link
                    href={href}
                    className="group flex items-center justify-between py-3 text-[clamp(28px,3vw,48px)] font-semibold tracking-tight transition-colors duration-(--dur-fast) hover:bg-greige-100 hover:px-5 hover:text-black-950"
                  >
                    {label}
                    <span
                      aria-hidden
                      className="opacity-0 transition-opacity duration-(--dur-fast) group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-10 self-start pt-1">
          <div>
            <div className="font-mono text-mono-xs tracking-mono uppercase text-fg-faint">
              (Studio details)
            </div>
            <a
              href="mailto:troybello25@gmail.com"
              className="mt-6 inline-block text-body-sm underline underline-offset-4 hover:text-fg-muted"
            >
              ⮡ troybello25@gmail.com
            </a>
            <p className="mt-5 max-w-[24ch] text-body-sm text-fg-muted">
              Based in Toronto, Ontario. Working worldwide.
            </p>
          </div>
          <div>
            <div className="font-mono text-mono-xs tracking-mono uppercase text-fg-faint">
              (Socials)
            </div>
            <div className="mt-6 flex flex-col gap-2.5 text-body-sm">
              <a
                href="https://www.linkedin.com/in/troybello/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg-muted"
              >
                LinkedIn <span aria-hidden>↗</span>
              </a>
              <a
                href="https://github.com/troybllo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg-muted"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-6 text-[clamp(15px,1.15vw,19px)] font-medium sm:grid-cols-3">
        <div>
          <div>Toronto {time}</div>
          <div className="text-fg-muted">{date}</div>
        </div>
        <div>
          <Link href="/#top" className="hover:text-fg-muted">
            Back to top <span aria-hidden>↑</span>
          </Link>
          <div className="text-fg-muted">Booking projects for Q4 &lsquo;26</div>
        </div>
        <div className="sm:text-right">©2026 Troy Bello</div>
      </div>
    </section>
  );
}
