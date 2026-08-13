import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // ---------------------------------------------------------
  // ✅ SPEED IMPROVEMENTS
  // ---------------------------------------------------------

  // Skip ESLint during builds (faster Vercel deploy)
  eslint: {
    ignoreDuringBuilds: true, 
  },

  // Enable compression (gzip + brotli)
  compress: true,

  // ---------------------------------------------------------
  // ✅ IMAGE OPTIMIZATION
  // ---------------------------------------------------------
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "*.bombayblokes.com" }, // Optional
    ],
  },

  // ---------------------------------------------------------
  // ✅ HTTP HEADERS (PERFORMANCE + SECURITY)
  // ---------------------------------------------------------
  async headers() {
    return [
      // ---------------------------------------------------
      // 1️⃣ Cache static Next.js assets for 1 year
      // ---------------------------------------------------
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ---------------------------------------------------
      // 2️⃣ Cache images: 30 days
      // ---------------------------------------------------
      {
        source: "/(.*).(png|jpg|jpeg|gif|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },

      // ---------------------------------------------------
      // 3️⃣ HTML should NOT be long-cached (IMPORTANT!)
      // ---------------------------------------------------
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=3600" // 1 hour for dynamic pages
              : "no-cache, no-store, must-revalidate",
          },
          { key: "Vary", value: "Accept-Encoding" },

          // ----------------------
          // Security Headers
          // ----------------------
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

  // ---------------------------------------------------------
  // ✅ REDIRECTS (YOUR ORIGINAL, CLEANED)
  // ---------------------------------------------------------
  async redirects() {
    return [
      { source: "/about", destination: "/aboutus", permanent: true },
      { source: "/career", destination: "/join-our-team", permanent: true },
      { source: "/contact", destination: "/contactus", permanent: true },
      { source: "/our-clients", destination: "/clients", permanent: true },
      { source: "/our-team", destination: "/teams", permanent: true },

      // Services Redirects
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
        permanent: false,
      },
      {
        source: "/performance-marketing",
        destination: "/services/performance-marketing",
        permanent: false,
      },
      {
        source: "/generative-engine-optimization-service-geo",
        destination: "/services/geo-services",
        permanent: true,
      },

      // Disabled
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
  },
};

export default nextConfig;

// touch to restart
