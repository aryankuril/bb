

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import DynamicHead from "./components/DynamicHead";
import ClickBurst from "./components/ClickBurst";
import FallingFlowers from "./components/FallingFlowers";

// Local Miso font
const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400", style: "normal" }],
  variable: "--font-miso",
});

// Google Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bombay Blokes ",
  description:
    "Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <head>
        
        <meta name="google-site-verification" content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw" />
        <link rel="icon" href="images/favicon.png" type="image/png" />
      </head>

      <body>
        
        {/* App Content */}

          <PageLoader>
            <FallingFlowers />
           {children}
          </PageLoader>
          <ScrollToTop />

          <ClickBurst burstImage="/images/star.png" />


      </body>
    </html>
  );
}
