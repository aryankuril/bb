import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/app/components/ADS/src/components/landing/SiteNav";
import { Hero } from "@/app/components/ADS/src/components/landing/Hero";
import LogoMarquee from "@/app/components/ADS/src/components/landing/LogoMarquee";
import { Services } from "@/app/components/ADS/src/components/landing/Services";
import { CaseStudies } from "@/app/components/ADS/src/components/landing/CaseStudies";
import { WhyUs } from "@/app/components/ADS/src/components/landing/WhyUs";
import { Process } from "@/app/components/ADS/src/components/landing/Process";
import { Testimonials } from "@/app/components/ADS/src/components/landing/Testimonials";
import { FAQ } from "@/app/components/ADS/src/components/landing/FAQ";
import { FinalCTA, Footer } from "@/app/components/ADS/src/components/landing/FinalCTA";

const title = "Performance Marketing Agency in Mumbai | Bombay Blokes";
const description =
  "Bombay Blokes is a performance marketing agency in Mumbai running ROAS-focused Google Ads and Meta Ads. ₹20Cr+ ad spend managed, 4X average ROAS. Get a free audit.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Bombay Blokes",
          description,
          areaServed: "Mumbai, India",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "150",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <SiteNav />

      <Hero />
      <LogoMarquee />
      <Services />
      <CaseStudies />
      <WhyUs />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
