import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/AboutUs/Firstsection'
import SecondSection from '../components/AboutUs/SecondSection'
import ThirdSection from '../components/AboutUs/ThirdSection'
// import FourthSection from '../components/AboutUs/FourthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import RubberSection from '../components/HomePage/RubberSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("AboutUs");

const Index = () => {
  return (
    <div>
        {/* <ClientScripts/> */}
         {/* <MobilePopup/> */}
         <SmoothScroll>
        <Taxi/>
        <Navbar/>
        <Firstsection />
        <SecondSection/>
        <ThirdSection />
        {/* <FourthSection /> */}
        <RubberSection/>
        <SeventhSection />
        <Footer />
        </SmoothScroll>
    </div>
  )
}

export default Index