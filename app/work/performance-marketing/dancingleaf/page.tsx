import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Performance/DancingLeaf/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/DancingLeaf/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/DancingLeaf/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Performance/DancingLeaf/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import SmoothScroll from './../../../components/SmoothScroll';


import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – Performance Marketing Dancing Leaf ",
  description: " From strategy to scale — Bombay Blokes helped Dancing Leaf grow through data-led performance marketing, optimized campaigns & a blend of creativity and analytics.",
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