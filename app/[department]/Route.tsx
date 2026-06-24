"use client";
import React from 'react'
import Navbar from '../components/Navbar';
import Firstsection from './FirstSection';
import PreviewPage from "./PreviewPage";
import SeventhSection from './SeventhSection';
import Footer from '../components/Footer'

import { notFound } from "next/navigation";
import AdsHeroSection from "./AdsHeroSection";
import AdsWhySection from "./AdsWhySection";
import AdsStatsSection from "./AdsStatsSection";
import AdsLogoSection from "./AdsLogoSection";
import AdsWorkSection from "./AdsWorkSection";
import AdsWorkflowSection from "./AdsWorkflowSection";
import AdsFAQSection from "./AdsFAQSection";
import Testimonials from "../components/Testimonials";
import Taxi from "../components/Taxi";
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

        <AdsStatsSection content={config.stats} />
        <AdsLogoSection content={config.logos} />
        <AdsWorkSection content={config.work} />
        <Testimonials />
        <AdsWorkflowSection content={config.workflow} />
        <AdsFAQSection content={config.faq} />
<SeventhSection/>
  <Footer />
  </SmoothScroll>
    </div>
  )
}

export default Route








