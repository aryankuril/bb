import React from "react";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import AdsHeroSection from "../components/ads-specific-page/AdsHeroSection";
import AdsWhySection from "../components/ads-specific-page/AdsWhySection";
import AdsStatsSection from "../components/ads-specific-page/AdsStatsSection";
import AdsLogoSection from "../components/ads-specific-page/AdsLogoSection";
import AdsWorkSection from "../components/ads-specific-page/AdsWorkSection";
import AdsWorkflowSection from "../components/ads-specific-page/AdsWorkflowSection";
import AdsFAQSection from "../components/ads-specific-page/AdsFAQSection";
import Testimonials from "../components/Testimonials";
import SeventhSection from "../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../components/Footer";
import Taxi from "../components/Taxi";
import SmoothScroll from "../components/SmoothScroll";
import { getDepartmentConfig } from "./departmentConfig";

type PreviewProps = {
  department: string;
};

const Preview = ({ department }: PreviewProps) => {
  const config = getDepartmentConfig(department);

  if (!config) {
    notFound();
  }

  return (
    <div>
      <SmoothScroll>
        <Taxi />
        <Navbar />
        <AdsHeroSection content={config.hero} />
        <AdsWhySection text={config.whyText} />
        <AdsStatsSection content={config.stats} />
        <AdsLogoSection content={config.logos} />
        <AdsWorkSection content={config.work} />
        <Testimonials />
        <AdsWorkflowSection content={config.workflow} />
        <AdsFAQSection content={config.faq} />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Preview;
