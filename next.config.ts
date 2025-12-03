import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  swcMinify: true,
  compress: true,

  experimental: {
    optimizePackageImports: ["gsap"],
    turbo: {
      resolveAlias: {
        gsap: "gsap/dist/gsap",
      },
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "*.bombayblokes.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      {
        source: "/(.*).(png|jpg|jpeg|gif|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },

      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=3600"
              : "no-cache, no-store, must-revalidate",
          },
          { key: "Vary", value: "Accept-Encoding" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/about", destination: "/aboutus", permanent: true },
      { source: "/career", destination: "/join-our-team", permanent: true },
      { source: "/contact", destination: "/contactus", permanent: true },
      { source: "/our-clients", destination: "/clients", permanent: true },
      { source: "/our-team", destination: "/teams", permanent: true },
      {
        source: "/website-design",
        destination: "/services/website-development",
        permanent: true,
      },
      {
        source: "/seo-services",
        destination: "/services/seo-services",
        permanent: true,
      },
      {
        source: "/design-branding",
        destination: "/services/design-branding",
        permanent: true,
      },
      {
        source: "/social-media",
        destination: "/services/social-media-marketing",
        permanent: true,
      },
      {
        source: "/performance-marketing",
        destination: "/services/performance-marketing",
        permanent: true,
      },
      {
        source: "/generative-engine-optimization-service-geo",
        destination: "/services/geo-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
