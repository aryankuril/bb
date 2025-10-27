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

import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Case-Study");
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
      {/* <ThirdSection /> */}
      <FourthSection />
      <SeventhSection />
      <Footer />
      
    </div>
  )
}

export default Index