import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/WebsiteDesign/FirstSection";
// import SecondSection from "../components/ServicesInternal/WebsiteDesign/SecondSection";
import ThirdSection from "../../components/ServicesInternal/WebsiteDesign/ThirdSection";
import FourthSection from "../../components/ServicesInternal/WebsiteDesign/FourthSection";
import FifthSection from "../../components/ServicesInternal/WebsiteDesign/FifthSection";
import SixthSection from "../../components/ServicesInternal/WebsiteDesign/SixthSection";
import SeventhSection from "../../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";


export const metadata: Metadata = {
  title: "Website Development Company in Mumbai | Custom, Shopify, WordPress, and more.",
  description: "Transform your online presence with Bombay Blokes, Mumbai’s best website development company. We design fast, responsive, and conversion-focused designs that leave an impact. Book Your Free Consultation Now.",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       {/* <MobilePopup/> */}
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
    </div>
  )
}

export default Index