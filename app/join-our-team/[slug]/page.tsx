import React from "react";
import Navbar from "@/app/components/Navbar";
import Firstsection from "@/app/components/Career/Firstsection";
import SecondSectionId from "@/app/components/Career/SecondSectionId";
import ThirdSection from "@/app/components/Career/ThirdSection";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "@/app/components/Footer";
import Taxi from "@/app/components/Taxi";
import SmoothScroll from "@/app/components/SmoothScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing careers in Mumbai",
  description:
    "Looking for Jobs and an opportunity in the field of digital marketing? Contact us to know more. ",
};

const Index = () => {
  return (
    <div>
      <SmoothScroll>
        <Taxi />
        <Navbar />
        <Firstsection />
        <SecondSectionId  />
        <ThirdSection />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Index;
