import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ContactUs/Firstsection'
import SecondSection from '../components/ContactUs/SecondSection'
import SixthSection from '../components/ServicesInternal/WebsiteDesign/SixthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        <SixthSection/>
        <SeventhSection/>
        <Footer />
    </div>
  )
}

export default Index