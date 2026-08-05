import React from "react";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import Firstsection from "./FirstSection";
import PreviewPage from "./PreviewPage";
import SeventhSection from "./SeventhSection";
import Footer from "../components/Footer";
import AdsStatsSection from "./AdsStatsSection";
import AdsLogoSection from "./AdsLogoSection";
import AdsWorkSection from "./AdsWorkSection";
import AdsTestimonialsSection from "./AdsTestimonialsSection";
import AboutUs from "./AboutUs";
import Problems from "./Problems";
import CaseStudies from "./CaseStudies";
import ProcessCombined from "./ProcessCombined";
import AdsFAQSection from "./AdsFAQSection";
import AdsLandingPage from "../components/ADS";
import SmoothScroll from "../components/SmoothScroll";
import { getDepartmentConfig } from "./departmentConfig";
import PaidMarketingPage from "./PaidMarketingPage";

type RouteProps = {
  department: string;
  initialQuestions: unknown[];
  initialCustomFields: unknown[];
};

const Route = ({
  department,
  initialQuestions,
  initialCustomFields,
}: RouteProps) => {
  const config = getDepartmentConfig(department);

  if (!config) {
    notFound();
  }



  
  return (
    <div>
      <SmoothScroll>
        <Navbar />
        <Firstsection department={department} />
        <PreviewPage
          department={department}
          initialQuestions={initialQuestions}
          initialCustomFields={initialCustomFields}
        />

        {department === "website-development" ? (
          <AdsLandingPage pageKey="/website-development" />
        ) : department === "paid-marketing" ? (
          <PaidMarketingPage />
        ) : (
          <>
            <AdsStatsSection content={config.stats} />
            <AdsLogoSection />

            <AboutUs />
            <Problems />
            <AdsWorkSection content={config.work} />
            <AdsTestimonialsSection />
            <ProcessCombined />
            <AdsFAQSection content={config.faq} />
            <SeventhSection />
            <Footer />
          </>
        )}
      </SmoothScroll>
    </div>
  );
};

export default Route;
