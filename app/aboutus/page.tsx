import React from 'react'
// import Navbar from '../components/Navbar'
import Firstsection from '../components/AboutUs/Firstsection'
import SecondSection from '../components/HomePage/SecondSection'
import ThirdSection from '../components/AboutUs/ThirdSection'
import FourthSection from '../components/AboutUs/FourthSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
        {/* <Navbar/> */}
        <Firstsection />
        <SecondSection/>
        <ThirdSection />
        <FourthSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index