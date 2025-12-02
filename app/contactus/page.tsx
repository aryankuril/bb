import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ContactUs/Firstsection'
import SecondSection from '../components/ContactUs/SecondSection'
import Testimonials from "@/app/components/Testimonials";
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Leading Digital Agency in Mumbai ",
  description: "Looking for digital marketing services in Mumbai? Bombay Blokes is reliable and trusted by some leading brands. Connect with us to know more",
};
const Index = () => {
  return (
    <div>
      <SmoothScroll> 

      {/* <ClientScripts/> */}
      <Taxi/>
       {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        <Testimonials/>
        <SeventhSection/>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index