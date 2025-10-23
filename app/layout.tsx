import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Taxi from "./components/Taxi";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import FloatingIcons from "./components/FloatingIcons";
// import Whatsapp from "./components/Whatsapp";
// import ClientScripts from "./components/ClientScripts";
import SmoothScroll from "./components/SmoothScroll";
import MobilePopup from "./components/MobilePopup";

// Local Miso
const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400", style: "normal" }],
  variable: "--font-miso",
});

// Google Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bombay Blokes",
  description:
    "Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes",
  // icons: {
  //   icon: "/favicon.png",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <head>
        <meta name="google-site-verification" content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw" />
        <link rel="icon" href="images/favicon.png" type="image/png" />
      </head>

      {/* ✅ Add Google Analytics safely using next/script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E86THEZTKX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E86THEZTKX');
        `}
      </Script>

      <body>
        <SmoothScroll>
          <PageLoader>
            {children}
            {/* <Taxi /> */}
            {/* <MobilePopup /> */}
          </PageLoader>
          <ScrollToTop />
          {/* <FloatingIcons /> */}
          {/* <Whatsapp /> */}
        </SmoothScroll>
      </body>
    </html>
  );
}
 