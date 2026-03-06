import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // This is the fix! It creates the 'out' folder
  images: {
    unoptimized: true,   // Required for GitHub Pages
  },
};

export default nextConfig;