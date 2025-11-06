

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import PageLoader from "./components/PageLoader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import DynamicHead from "./components/DynamicHead";
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
         <DynamicHead />
        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq) return;
              n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n;
              n.push=n; n.loaded=!0; n.version='2.0';
              n.queue=[]; t=b.createElement(e); t.async=!0;
              t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '640480087760334');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=640480087760334&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics */}
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

        {/* LinkedIn Insight */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7775762";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l) {
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=7775762&fmt=gif"
          />
        </noscript>

        {/* App Content */}
        {/* <SmoothScroll> */}
          <PageLoader>
           {children}
          </PageLoader>
          <ScrollToTop />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
