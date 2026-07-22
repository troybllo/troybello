import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root is ~/Projects (one big git repo) — pin the workspace root
  // so Next/Turbopack doesn't infer it from a parent directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
