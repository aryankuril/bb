import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SocialMedia/SCS-SocialMedia/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SocialMedia/SCS-SocialMedia/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SocialMedia/SCS-SocialMedia/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SocialMedia/SCS-SocialMedia/FourthSection'
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