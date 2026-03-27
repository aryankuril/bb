

import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "./components/ClientProviders";


const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400" }],
  variable: "--font-miso",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
}); 

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mumbai’s leading Digital Marketing Agency | Bombay Blokes",
  description: "Looking for a Digital Marketing agency in Mumbai? Want a partner that's dedicated to your success? Choose Bombay Blokes for customized and result-driven Digital Solutions. Visit us now!",
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
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
       <head>

        
        <meta name="google-site-verification" content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw" />
        <link rel="icon" href="images/favicon.png" type="image/png" />

        <link rel="preload" as="image" href="/images/video-poster-mobile.png" media="(max-width: 768px)" />
<link rel="preload" as="image" href="/images/video-poster-desktop.png" media="(min-width: 769px)" />
      </head>
      <body>

     
          {children}


        <ClientProviders />

      </body>
    </html>
  );
}
