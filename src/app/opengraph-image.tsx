import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Troy Bello® — Freelance web design & development";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080807",
          color: "#e8e8e3",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, color: "#8c8c73" }}>
          FREELANCE WEB DESIGN &amp; DEVELOPMENT
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          I build change-making websites.
        </div>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600 }}>
          <span>Troy Bello</span>
          <span style={{ color: "#8c8c73" }}>®</span>
        </div>
      </div>
    ),
    size,
  );
}
