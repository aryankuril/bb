"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Dynamic Components (Client-only)
const PageLoader = dynamic(() => import("./components/PageLoader"), { ssr: false });
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), { ssr: false });
const FallingFlowers = dynamic(() => import("./components/FallingFlowers"), { ssr: false });
const ClickBurst = dynamic(() => import("./components/ClickBurst"), { ssr: false });
const DynamicHead = dynamic(() => import("./components/DynamicHead"), { ssr: false });
const AnalyticsWrapper = dynamic(() => import("./components/analytics-wrapper"), { ssr: false });

const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400" }],
  variable: "--font-miso",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <body>

        {/* Loads SEO head dynamically - client safe */}
        <DynamicHead />

        {/* Page loader wrapper */}
        <PageLoader>
          <FallingFlowers />
          {children}
        </PageLoader>

        <ScrollToTop />
        <ClickBurst burstImage="/images/star.png" />

        {/* LOAD ANALYTICS LAST (Best for speed) */}
        <AnalyticsWrapper />

      </body>
    </html>
  );
}
