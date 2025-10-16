import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Clients/Firstsection'
import SecondSection from '../components/Clients/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'

const Index = () => {
  return (
    <div>
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