import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so this can deploy to Spark, Vercel, Netlify, or GitHub Pages
  // with no server. `npm run build` emits ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
