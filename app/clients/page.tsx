import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Clients/Firstsection'
import SecondSection from '../components/Clients/SecondSection'
import ThirdSection from '../components/Clients/ThirdSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Clients | Trusted by Leading Brands – Bombay Blokes",
  description: "Discover how Bombay Blokes helped brands grow online through powerful SEO, ads & digital strategy. Real clients. Real results. Explore our success stories.",
};
const Index = () => {
  return (
    <div>
      <SmoothScroll> 

        <Taxi/>
         {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection />
        <ThirdSection />
        <SecondSection />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index