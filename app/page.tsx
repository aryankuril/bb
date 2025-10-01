
import Header from "./components/Header";
import SecondSection from "./components/HomePage/SecondSection";
import StudioSection from "./components/HomePage/StudioSection"
import ThirdSection from "./components/HomePage/ThirdSection";
import WorkCard from "./components/HomePage/WorkCard";
import SixthSection from "./components/Service/SixthSection";
import SeventhSection from "./components/Service/SeventhSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <SecondSection/>
      <StudioSection/>
      <ThirdSection/>
      <WorkCard />
      <SixthSection/>
      <SeventhSection/>
      <Footer />
    </div>
    
  );
}
