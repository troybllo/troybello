"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Fixed section counter (bottom-left): NN / TT of the current section,
 * tracked via IntersectionObserver. mix-blend-difference so it reads over
 * light and dark alike.
 */
export function SectionCounter() {
  const [index, setIndex] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > *, footer"),
    );
    if (!sections.length) return;
    const raf = requestAnimationFrame(() => setTotal(sections.length));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target as HTMLElement);
            if (i >= 0) setIndex(i + 1);
          }
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  if (!total) return null;

  return (
    <div className="pointer-events-none fixed bottom-8 left-(--space-inline) z-40 font-mono text-mono-sm tracking-mono mix-blend-difference">
      <span className="text-white">{pad(index)}</span>
      <span className="text-white/50"> / {pad(total)}</span>
    </div>
  );
}
