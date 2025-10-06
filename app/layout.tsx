import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css"; // ✅ contains MisoFixed @font-face fix
import Taxi from "./components/Taxi";
import Whatsapp from "./components/Whatsapp";
import ClientScripts from "./components/ClientScripts";

// ✅ Only load Poppins here
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bombay Blokes",
  description:
    "Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />

        {/* ✅ Preload your single Miso font for better performance */}
        <link
          rel="preload"
          href="/fonts/miso-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        {children}
        <Taxi />
        <Whatsapp />
        <ClientScripts />
      </body>
    </html>
  );
}