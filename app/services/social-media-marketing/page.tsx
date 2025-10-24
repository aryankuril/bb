import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/ServicesInternal/SocialMedia/FirstSection";
// import SecondSection from "../components/ServicesInternal/SocialMedia/SecondSection";
import ThirdSection from "../../components/ServicesInternal/SocialMedia/ThirdSection";
import FourthSection from "../../components/ServicesInternal/SocialMedia/FourthSection";
import FifthSection from "../../components/ServicesInternal/SocialMedia/FifthSection";
import SixthSection from "../../components/ServicesInternal/SocialMedia/SixthSection";
import SeventhSection from "../../components/ServicesInternal/SocialMedia/SeventhSection";
import Footer from "../../components/Footer";
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";


export const metadata: Metadata = {
  title: " Dominate Social Media with Strategies That Spark Engagement",
  description: "Elevate your brand with social media marketing that captivates and converts. Explore creative campaigns that get noticed!",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       <MobilePopup/>
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