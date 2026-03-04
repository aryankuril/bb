import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/SEO/FirstSection";
// import SecondSection from "../components/ServicesInternal/SEO/SecondSection";
import ThirdSection from "../../components/ServicesInternal/SEO/ThirdSection";
import FourthSection from "../../components/ServicesInternal/SEO/FourthSection";
import WorkCard from '@/app/components/HomePage/WorkCard';
// import Testimonials from "@/app/components/Testimonials";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';

export const metadata: Metadata = {
  title: "Best SEO Agency in Mumbai | Bombay Blokes",
  description: "Looking to elevate your website traffic organically? Bombay Blokes, a leading SEO agency in Mumbai, offers comprehensive SEO services to help your business rank higher and grow faster.",
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
      {/* <Testimonials /> */}
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index