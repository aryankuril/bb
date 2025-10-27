import type { Metadata } from "next";
import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Services/Firstsection'
import SecondSection from '../components/Services/SecondSection'
import ThirdSection from '../components/Services/ThirdSection'
// import WorkCard from '../components/HomePage/WorkCard'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import MobilePopup from '@/app/components/MobilePopup'


export const metadata: Metadata = {
  title: "Website Development Company in Mumbai | Custom, Shopify, WordPress, and more.",
  description: "Transform your online presence with Bombay Blokes, Mumbai’s best website development company. We design fast, responsive, and conversion-focused designs that leave an impact. Book Your Free Consultation Now.",
};
const page = () => {
  return (
    <div>
      <Taxi/>
       {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection />
        <SecondSection />
        <ThirdSection/>
        {/* <WorkCard/> */}
        <SeventhSection/>
        <Footer />
    </div>
  )
}

export default page