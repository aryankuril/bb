import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import PageLoader from "./components/PageLoader";
import FallingFlowers from "./components/FallingFlowers";
import ScrollToTop from "./components/ScrollToTop";
import ClickBurst from "./components/ClickBurst";
import AnalyticsScripts from "./components/AnalyticsScripts";

const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400", style: "normal" }],
  variable: "--font-miso",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bombay Blokes",
  description:
    "Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw"
        />
        <link rel="icon" href="images/favicon.png" type="image/png" />
      </head>

      <body>


  <PageLoader>
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
