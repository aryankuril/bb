import React from 'react'
import Header from '../components/Header'
import Firstsection from '@/app/components/ContactUs/Firstsection'
import SecondSection from '../components/ContactUs/SecondSection'
import SixthSection from '../components/Service/SixthSection'
import SeventhSection from '../components/Service/SeventhSection'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
        <Header />
        <Firstsection/>
        <SecondSection/>
        <SixthSection/>
        <SeventhSection/>
        <Footer />
    </div>
  )
}

export default Index