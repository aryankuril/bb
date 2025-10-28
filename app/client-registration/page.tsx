import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ClientRegistration/Firstsection'
import SecondSection from '../components/ClientRegistration/SecondSection'
import SixthSection from '../components/ServicesInternal/WebsiteDesign/SixthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Clinet-Registration");
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       {/* <MobilePopup/> */}
       <SmoothScroll> 
        <Taxi/>
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