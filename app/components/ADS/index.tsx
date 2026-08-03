
import Navbar from "@/app/components/Navbar";
import Hero from "./Hero/Hero";
import TrustedBy from "./TrustedBy/TrustedBy";
import Services from "./Services/Services";
import WhyBombayBlokes from "./WhyBombayBlokes/WhyBombayBlokes";
import Process from "./Process/Process";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Industries from "./Industries/Industries";
import Results from "./Results/Results";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./FAQ/FAQ";
import CTA from "./CTA/CTA";
import ContactForm from "./Contact/ContactForm";
import FooterCTA from "./FooterCTA/FooterCTA";
import StickyMobileCTA from "./common/StickyMobileCTA";
import { stickyCTA } from "./data";

type AdsLandingPageProps = {
  pageKey?: string;
};

export default function AdsLandingPage({ pageKey }: AdsLandingPageProps) {
  return (
    <main className="pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <WhyBombayBlokes pageKey={pageKey} />
      <Process />
      <WhyChooseUs />
      <Industries />
      <Results />
      <Testimonials />
      <FAQ />
      <CTA />
      <ContactForm />
      <FooterCTA />
      <StickyMobileCTA content={stickyCTA} />
    </main>
  );
}

export { Hero, TrustedBy, Services, WhyBombayBlokes, Process, WhyChooseUs, Industries, Results, Testimonials, FAQ, CTA, ContactForm, FooterCTA };
export * from "./data";
export * from "./types";
