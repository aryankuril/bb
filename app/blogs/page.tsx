import React from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Blogs/Firstsection'
import SecondSection from '../components/Blogs/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'

import SmoothScroll from '@/app/components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blogs | Digital Agency | Bombay Blokes",
  description: "Bombay Blokes is a leading digital marketing company in Mumbai, our blogs are well- researched in the field of digital marketing",
};

const page = () => {
  return (
    <div>
      <SmoothScroll> 
      {/* <ClientScripts/> */}
      <Taxi/>
        <Navbar/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/>

</SmoothScroll>
    </div>
  )
}

export default page