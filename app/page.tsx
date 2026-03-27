
import LandingPage from "./components/LandingPage";

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
export default function Home() {
  return (
    <div>

      <LandingPage/>
      
    </div>
    
  );
}
