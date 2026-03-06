import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this line exactly as shown:
  basePath: '/fila-online-shop', 
};

export default nextConfig;