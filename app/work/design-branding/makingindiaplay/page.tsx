import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Branding/MakingIndiaPlay/Firstsection'
import SecondSection from '../../../components/ClientsInternal/Branding/MakingIndiaPlay/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/Branding/MakingIndiaPlay/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Branding/MakingIndiaPlay/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "MakingIndiaPlay360 Branding | Case Study | Bombay Blokes",
  description: "Discover how Bombay Blokes shaped MakingIndiaPlay360’s branding journey — from concept to complete brand identity — giving a fresh, dynamic face to India’s sporting aspirations",
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