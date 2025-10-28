import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/SCS/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/SCS/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/SCS/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/SCS/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Case-Study-SCS Sports");
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <SmoothScroll> 
      <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
      {/* <ThirdSection /> */}
      <FourthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
      
    </div>
  )
}

export default Index