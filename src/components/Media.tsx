import Image from "next/image";
import { cn } from "@/lib/cn";

const isVideo = (src: string) => /\.(webm|mp4|mov)(\?|$)/i.test(src);
// Animated GIFs must bypass the optimizer — it flattens them to a still frame.
const isGif = (src: string) => /\.gif(\?|$)/i.test(src);

type MediaProps = {
  /** Image or video URL. Omit to render the striped placeholder. */
  src?: string;
  alt?: string;
  /** Mono caption pinned bottom-left inside the frame, e.g. "[ Align — case study ]". */
  caption?: string;
  /** Poster frame for video `src` — shown while the clip loads. */
  poster?: string;
  /** CSS aspect-ratio, e.g. "4/5", "3/4", "16/9". Omit to size via className. */
  aspect?: string;
  radius?: "none" | "xs" | "sm";
  sizes?: string;
  className?: string;
};

// Renders a looping muted video, a next/image, or a striped placeholder,
// depending on whether `src` is set and its extension.
export function Media({
  src,
  alt = "",
  caption,
  poster,
  aspect = "4/5",
  radius = "sm",
  sizes,
  className,
}: MediaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !src && "ph",
        radius === "xs" && "rounded-xs",
        radius === "sm" && "rounded-sm",
        className,
      )}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {src &&
        (isVideo(src) ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            unoptimized={isGif(src)}
            className="object-cover"
          />
        ))}
      {caption && (
        <div className="absolute bottom-3.5 left-4 z-10 font-mono text-mono-xs tracking-mono-md uppercase text-fg-faint">
          {caption}
        </div>
      )}
    </div>
  );
}
