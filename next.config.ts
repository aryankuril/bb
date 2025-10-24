import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Disables ESLint checks during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Disables TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
