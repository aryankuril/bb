import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/PerformanceMarketing/FirstSection";
// import SecondSection from "../components/ServicesInternal/PerformanceMaketing/SecondSection";
import ThirdSection from "../../components/ServicesInternal/PerformanceMarketing/ThirdSection";
import FourthSection from "../../components/ServicesInternal/PerformanceMarketing/FourthSection";
import WorkCard from '@/app/components/HomePage/WorkCard';
import Testimonials from "@/app/components/Testimonials";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';
export const metadata: Metadata = {
  title: "Best Performance Marketing Agency in Mumbai | Bombay Blokes",
  description: "A trusted digital agency for ROI-focused performance marketing. Our tailored strategies are designed to maximize your ROI by boosting clicks, generating leads, and driving sales through data-backed campaigns. Start growing your business today!",
};

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}

      <SmoothScroll> 
      <Taxi/>
       {/* <MobilePopup/> */}
      <Navbar />
      <FirstSection />
      {/* <SecondSection /> */}
      <FourthSection />
      <ThirdSection />
      <WorkCard/>
      <Testimonials />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index