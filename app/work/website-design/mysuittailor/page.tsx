import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/MySuit/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/MySuit/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/MySuit/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/MySuit/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – Fashion Brand | My Suit Tailor",
  description: " Discover how Bombay Blokes designed a sleek, responsive website for My Suit Tailor — blending premium aesthetics with performance to elevate their online brand presence.",
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