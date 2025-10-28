import React from 'react'
import Navbar from '@/app/components/Navbar'
import Firstsection from '@/app/components/ClientsInternal/Performance/JKDiamonds/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/JKDiamonds/ThirdSection"
import FourthSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/FourthSection'
import SeventhSection from '@/app/components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '@/app/components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '@/app/components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Case-Study-JK Diamonds Institute");
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