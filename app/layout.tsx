"use client";

import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Dynamic Components (Client-only)
const AnimatedEffects = dynamic(() => import("./components/AnimatedEffects"), { ssr: false });


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
       <head>
        
        <meta name="google-site-verification" content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw" />
        <link rel="icon" href="images/favicon.png" type="image/png" />
      </head>
      <body>

        <AnimatedEffects>
          {children}
        </AnimatedEffects>


        {/* LOAD ANALYTICS LAST (Best for speed) */}
        {/* <AnalyticsWrapper /> */}

      </body>
    </html>
  );
}
