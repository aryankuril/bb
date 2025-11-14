import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SocialMedia/Damania/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SocialMedia/Damania/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SocialMedia/Damania/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SocialMedia/Damania/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Parvez Aviation Digital Branding Case Study | Bombay Blokes",
  description: "Discover how Bombay Blokes transformed Parvez’s iconic aviation legacy into a compelling online brand with strategic content, reels, and community engagement.",
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