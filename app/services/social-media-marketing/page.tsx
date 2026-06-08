import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/SocialMedia/FirstSection";
// import SecondSection from "../components/ServicesInternal/SocialMedia/SecondSection";
import ThirdSection from "../../components/ServicesInternal/SocialMedia/ThirdSection";
import FourthSection from "../../components/ServicesInternal/SocialMedia/FourthSection";
import SecondSection from '@/app/components/OurWork/SecondSection'
import WorkCard from '@/app/components/HomePage/WorkCard';
// import Testimonials from "@/app/components/Testimonials";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "../../components/MobilePopup";
import SmoothScroll from '../../components/SmoothScroll';

export const metadata: Metadata = {
  title: " Dominate Social Media with Strategies That Spark Engagement",
  description: "Elevate your brand with social media marketing that captivates and converts. Explore creative campaigns that get noticed!",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      {/* all good */}
       {/* <MobilePopup/> */}

      <SmoothScroll>
      <Taxi/>
      <Navbar />
      <FirstSection />
      {/* <SecondSection /> */}
      <FourthSection />
      <ThirdSection />
      {/* <WorkCard/> */}
      <SecondSection />
      {/* <Testimonials /> */}
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index