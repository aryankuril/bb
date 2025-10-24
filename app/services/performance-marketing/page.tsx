import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/PerformanceMaketing/FirstSection";
// import SecondSection from "../components/ServicesInternal/PerformanceMaketing/SecondSection";
import ThirdSection from "../../components/ServicesInternal/PerformanceMaketing/ThirdSection";
import FourthSection from "../../components/ServicesInternal/PerformanceMaketing/FourthSection";
import FifthSection from "../../components/ServicesInternal/PerformanceMaketing/FifthSection";
import SixthSection from "../../components/ServicesInternal/PerformanceMaketing/SixthSection";
import SeventhSection from "../../components/ServicesInternal/PerformanceMaketing/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";


// ✅ Page-specific meta
export const metadata: Metadata = {
  title: "Best Performance Marketing Agency in Mumbai | Bombay Blokes",
  description: "A trusted digital agency for ROI-focused performance marketing. Our tailored strategies are designed to maximize your ROI by boosting clicks, generating leads, and driving sales through data-backed campaigns. Start growing your business today!",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
       <MobilePopup/>
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