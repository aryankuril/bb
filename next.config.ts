import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // ✅ Skip ESLint during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize images from trusted remote sources
  images: {
    formats: ["image/avif", "image/webp"], // modern, smaller formats
    minimumCacheTTL: 60 * 60 * 24 * 30, // cache for 30 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },

  // ✅ Add global caching + security + compression headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ⚡ Performance / caching headers
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=31536000, s-maxage=31536000, immutable"
              : "no-cache, no-store, must-revalidate",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },

          // ⚙️ Compression hints
          {
            key: "Content-Encoding",
            value: "br, gzip",
          },

          // 🛡️ Security headers
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
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

  // ✅ Enable edge caching (especially useful on Vercel)
  experimental: {
    turbo: {
      rules: {
        "*.js": { cache: "force-cache" },
        "*.css": { cache: "force-cache" },
        "*.png": { cache: "force-cache" },
        "*.jpg": { cache: "force-cache" },
        "*.webp": { cache: "force-cache" },
        "*.avif": { cache: "force-cache" },
      },
    },
  },

  // ✅ Redirects (from your existing configuration)
  async redirects() {
    const redirects = [
      { source: "/about", destination: "/aboutus", permanent: true },
      { source: "/career", destination: "/join-our-team", permanent: true },
      { source: "/contact", destination: "/contactus", permanent: true },
      { source: "/our-clients", destination: "/clients", permanent: true },
      { source: "/our-team", destination: "/teams", permanent: true },

      // ✅ Services Redirects
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

      // ✅ Disabled Pages
      { source: "/project-details", destination: "/404", permanent: false },
      { source: "/case-study", destination: "/404", permanent: false },
      {
        source: "/performance-marketing-calculator",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/portfolio/the-untold-story-of-bombay",
        destination: "/404",
        permanent: false,
      },
      {
        source:
          "/social-media/crafting-an-effective-social-media-strategy-unlocking-the-power-of-social-media-agencies",
        destination: "/404",
        permanent: false,
      },
      { source: "/service-affiliates", destination: "/404", permanent: false },
      { source: "/category/social-media", destination: "/404", permanent: false },
      { source: "/category/brand-design", destination: "/404", permanent: false },
      { source: "/brand-design/portfolio3", destination: "/404", permanent: false },
      { source: "/category/website", destination: "/404", permanent: false },
      { source: "/website/portfolio4", destination: "/404", permanent: false },
      { source: "/category/portfolio", destination: "/404", permanent: false },
      {
        source: "/social-media/3-ways-to-keep-your-social-media-people-powered",
        destination: "/404",
        permanent: false,
      },
      { source: "/portfolio/hello-world", destination: "/404", permanent: false },
      { source: "/portfolio/portfolio1", destination: "/404", permanent: false },
    ];

    return redirects;
  },
};

export default nextConfig;
