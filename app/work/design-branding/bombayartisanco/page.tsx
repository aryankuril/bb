import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Branding/BombayArtisanCo/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Branding/BombayArtisanCo/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/Branding/BombayArtisanCo/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Branding/BombayArtisanCo/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – BombayArtisanCo Sports Branding | Organic Growth",
  description: "Bombay Blokes boosted BombayArtisanCo Sports’ online presence with Branding strategies that improved rankings, increased organic traffic & generated measurable business results.",
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