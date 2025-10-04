import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Clients/Firstsection'
import SecondSection from '../components/Clients/SecondSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'


const Index = () => {
  return (
    <div>
        <Navbar />
        <Firstsection />
        <SecondSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index