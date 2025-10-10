import Navbar from "../components/Navbar";
import FirstSection from "../components/ServicesInternal/WebsiteDesign/FirstSection";
// import SecondSection from "../components/ServicesInternal/WebsiteDesign/SecondSection";
import ThirdSection from "../components/ServicesInternal/WebsiteDesign/ThirdSection";
import FourthSection from "../components/ServicesInternal/WebsiteDesign/FourthSection";
import FifthSection from "../components/ServicesInternal/WebsiteDesign/FifthSection";
import SixthSection from "../components/ServicesInternal/WebsiteDesign/SixthSection";
import SeventhSection from "../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../components/Footer";
import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
      <ClientScripts/>
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