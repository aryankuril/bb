"use client";
import React from 'react'
import Navbar from '../components/Navbar';
import Firstsection from './FirstSection';
import PreviewPage from "./PreviewPage";
import SeventhSection from './SeventhSection';
import Footer from '../components/Footer'

import { notFound } from "next/navigation";
import AdsStatsSection from "./AdsStatsSection";
import AdsLogoSection from "./AdsLogoSection";
import AdsWorkSection from "./AdsWorkSection";
import AdsTestimonialsSection from './AdsTestimonialsSection';
import AboutUs from './AboutUs';
import Problems from './Problems';
import CaseStudies from './CaseStudies';
import ProcessCombined from './ProcessCombined'
import AdsFAQSection from "./AdsFAQSection";
import AdsLandingPage from "../components/ADS";
import SmoothScroll from "../components/SmoothScroll";
import { getDepartmentConfig } from "./departmentConfig";



import { usePathname } from "next/navigation";

const Route = () => {
  const pathname = usePathname();

  const department = pathname.replace("/", "");
const config = getDepartmentConfig(department);

if (!config) {
  notFound();
}

  return (
    <div>
      <SmoothScroll>

              <Navbar/>
<Firstsection/>
<PreviewPage/>

       {department === "website-development" ? (
         <AdsLandingPage pageKey="/website-development" />
       ) : (
         <>
           <AdsStatsSection content={config.stats} />
           <AdsLogoSection />
           {pathname === "/paid-marketing" && (
             <CaseStudies />
           )}

           <AboutUs />
           <Problems />
           <AdsWorkSection content={config.work} />
           <AdsTestimonialsSection />
           <ProcessCombined />
           {/* <AdsWorkflowSection content={config.workflow} /> */}
           <AdsFAQSection content={config.faq} />
           <SeventhSection />
           <Footer />
         </>
       )}

 </SmoothScroll>
    </div>
  )
}

export default Route
