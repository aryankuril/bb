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
  title: "BombayArtisanCo Sports Branding | Case Study | Bombay Blokes",
  description: "Explore how Bombay Blokes crafted a unique brand identity for BombayArtisanCo — combining heritage, sportiness and authenticity to create a memorable, market-ready brand presence.",
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