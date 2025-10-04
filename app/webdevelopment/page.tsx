import Navbar from "../components/Navbar";
import FirstSection from "../components/ServicesInternal/FirstSection";
import SecondSection from "../components/ServicesInternal/SecondSection";
import ThirdSection from "../components/ServicesInternal/ThirdSection";
import FourthSection from "../components/ServicesInternal/FourthSection";
import FifthSection from "../components/ServicesInternal/FifthSection";
import SixthSection from "../components/ServicesInternal/SixthSection";
import SeventhSection from "../components/ServicesInternal/SeventhSection";
import Footer from "../components/Footer";
import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
      <ClientScripts/>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <Footer />
    </div>
  )
}

export default Index