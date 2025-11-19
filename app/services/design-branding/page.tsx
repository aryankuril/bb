import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/Design-Branding/FirstSection";
// import SecondSection from "../components/ServicesInternal/Design-Branding/SecondSection";
import ThirdSection from "../../components/ServicesInternal/Design-Branding/ThirdSection";
import FourthSection from "../../components/ServicesInternal/Design-Branding/FourthSection";
import FifthSection from "../../components/ServicesInternal/Design-Branding/FifthSection";
import SixthSection from "../../components/ServicesInternal/WebsiteDesign/SixthSection";
import SeventhSection from "../../components/ServicesInternal/Design-Branding/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';

export const metadata: Metadata = {
  title: "Branding & Design Agency in Mumbai | Bombay Blokes",
  description: "Build a brand that stands out. Bombay Blokes offers creative design & branding services in Mumbai — from logo design to full brand identity strategy that drives recognition & trust.",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       {/* <MobilePopup/> */}
      <SmoothScroll>
      <Taxi/>
      <Navbar />
      <FirstSection />
      {/* <SecondSection /> */}
      <FourthSection />
      <ThirdSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index