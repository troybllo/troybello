"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/hooks/useHydrated";
import { prefersReducedMotion } from "@/lib/motion";

// Probed once per session — creating a context is not free.
let webgl2: boolean | null = null;
function supportsWebGL2() {
  if (webgl2 === null) {
    try {
      webgl2 = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webgl2 = false;
    }
  }
  return webgl2;
}

// Animated gooey-halftone field in raw WebGL2. A domain-warped sine noise
// field sets each dot's radius; a smooth-min blend fuses neighbours. Renders
// nothing when WebGL2 is unavailable or the user prefers reduced motion.

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uReveal;
uniform float uAmplitude;
uniform float uPixelSize;
uniform float uGooeyness;
uniform float uContrast;
uniform float uBias;
uniform float uInvert;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform vec3 uBg;
uniform vec3 uFg;

in vec2 vUv;
out vec4 outColor;

float field(vec2 uv) {
  vec2 c = 2.0 * uv - 1.0;
  float ds = uAmplitude * uReveal;
  c += ds * 0.4 * sin(c.yx + vec2(1.2, 3.4) + uTime);
  c += ds * 0.2 * sin(5.2 * c.yx + vec2(3.5, 0.4) + uTime);
  c += ds * 0.3 * sin(3.5 * c.yx + vec2(1.2, 3.1) + uTime);
  c += ds * 1.6 * sin(0.4 * c.yx + vec2(0.8, 2.4) + uTime);
  float L = length(c);
  float v = 0.0;
  for (int i = 0; i < 4; i++) {
    v = mix(v, float(i) / 3.0, cos(float(i) * L));
  }
  return clamp(v, 0.0, 1.0);
}

float lumaToRadius(float luma, float biasOffset) {
  float v = clamp((luma - 0.5 + uBias + biasOffset) * uContrast + 0.5, 0.0, 1.0);
  if (uInvert > 0.5) v = 1.0 - v;
  return v * uPixelSize * 0.6 + uPixelSize * 0.05;
}

float smin(float a, float b, float k) {
  if (k <= 0.001) return min(a, b);
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

void main() {
  vec2 pixelCoord = vUv * uResolution;
  vec2 baseCell = floor(pixelCoord / uPixelSize);
  float minDist = 1.0e5;
  float k = uGooeyness * 1.5 * uPixelSize;

  for (int dx = -1; dx <= 1; dx++) {
    for (int dy = -1; dy <= 1; dy++) {
      vec2 cell = baseCell + vec2(float(dx), float(dy));
      if (mod(cell.x + cell.y, 2.0) > 0.5) continue;
      vec2 center = (cell + 0.5) * uPixelSize;
      float luma = field(center / uResolution);
      float cellY = center.y / uResolution.y;
      float waveBias = sin(cellY * uWaveFrequency * 6.2831853) * uWaveAmplitude;
      float dist = length(pixelCoord - center);
      minDist = smin(minDist, dist - lumaToRadius(luma, waveBias), k);
    }
  }

  float aa = max(fwidth(minDist), 0.0001);
  float shape = 1.0 - smoothstep(-aa, aa, minDist);
  outColor = vec4(mix(uBg, uFg, shape * uReveal), 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type HalftoneCanvasProps = {
  bg?: string;
  fg?: string;
  /** Dot cell size in device pixels. */
  pixelSize?: number;
  amplitude?: number;
  timeSpeed?: number;
  gooeyness?: number;
  contrast?: number;
  bias?: number;
  /** 1 = larger dots on lower luma; 0 = larger dots on higher luma. */
  invert?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  className?: string;
};

export function HalftoneCanvas({
  bg = "#080807",
  fg = "#55524b",
  pixelSize = 4,
  amplitude = 0.8,
  timeSpeed = 0.0045,
  gooeyness = 0.58,
  contrast = 1.5,
  bias = 0,
  invert = 1,
  waveAmplitude = 0,
  waveFrequency = 1,
  className,
}: HalftoneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hydrated = useHydrated();
  // Reduced motion gets the static gradient; so does any browser without
  // WebGL2 — Chrome with hardware acceleration off has no WebGL at all, and a
  // bare canvas would leave the hero, footer and About panel blank.
  const fallback = hydrated && (prefersReducedMotion() || !supportsWebGL2());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || fallback) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = u("uResolution");
    const uTime = u("uTime");
    const uReveal = u("uReveal");
    const uAmplitude = u("uAmplitude");
    gl.uniform1f(u("uPixelSize"), pixelSize);
    gl.uniform1f(u("uGooeyness"), gooeyness);
    gl.uniform1f(u("uContrast"), contrast);
    gl.uniform1f(u("uBias"), bias);
    gl.uniform1f(u("uInvert"), invert);
    gl.uniform1f(u("uWaveAmplitude"), waveAmplitude);
    gl.uniform1f(u("uWaveFrequency"), waveFrequency);
    gl.uniform3fv(u("uBg"), hexToRgb(bg));
    gl.uniform3fv(u("uFg"), hexToRgb(fg));

    const state = {
      time: 0,
      reveal: 0,
      revealStart: performance.now() + 300,
      holding: false,
      currentAmplitude: amplitude,
      raf: 0,
      last: performance.now(),
      running: false,
      visible: true,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w === 0 || h === 0 || (canvas.width === w && canvas.height === h)) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const frame = (now: number) => {
      const q = Math.min((now - state.last) / (1000 / 60), 3);
      state.last = now;

      /* reveal: 2s ease-out after a 300ms delay */
      const t = Math.min(Math.max((now - state.revealStart) / 2000, 0), 1);
      state.reveal = 1 - Math.pow(1 - t, 3);

      // Hold to intensify: lerp amplitude/speed toward the held target.
      const target = state.holding ? amplitude * 2 : amplitude;
      state.currentAmplitude +=
        (target - state.currentAmplitude) * (1 - Math.pow(1 - 0.03, q));
      const speed = state.holding ? timeSpeed * 1.5 : timeSpeed;
      state.time += speed * q;

      gl.uniform1f(uTime, state.time);
      gl.uniform1f(uReveal, state.reveal);
      gl.uniform1f(uAmplitude, state.currentAmplitude);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      state.raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (state.running) return;
      state.running = true;
      state.last = performance.now();
      state.raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      state.running = false;
      cancelAnimationFrame(state.raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        if (state.visible && !document.hidden) {
          // The canvas may have been sized (or resized) while hidden — e.g. the
          // About drawer lays out its panel off-screen, then slides it in. Sync
          // the buffer before drawing so it never paints into a stale/zero size.
          resize();
          start();
        } else {
          stop();
        }
      },
      // Start a beat before it scrolls in, so the footer is never caught blank.
      { rootMargin: "200px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (state.visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Safety net for the first few seconds: IntersectionObserver is flaky at
    // catching an element that enters via a CSS transform (the About drawer
    // slides its panel in), so it can miss the reveal and leave the canvas
    // blank. Poll the real rect briefly until the loop has run once.
    const onScreen = () => {
      const r = canvas.getBoundingClientRect();
      return (
        r.width > 0 &&
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        r.right > 0 &&
        r.left < window.innerWidth
      );
    };
    const guard = window.setInterval(() => {
      if (state.running) return window.clearInterval(guard);
      if (!document.hidden && onScreen()) {
        state.visible = true;
        resize();
        start();
        window.clearInterval(guard);
      }
    }, 200);
    window.setTimeout(() => window.clearInterval(guard), 4000);

    const down = () => (state.holding = true);
    const up = () => (state.holding = false);
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    start();

    return () => {
      stop();
      window.clearInterval(guard);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [
    fallback,
    bg,
    fg,
    pixelSize,
    amplitude,
    timeSpeed,
    gooeyness,
    contrast,
    bias,
    invert,
    waveAmplitude,
    waveFrequency,
  ]);

  if (fallback) {
    return (
      <div
        aria-hidden
        className={cn("halftone-fallback", className)}
        style={{ "--halftone-fg": fg, "--halftone-bg": bg } as React.CSSProperties}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
