import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/GEO/FirstSection";
// import SecondSection from "../components/ServicesInternal/GEO/SecondSection";
import ThirdSection from "../../components/ServicesInternal/GEO/ThirdSection";
import FourthSection from "../../components/ServicesInternal/GEO/FourthSection";
import FifthSection from "../../components/ServicesInternal/GEO/FifthSection";
import SixthSection from "../../components/ServicesInternal/GEO/SixthSection";
import SeventhSection from "../../components/ServicesInternal/GEO/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';

export const metadata: Metadata = {
  title: "Best GEO Agency in Mumbai | Bombay Blokes",
  description: "Looking to elevate your website traffic organically? Bombay Blokes, a leading GEO agency in Mumbai, offers comprehensive GEO services to help your business rank higher and grow faster.",
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