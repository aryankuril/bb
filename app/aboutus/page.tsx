import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/AboutUs/Firstsection'
import SecondSection from '../components/HomePage/SecondSection'
import ThirdSection from '../components/AboutUs/ThirdSection'
// import FourthSection from '../components/AboutUs/FourthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import RubberSection from '../components/HomePage/RubberSection'
import Footer from '../components/Footer'
import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
        <ClientScripts/>
        <Navbar/>
        <Firstsection />
        <SecondSection/>
        <ThirdSection />
        {/* <FourthSection /> */}
        <RubberSection/>
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index