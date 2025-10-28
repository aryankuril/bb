import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/Design-Branding/FirstSection";
// import SecondSection from "../components/ServicesInternal/Design-Branding/SecondSection";
import ThirdSection from "../../components/ServicesInternal/Design-Branding/ThirdSection";
import FourthSection from "../../components/ServicesInternal/Design-Branding/FourthSection";
import FifthSection from "../../components/ServicesInternal/Design-Branding/FifthSection";
import SixthSection from "../../components/ServicesInternal/Design-Branding/SixthSection";
import SeventhSection from "../../components/ServicesInternal/Design-Branding/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";


export const metadata: Metadata = {
  title: "Best Design-Branding Agency in Mumbai | Bombay Blokes",
  description: "Looking to elevate your website traffic organically? Bombay Blokes, a leading Design-Branding agency in Mumbai, offers comprehensive Design-Branding services to help your business rank higher and grow faster.",
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