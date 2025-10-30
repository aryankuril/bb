import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SocialMedia/Super-Sox/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SocialMedia/Super-Sox/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SocialMedia/Super-Sox/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SocialMedia/Super-Sox/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – Fashion Brand Social Media Marketing",
  description: "Bombay Blokes managed SuperSox’s social media marketing with creative campaigns & targeted strategies, helping the brand grow followers, engagement & digital reach.",
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