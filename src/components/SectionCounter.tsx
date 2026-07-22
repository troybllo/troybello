"use client";

import { useEffect, useState } from "react";
import { pad2 } from "@/lib/motion";

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
      <span className="text-white">{pad2(index)}</span>
      <span className="text-white/50"> / {pad2(total)}</span>
    </div>
  );
}
