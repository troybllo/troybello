import { HalftoneCanvas } from "@/components/HalftoneCanvas";
import { HoldToDisrupt } from "@/components/HoldToDisrupt";

/**
 * Footer glitch band: the halftone shader at full contrast — bright greige
 * gooey dot-waves on black (Monolog's footer canvas 1:1). Hold-to-disrupt
 * is built into the canvas (mousedown intensifies the field); the chip
 * follows the cursor across the band.
 */
export function Footer() {
  return (
    <footer className="relative h-[45vh] min-h-[320px] overflow-hidden">
      <HalftoneCanvas
        fg="#d9d9d0"
        amplitude={1}
        className="absolute inset-0 size-full"
      />

      <HoldToDisrupt />

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between px-(--space-inline)">
        <span className="font-mono text-[14px] font-medium tracking-mono uppercase mix-blend-difference">
          Troy Bello<span className="text-greige-400">®</span>
        </span>
        <span className="text-body-sm mix-blend-difference">
          『 Refuse to be underestimated. 』
        </span>
      </div>
    </footer>
  );
}
