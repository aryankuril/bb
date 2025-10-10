import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Services/Firstsection'
import SecondSection from '../components/Services/SecondSection'
import WorkCard from '../components/HomePage/WorkCard'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
        <Navbar />
        <Firstsection />
        <SecondSection />
        <WorkCard/>
        <SeventhSection/>
        <Footer />
    </div>
  )
}

export default page