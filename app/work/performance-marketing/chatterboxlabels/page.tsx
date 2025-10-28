import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '@/app/components/ClientsInternal/Performance/Chatterbox/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/Chatterbox/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/Chatterbox/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Performance/Chatterbox/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'

import SmoothScroll from '@/app/components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Case-Study-Chatterbox Labels");
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <SmoothScroll> 
      <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
      
    </div>
  )
}

export default Index