
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Firstsection from "./components/HomePage/Firstsection";
import SecondSection from "./components/HomePage/SecondSection";
import StudioSection from "./components/HomePage/StudioSection"
import ThirdSection from "./components/HomePage/ThirdSection";
import WorkCard from "./components/HomePage/WorkCard";
import PerformanceROI from "./components/HomePage/PerformanceROI"
import BombAISection from "./components/HomePage/BombAISection";
import RubberSection from "./components/HomePage/RubberSection";
import CardCarousel from "./components/HomePage/CardCarousel";
import SixthSection from "./components/ServicesInternal/WebsiteDesign/SixthSection";
import SeventhSection from "./components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "./components/Footer";
import Taxi from "./components/Taxi";
import MobilePopup from "./components/MobilePopup";
// import ClientScripts from "./components/ClientScripts";
import SmoothScroll from "./components/SmoothScroll";
export const metadata: Metadata = {
  title: "Mumbai’s leading Digital Marketing Agency | Bombay Blokes",
  description: "Looking for a Digital Marketing agency in Mumbai? Want a partner that's dedicated to your success? Choose Bombay Blokes for customized and result-driven Digital Solutions. Visit us now!",
};

export default function Home() {
  return (
    <div>
       <SmoothScroll>
      {/* <ClientScripts/> */}
      <Taxi/>
      {/* <MobilePopup/> */}
      <Navbar />
      <Firstsection/>
      <SecondSection/>
      <ThirdSection/>
      <WorkCard />
      <StudioSection/>
      <PerformanceROI/>
      <BombAISection/>
      <RubberSection/>
      <CardCarousel/>
      <SixthSection/>
      <SeventhSection/>
      <Footer />
      </SmoothScroll>
    </div>
    
  );
}
