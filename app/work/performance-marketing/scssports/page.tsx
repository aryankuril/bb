import React from 'react'
import Navbar from '@/app/components/Navbar'
import Firstsection from '@/app/components/ClientsInternal/Performance/SCSPerformance/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/SCSPerformance/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/SCSPerformance/ThirdSection"
import FourthSection from '@/app/components/ClientsInternal/Performance/SCSPerformance/FourthSection'
import SeventhSection from '@/app/components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '@/app/components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '@/app/components/Taxi'

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
      <ThirdSection />
      <FourthSection />
      <SeventhSection />
      <Footer />
      
    </div>
  )
}

export default Index