import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/AboutUs/Firstsection'
import SecondSection from '../components/AboutUs/SecondSection'
import ThirdSection from '../components/AboutUs/ThirdSection'
// import FourthSection from '../components/AboutUs/FourthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import RubberSection from '../components/HomePage/RubberSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Bombay Blokes | Growth-Focused Digital Marketing Agency In Mumbai",
  description: "We’re Bombay Blokes — a digital agency in Mumbai built for bold brands. Explore our journey, creative approach & proven strategies that drive traffic, leads & long-term success.",
};

const Index = () => {
  return (
    <div>
        {/* <ClientScripts/> */}
         <SmoothScroll>
        <Taxi/>
        <Navbar/>
        <Firstsection />
        <SecondSection/>
        <ThirdSection />
        {/* <FourthSection /> */}
        <RubberSection/>
        <SeventhSection />
        <Footer />
        </SmoothScroll>
    </div>
  )
}

export default Index