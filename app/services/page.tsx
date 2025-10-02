import React from 'react'
import Header from '../components/Header'
import Firstsection from '../components/Services/Firstsection'
import SecondSection from '../components/Services/SecondSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
        <Header />
        <Firstsection />
        <SecondSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default page