import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/GEO/FirstSection";
// import SecondSection from "../components/ServicesInternal/GEO/SecondSection";
import ThirdSection from "../../components/ServicesInternal/GEO/ThirdSection";
import FourthSection from "../../components/ServicesInternal/GEO/FourthSection";
import WorkCard from '@/app/components/HomePage/WorkCard';
import Testimonials from "@/app/components/Testimonials";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';

export const metadata: Metadata = {
  title: "Local SEO & Geo Targeting Services | Bombay Blokes",
  description: "Dominate local search results with Bombay Blokes’ Geo Marketing Services. From Google Maps optimization to hyperlocal SEO — we help customers find you first.",
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
      <WorkCard/>
      <Testimonials />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index