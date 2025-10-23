import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/OurWork/Firstsection'
import SecondSection from '../components/OurWork/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from "@/app/components/MobilePopup";

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       <MobilePopup/>
      <Taxi/>
        <Navbar />
        <Firstsection />
        <SecondSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index