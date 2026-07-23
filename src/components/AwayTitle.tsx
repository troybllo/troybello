"use client";

import { useEffect } from "react";

const LABEL = "On Hold";
const FRAMES = [".", "..", "..."];
const BEAT = 500;

/**
 * Swaps the tab title for a cycling "On Hold." while the tab is hidden, and
 * restores the real one on return. Renders nothing.
 */
export function AwayTitle() {
  useEffect(() => {
    // Captured on mount so we restore exactly what the document had.
    const original = document.title;
    let timer: number | undefined;
    let frame = 0;

    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (timer !== undefined) return;
        frame = 0;
        document.title = LABEL + FRAMES[frame];
        timer = window.setInterval(() => {
          frame = (frame + 1) % FRAMES.length;
          document.title = LABEL + FRAMES[frame];
        }, BEAT);
      } else {
        stop();
        document.title = original;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    // Sync once: a tab opened in the background (cmd-click) is already hidden,
    // and no visibilitychange fires until it is focused.
    onVisibility();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return null;
}
