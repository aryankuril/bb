// app/layout.tsx
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


export const metadata: Metadata = {
  title: "My Project",
  description: "Agency Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
