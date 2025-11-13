import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/MrBlox/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/MrBlox/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/MrBlox/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/MrBlox/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study for Mr Blox",
  description: "Discover how Bombay Blokes enhanced Mr Blox search engine performance through keyword optimization, content strategy & link building for measurable ROI.",
};

const Index = () => {
  return (
    <div>
      <SmoothScroll> 
     <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
     {/* <ThirdSection />  */}
     <FourthSection />
      <SeventhSection />
      <Footer /> 

      </SmoothScroll>
      
    </div>
  )
}

export default Index