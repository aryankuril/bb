import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/OurWork/Firstsection'
import SecondSection from '../components/OurWork/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Work | Digital Marketing Case Studies & Success Stories – Bombay Blokes",
  description: " Explore Bombay Blokes’ portfolio of digital marketing success stories — real campaigns, real results. See how we help brands grow with creativity, data & strategy.",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       {/* <MobilePopup/> */}
       <SmoothScroll> 
      <Taxi/>
        <Navbar />
        <Firstsection />
        <SecondSection />
        <SeventhSection />
        <Footer />
        </SmoothScroll>
    </div>
  )
}

export default Index