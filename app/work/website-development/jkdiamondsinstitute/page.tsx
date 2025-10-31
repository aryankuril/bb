import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/JKDiamonds/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/JKDiamonds/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/JKDiamonds/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/JKDiamonds/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study - Leading Diamond Institute - JK Diamonds",
  description: " Discover how Bombay Blokes redesigned JK Diamonds Institute’s website with a modern UX, responsive design & SEO-friendly structure to boost visibility & engagement.",
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