import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/Blancora/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/Blancora/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/Blancora/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/Blancora/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blancora Website Development Case Study | Bombay Blokes",
  description: " Discover how Bombay Blokes helped Blancora launch a high-performance website with custom design and conversion-focused development. See the full results and strategy.",
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
      {/* <ThirdSection />  */}
      <FourthSection />
      <SeventhSection />
      <Footer /> 
      </SmoothScroll>
      
    </div>
  )
}

export default Index