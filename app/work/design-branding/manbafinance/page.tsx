import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Branding/Manba/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Branding/Manba/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/Branding/Manba/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Branding/Manba/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – Branding for Manba Finance",
  description: "Discover how Bombay Blokes enhanced Manba Finance’s search engine performance through keyword optimization, content strategy & link building for measurable ROI.",
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
      {/* <ThirdSection /> */}
      <FourthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
      
    </div>
  )
}

export default Index