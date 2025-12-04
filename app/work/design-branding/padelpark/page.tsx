import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Branding/PadelPark/Firstsection'
import SecondSection from '../../../components/ClientsInternal/Branding/PadelPark/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/Branding/PadelPark/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Branding/PadelPark/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "PadelPark360 Branding | Case Study | Bombay Blokes",
  description: "See how Bombay Blokes transformed PadelPark360’s identity with bold sports-branding, logo design and brand strategy — a powerful case study in turning courtside energy into a remarkable brand.",
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