import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Disables ESLint checks during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
