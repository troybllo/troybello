import { HalftoneCanvas } from "@/components/HalftoneCanvas";
import { CursorCue } from "@/components/CursorCue";

// The canvas amplifies its field on pointer-down, so pressing the band
// "disrupts" it — the cue chip is the affordance for that.
export function Footer() {
  return (
    <footer className="relative h-[45vh] min-h-[320px] overflow-hidden">
      <HalftoneCanvas
        fg="#d9d9d0"
        amplitude={1}
        className="absolute inset-0 size-full"
      />

      <CursorCue label="Hold to disrupt" rest="center" />

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
