import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Allows loading images from any source without optimization
  },
};

export default nextConfig;
