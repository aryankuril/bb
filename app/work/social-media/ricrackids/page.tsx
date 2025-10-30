import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SocialMedia/RicRac/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SocialMedia/RicRac/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SocialMedia/RicRac/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SocialMedia/RicRac/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import { createPageMetadata } from "@/lib/metadata";
import SmoothScroll from '@/app/components/SmoothScroll'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – Ricra Kids Social Media Marketing | Creative Campaigns by Bombay Blokes",
  description: "Discover how Bombay Blokes crafted data-driven social media strategies for Ricra Kids, driving audience engagement, brand visibility & measurable growth across platforms.",
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