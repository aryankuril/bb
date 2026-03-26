
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import AnimatedEffects from "./components/AnimatedEffects";
import AnalyticsWrapper from "./components/analytics-wrapper";


const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400" }],
  variable: "--font-miso",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Bombay Blokes",
  description:
    "Mumbai’s leading Digital Marketing Agency | Bombay Blokes. Customized and result-driven digital solutions.",
  openGraph: {
    title: "Bombay Blokes",
    description:
      "Mumbai’s leading Digital Marketing Agency | Bombay Blokes.",
    url: "https://bombayblokes.com",
    siteName: "Bombay Blokes",
    images: [
      {
        url: "https://blokesarea.com/wp-content/uploads/favicon.png", // IMPORTANT
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
       <head>
        
        <meta name="google-site-verification" content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw" />
        <link rel="icon" href="images/favicon.png" type="image/png" />
      </head>
      <body>

        <AnimatedEffects>
          {children}
        </AnimatedEffects>


        {/* LOAD ANALYTICS LAST (Best for speed) */}
        <AnalyticsWrapper />

      </body>
    </html>
  );
}
