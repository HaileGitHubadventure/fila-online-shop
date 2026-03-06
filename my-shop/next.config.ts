import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <--- THIS IS THE KEY LINE
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;