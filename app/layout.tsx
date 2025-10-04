// app/layout.tsx
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Taxi from "./components/Taxi";
import Whatsapp from "./components/Whatsapp";

// Local Miso
const miso = localFont({
  src: [{ path: "../public/fonts/miso-regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-miso",
});

// Google Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add what you need
  variable: "--font-poppins",
});


// export const metadata: Metadata = {
//   title: "My Project",
//   description: "Agency Website",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // Higher = slower + smoother
      easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing
      lerp: 0.05, // Lower = smoother but slower catch-up
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <body>
        {children}
        <Taxi />
        <Whatsapp />
      </body>
    </html>
  );
}
