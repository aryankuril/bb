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
  title: "Case Study – PadelPark360 Branding | Organic Growth",
  description: "Bombay Blokes implemented advanced Branding strategies for PadelPark360 — improving search rankings, boosting organic traffic & generating high-quality B2B leads.",
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