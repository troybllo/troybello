"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SwitcherRail } from "@/components/SwitcherRail";

const MANIFESTO_TEXT =
  "Most people I work with have built something significant — but their website doesn't show it yet. That gap costs more than revenue. It costs the certainty that your brand is finally being understood.";

/* placeholder info until real numbers/awards exist (README §3 stats) */
const stats = [
  { num: "40+", label: "Projects shipped for founders and creative teams worldwide" },
  { num: "6yr", label: "Freelancing across design, front-end, and full delivery" },
  { num: "100%", label: "Founder-led — you work directly with me, start to finish" },
];

const words = MANIFESTO_TEXT.split(" ");

/**
 * Hero part two (Monolog manifesto layout): stat switcher left, scroll
 * word-fill paragraph right. Words start dim and fill to full greige
 * left-to-right as the section scrolls through (README §5 math).
 */
export function Manifesto() {
  const [stat, setStat] = useState(0);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const para = paraRef.current;
    if (!para) return;
    const spans = Array.from(para.querySelectorAll<HTMLSpanElement>(".fw"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.color = "rgba(232,232,227,1)"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* diagonal fill: each word's threshold is its normalized position on the
       top-left → bottom-right axis, so the reveal sweeps in diagonally. */
    let diag = spans.map(() => 0);
    const measure = () => {
      const pr = para.getBoundingClientRect();
      diag = spans.map((s) => {
        const r = s.getBoundingClientRect();
        const nx = (r.left + r.width / 2 - pr.left) / pr.width;
        const ny = (r.top + r.height / 2 - pr.top) / pr.height;
        return (nx + ny) / 2;
      });
    };
    measure();

    const band = 0.28; // soft edge width of the diagonal sweep
    const st = ScrollTrigger.create({
      trigger: para,
      start: "top 78%",
      end: () => `+=${para.offsetHeight * 2.4}`, // long scrub → slow fill
      onRefresh: measure,
      onUpdate: (self) => {
        const p = self.progress * (1 + band);
        spans.forEach((s, i) => {
          const lit = Math.max(0, Math.min(1, (p - diag[i]) / band));
          const a = 0.22 + 0.78 * lit;
          s.style.color = `rgba(232,232,227,${a.toFixed(3)})`;
        });
      },
    });
    return () => st.kill();
  }, []);

  const step = (dir: number) =>
    setStat((s) => (s + dir + stats.length) % stats.length);

  return (
    <section
      id="gap"
      className="flex min-h-svh items-center px-(--space-inline) py-(--sect-lg)"
    >
      <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[1fr_1.9fr]">
        {/* stat switcher — placeholder info */}
        <div>
          <SwitcherRail index={stat} count={stats.length} onStep={step} />
          <div className="mt-10" aria-live="polite">
            <div className="text-stat">{stats[stat].num}</div>
            <p className="mt-3 max-w-[30ch] text-body-sm text-fg-muted">
              {stats[stat].label}
            </p>
          </div>
        </div>

        {/* scroll word-fill */}
        <div>
          <p ref={paraRef} className="max-w-[26ch] text-manifesto">
            {words.map((w, i) => (
              <span key={i} className="fw" style={{ color: "rgba(232,232,227,0.24)" }}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="mt-12 flex items-center gap-3.5">
            <div className="ph size-11 shrink-0 rounded-full" aria-hidden />
            <div className="text-body-sm">
              <div className="font-medium text-fg-muted">Troy Bello</div>
              <div className="text-fg-faint">Founder</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
