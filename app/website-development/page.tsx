import AdsLandingPage from "../components/ADS";
import { landingPageMeta } from "../components/ADS/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: landingPageMeta.title,
  description: landingPageMeta.description,
};

export default function Page() {
  return <AdsLandingPage pageKey="/website-development" />;
}
