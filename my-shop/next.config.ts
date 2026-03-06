import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this line below - it must match your repository name exactly
  basePath: '/fila-online-shop', 
};

export default nextConfig;