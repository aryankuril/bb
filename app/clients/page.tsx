import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Clients/Firstsection'
import SecondSection from '../components/Clients/SecondSection'
import ThirdSection from '../components/Clients/ThirdSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'

import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Clients");
const Index = () => {
  return (
    <div>
        <Taxi/>
         {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection />
        <SecondSection />
        <ThirdSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index