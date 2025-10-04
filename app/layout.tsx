import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientScripts from "./components/ClientScripts"; // NEW

// Local Miso
const miso = localFont({
  src: [{ path: "../public/fonts/miso-regular.ttf", weight: "400", style: "normal" }],
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
  description: "Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes",
  icons: {
    icon: "/favicon.png", // This will be used as the favicon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <body>
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}
