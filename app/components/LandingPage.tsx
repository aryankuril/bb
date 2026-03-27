"use client";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Firstsection from "./HomePage/Firstsection";
import Footer from "./Footer";
import Taxi from "./Taxi";
import SmoothScroll from "./SmoothScroll";  

// Lazy load EVERYTHING below fold
const SecondSection = dynamic(() => import("./HomePage/SecondSection"), { ssr: false });
const ThirdSection = dynamic(() => import("./HomePage/ThirdSection"), { ssr: false });
const WorkCard = dynamic(() => import("./HomePage/WorkCard"), { ssr: false });
const StudioSection = dynamic(() => import("./HomePage/StudioSection"), { ssr: false });
const PerformanceROI = dynamic(() => import("./HomePage/PerformanceROI"), { ssr: false });
const BombAISection = dynamic(() => import("./HomePage/BombAISection"), { ssr: false });
const RubberSection = dynamic(() => import("./HomePage/RubberSection"), { ssr: false });
const CardCarousel = dynamic(() => import("./HomePage/CardCarousel"), { ssr: false });
const SeventhSection = dynamic(() => import("./ServicesInternal/WebsiteDesign/SeventhSection"), { ssr: false });


export default function Home() {
  return (
    <>
     <SmoothScroll>
      <Navbar />
      <Firstsection />

      <SecondSection />
      <ThirdSection />
      <WorkCard />
      <StudioSection />
      <PerformanceROI />
      <BombAISection />
      <RubberSection />
      <CardCarousel />
      <SeventhSection />

      <Taxi/>
      <Footer />

      </SmoothScroll>
    </>
  );
}