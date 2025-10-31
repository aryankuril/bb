import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/WebDevelopment/TheFelineFoundation/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/WebDevelopment/TheFelineFoundation/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/WebDevelopment/TheFelineFoundation/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/WebDevelopment/TheFelineFoundation/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study - NGO | The Feline Foundation",
  description: "See how Bombay Blokes built a heartwarming digital experience for The Feline Foundation — with a clean, responsive design that amplifies their mission for animal care.",
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