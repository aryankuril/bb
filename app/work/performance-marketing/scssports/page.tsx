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
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study - Performance Marketing for SCS Sports",
  description: "Discover how Bombay Blokes crafted precise digital campaigns for SCS Sports, driving traffic, conversions & engagement with ROI-focused strategies for the sports industry.",
};
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