import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ContactUs/Firstsection'
import SecondSection from '../components/ContactUs/SecondSection'
import SixthSection from '../components/ServicesInternal/SixthSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'
import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
      <ClientScripts/>
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