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

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
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