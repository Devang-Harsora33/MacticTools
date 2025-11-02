import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.googleapis.com",
      },
    ],
    // Limit device sizes to most common breakpoints
    deviceSizes: [640, 768, 1024, 1280],
    // Limit image sizes to essential sizes
    imageSizes: [64, 128, 256],
    // Cache images for longer to reduce transformations
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
};

export default nextConfig;
