import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      // ✅ Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // ✅ Firebase Storage URLs
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },

      // ✅ Alternate Firebase CDN pattern
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },

  async headers() {
    return [
      {
        // ✅ Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            // ✅ Cache static assets for 1 year (browsers + CDN)
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // ✅ Apply short-term caching for HTML pages (so updates show quickly)
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            // Cache HTML for 60 seconds only
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },

  async redirects() {
    const redirects = [
      {
        source: "/about",
        destination: "/aboutus",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/join-our-team",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contactus",
        permanent: true,
      },
      {
        source: "/our-clients",
        destination: "/clients",
        permanent: true,
      },
      {
        source: "/our-team",
        destination: "/teams",
        permanent: true,
      },

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
        source:
          "/social-media/3-ways-to-keep-your-social-media-people-powered",
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
