import Navbar from "../components/Navbar";
import FirstSection from "../components/ServicesInternal/SEO/FirstSection";
// import SecondSection from "../components/ServicesInternal/SEO/SecondSection";
import ThirdSection from "../components/ServicesInternal/SEO/ThirdSection";
import FourthSection from "../components/ServicesInternal/SEO/FourthSection";
import FifthSection from "../components/ServicesInternal/SEO/FifthSection";
import SixthSection from "../components/ServicesInternal/SEO/SixthSection";
import SeventhSection from "../components/ServicesInternal/SEO/SeventhSection";
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