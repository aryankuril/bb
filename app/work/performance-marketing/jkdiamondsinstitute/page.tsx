import React from 'react'
import Navbar from '@/app/components/Navbar'
import Firstsection from '@/app/components/ClientsInternal/Performance/JKDiamonds/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/JKDiamonds/ThirdSection"
import FourthSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/FourthSection'
import SeventhSection from '@/app/components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '@/app/components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '@/app/components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study - Digital Marketing for Educational Institutes | JK Diamonds Institute",
  description: "Bombay Blokes designed ROI-focused digital campaigns for JK Diamonds Institute — combining paid ads, targeted strategies & analytics to maximize student engagement and enrollment.",
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
      <ThirdSection />
      <FourthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
      
    </div>
  )
}

export default Index