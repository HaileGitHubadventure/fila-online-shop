import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove basePath for Netlify
  images: {
    unoptimized: true,
  },
};

export default nextConfig;