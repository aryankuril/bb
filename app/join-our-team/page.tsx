import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Career/Firstsection'
import SecondSection from '../components/Career/SecondSection'
import ThirdSection from '../components/Career/ThirdSection'
// import RubberSection from '../components/HomePage/RubberSection'

import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Join-Our-Team");

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}

      <SmoothScroll>
      <Taxi/>

        <Navbar />
        <Firstsection/>
        <SecondSection/>
        {/* <RubberSection/> */}
        <ThirdSection/>
        <SeventhSection/>
        <Footer />
        </SmoothScroll>
        

    </div>
  )
}

export default Index