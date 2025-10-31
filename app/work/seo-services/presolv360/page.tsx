import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/SEO/Presolv/Firstsection'
import SecondSection from '../../../components/ClientsInternal/SEO/Presolv/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SEO/Presolv/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/SEO/Presolv/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – PreSolv360 SEO | Organic Growth",
  description: "Bombay Blokes implemented advanced SEO strategies for PreSolv360 — improving search rankings, boosting organic traffic & generating high-quality B2B leads.",
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