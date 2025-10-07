import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Services/Firstsection'
import SecondSection from '../components/Services/SecondSection'
import ThirdSection from '../components/Services/ThirdSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
        <Navbar />
        <Firstsection />
        <SecondSection />
        <ThirdSection/>
        <SeventhSection/>
        <Footer />
    </div>
  )
}

export default page