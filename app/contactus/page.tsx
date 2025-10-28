import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ContactUs/Firstsection'
import SecondSection from '../components/ContactUs/SecondSection'
import SixthSection from '../components/ServicesInternal/WebsiteDesign/SixthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Contact-Us");
const Index = () => {
  return (
    <div>
      <SmoothScroll> 

      {/* <ClientScripts/> */}
      <Taxi/>
       {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        <SixthSection/>
        <SeventhSection/>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index