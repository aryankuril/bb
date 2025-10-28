import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/PerformanceMarketing/FirstSection";
// import SecondSection from "../components/ServicesInternal/PerformanceMaketing/SecondSection";
import ThirdSection from "../../components/ServicesInternal/PerformanceMarketing/ThirdSection";
import FourthSection from "../../components/ServicesInternal/PerformanceMarketing/FourthSection";
import FifthSection from "../../components/ServicesInternal/PerformanceMarketing/FifthSection";
import SixthSection from "../../components/ServicesInternal/PerformanceMarketing/SixthSection";
import SeventhSection from "../../components/ServicesInternal/PerformanceMarketing/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";


export const metadata: Metadata = {
  title: "Best Performance Marketing Agency in Mumbai | Bombay Blokes",
  description: "A trusted digital agency for ROI-focused performance marketing. Our tailored strategies are designed to maximize your ROI by boosting clicks, generating leads, and driving sales through data-backed campaigns. Start growing your business today!",
};

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
       {/* <MobilePopup/> */}
      <Navbar />
      <FirstSection />
      {/* <SecondSection /> */}
      <FourthSection />
      <ThirdSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <Footer />
    </div>
  )
}

export default Index