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