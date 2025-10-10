
import Navbar from "./components/Navbar";
import Firstsection from "./components/HomePage/Firstsection";
import SecondSection from "./components/HomePage/SecondSection";
import StudioSection from "./components/HomePage/StudioSection"
import ThirdSection from "./components/HomePage/ThirdSection";
import WorkCard from "./components/HomePage/WorkCard";
import PerformanceROI from "./components/HomePage/PerformanceROI"
import BombAISection from "./components/HomePage/BombAISection";
import RubberSection from "./components/HomePage/RubberSection";
import CardCarousel from "./components/HomePage/CardCarousel";
import SixthSection from "./components/ServicesInternal/WebsiteDesign/SixthSection";
import SeventhSection from "./components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "./components/Footer";
// import ClientScripts from "./components/ClientScripts";



export default function Home() {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Navbar />
      <Firstsection/>
      <SecondSection/>
      <ThirdSection/>
      <WorkCard />
      <StudioSection/>
      <PerformanceROI/>
      <BombAISection/>
      <RubberSection/>
      <CardCarousel/>
      <SixthSection/>
      <SeventhSection/>
      <Footer />
    </div>
    
  );
}
