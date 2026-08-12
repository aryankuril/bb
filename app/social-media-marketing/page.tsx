"use client";

import { SiteNav } from "@/app/components/ADS/src/components/social-media/site-nav";
import { Hero } from "@/app/components/ADS/src/components/social-media/hero";
import  LogoMarquee  from "@/app/components/ADS/src/components/landing/LogoMarquee";
import { Services } from "@/app/components/ADS/src/components/social-media/services";
import { CaseStudies } from "@/app/components/ADS/src/components/social-media/case-studies";
import { WhyUs } from "@/app/components/ADS/src/components/social-media/why-us";
import { Process } from "@/app/components/ADS/src/components/social-media/process";
import { Testimonials } from "@/app/components/ADS/src/components/social-media/testimonials";
import { Faq } from "@/app/components/ADS/src/components/social-media/faq";
import { FinalCta, Footer } from "@/app/components/ADS/src/components/social-media/final-cta";

import "./lovable-compiled.css";

const Index = () => {
  return (
    <main className="lovable-page">
      <SiteNav />
      <Hero />
      <LogoMarquee />
      <Services />
      <CaseStudies />
      <WhyUs />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

export default Index
