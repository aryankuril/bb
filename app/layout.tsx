

import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "./components/ClientProviders";
import PageLoader from "./components/PageLoader";

const miso = localFont({
  src: [{ path: "../public/fonts/VAG-Regular2.otf", weight: "400" }],
  variable: "--font-miso",
});

import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import Script from "next/script";

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
    <html lang="en" className={miso.variable}>
<head>


<Script
  id="google-tag-manager"
  strategy="afterInteractive"
>
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KXDJ77M');
  `}
</Script>


  <meta
    name="google-site-verification"
    content="vcgYWAz5xbO_xhFBzKSTAJuBzaum2orDl7K2CaoMTPw"
  />

  <link
    rel="icon"
    href="/images/favicon.png"
    type="image/png"
  />

  <link
    rel="preload"
    as="image"
    href="/images/video-poster-mobile.png"
    media="(max-width: 768px)"
  />

  <link
    rel="preload"
    as="image"
    href="/images/video-poster-desktop.png"
    media="(min-width: 769px)"
  />
</head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXDJ77M"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        <SmoothScroll>
          <PageLoader>
            {children}
          </PageLoader>
        </SmoothScroll>

        <ClientProviders />

      </body>
    </html>
  );
}
