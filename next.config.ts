import type { NextConfig } from "next";

// On GitHub Pages a project site is served from a subpath
// (https://<user>.github.io/<repo>/), so the build needs a basePath. The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH=/Portfolio; local dev leaves it empty so
// the site still serves from "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export so this can deploy to Spark, Vercel, Netlify, or GitHub Pages
  // with no server. `npm run build` emits ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
