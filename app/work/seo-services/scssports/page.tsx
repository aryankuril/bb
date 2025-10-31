import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SEO/SCS/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SEO/SCS/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SEO/SCS/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SEO/SCS/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – SCS Sports SEO | Organic Growth",
  description: "Bombay Blokes boosted SCS Sports’ online presence with SEO strategies that improved rankings, increased organic traffic & generated measurable business results.",
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