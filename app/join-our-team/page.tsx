import React from "react";
import Navbar from "../components/Navbar";
import Firstsection from "@/app/components/Career/Firstsection";
import SecondSection from "../components/Career/SecondSection";
import ThirdSection from "../components/Career/ThirdSection";
// import RubberSection from '../components/HomePage/RubberSection'

import SeventhSection from "../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from "../components/Taxi";
import SmoothScroll from "../components/SmoothScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing careers in Mumbai",
  description:
    "Looking for Jobs and an opportunity in the field of digital marketing? Contact us to know more. ",
};

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}

      <SmoothScroll>
        <Taxi />

        <Navbar />
        <Firstsection />
        <SecondSection />
        {/* <RubberSection/> */}
        <ThirdSection />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Index;
