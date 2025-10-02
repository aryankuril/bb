
import Header from "./components/Header";
import SecondSection from "./components/HomePage/SecondSection";
import StudioSection from "./components/HomePage/StudioSection"
import ThirdSection from "./components/HomePage/ThirdSection";
import WorkCard from "./components/HomePage/WorkCard";
import PerformanceROI from "./components/HomePage/PerformanceROI"
import SixthSection from "./components/ServicesInternal/SixthSection";
import SeventhSection from "./components/ServicesInternal/SeventhSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <SecondSection/>
      <ThirdSection/>
      <WorkCard />
      <StudioSection/>
      <PerformanceROI/>
      
      <SixthSection/>
      <SeventhSection/>
      <Footer />
    </div>
    
  );
}
