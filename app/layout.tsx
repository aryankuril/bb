// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import AnalyticsScripts from "./components/AnalyticsScripts";

const PageLoader = dynamic(() => import("./components/PageLoader"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false,
});
const FallingFlowers = dynamic(() => import("./components/FallingFlowers"), {
  ssr: false,
});
const ClickBurst = dynamic(() => import("./components/ClickBurst"), {
  ssr: false,
});
const DynamicHead = dynamic(() => import("./components/DynamicHead"), {
  ssr: false,
});

// Local fonts
const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400" }],
  variable: "--font-miso",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bombay Blokes",
  description: "Integrated Digital Solutions in Mumbai - Bombay Blokes",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <body>
        <DynamicHead />

        <PageLoader>
          {/* Lazy animation components - load only when visible */}
          <FallingFlowers />
          {children}
        </PageLoader>

        <ScrollToTop />
        <ClickBurst burstImage="/images/star.png" />

        {/* Load analytics LAST (non-blocking) */}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
