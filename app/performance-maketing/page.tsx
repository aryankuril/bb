import Navbar from "../components/Navbar";
import FirstSection from "../components/ServicesInternal/PerformanceMaketing/FirstSection";
// import SecondSection from "../components/ServicesInternal/PerformanceMaketing/SecondSection";
import ThirdSection from "../components/ServicesInternal/PerformanceMaketing/ThirdSection";
import FourthSection from "../components/ServicesInternal/PerformanceMaketing/FourthSection";
import FifthSection from "../components/ServicesInternal/PerformanceMaketing/FifthSection";
import SixthSection from "../components/ServicesInternal/PerformanceMaketing/SixthSection";
import SeventhSection from "../components/ServicesInternal/PerformanceMaketing/SeventhSection";
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