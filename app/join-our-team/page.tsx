import React from "react";
import Navbar from "../components/Navbar";
import Firstsection from "@/app/components/Career/Firstsection";
import SecondSection from "../components/Career/SecondSection";
import ThirdSection from "../components/Career/ThirdSection";
import SeventhSection from "../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../components/Footer";
import Taxi from "../components/Taxi";
import SmoothScroll from "../components/SmoothScroll";
import { Metadata } from "next";
import { getCareerCategories, getPublishedCareers } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Digital Marketing careers in Mumbai",
  description:
    "Looking for Jobs and an opportunity in the field of digital marketing? Contact us to know more. ",
};

export default async function JoinOurTeamPage() {
  const [initialCategories, initialJobs] = await Promise.all([
    getCareerCategories(),
    getPublishedCareers(),
  ]);

  return (
    <div>
      <SmoothScroll>
        <Taxi />
        <Navbar />
        <Firstsection />
        <SecondSection
          initialCategories={initialCategories}
          initialJobs={initialJobs}
        />
        <ThirdSection />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
}
