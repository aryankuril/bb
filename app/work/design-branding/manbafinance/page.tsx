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
  title: "Manba Finance Branding | Fintech Case Study | Bombay Blokes",
  description: "See Bombay Blokes’ branding success with Manba Finance — a sleek, trust-focused identity crafted to convey reliability and modern finance professionalism in the fintech space.",
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