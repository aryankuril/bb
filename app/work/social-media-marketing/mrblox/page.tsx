import React from 'react'
// import Navbar from '../../../components/Navbar'
// import Firstsection from '../../../components/ClientsInternal/SEO/Manba/Firstsection'
// import SecondSection from '@/app/components/ClientsInternal/SEO/Manba/SecondSection'
// import ThirdSection from "@/app/components/ClientsInternal/SEO/Manba/ThirdSection"
// import FourthSection from '../../../components/ClientsInternal/SEO/Manba/FourthSection'
// import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
// import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
// import Taxi from '../../../components/Taxi'
import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Case Study – SEO for Mr Blox",
  description: "Discover how Bombay Blokes enhanced Mr Blox search engine performance through keyword optimization, content strategy & link building for measurable ROI.",
};

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <SmoothScroll> 
      {/* <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
      {/* <ThirdSection /> */}
      {/* <FourthSection />
      <SeventhSection />
      <Footer /> */} 

     <div className="w-full py-12 text-center">
  <div className="inline-block bg-yellow-100 text-yellow-800 px-5 py-3 rounded-xl text-lg font-medium border border-yellow-300">
    🚧 We are currently under progress
  </div>
</div>



      </SmoothScroll>
      
    </div>
  )
}

export default Index