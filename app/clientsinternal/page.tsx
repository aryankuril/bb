import React from 'react'
import Header from '../components/Header'
import Firstsection from '../components/ClientsInternal/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/SecondSection'
import ThirdSection from '../components/ClientsInternal/ThirdSection'
import FourthSection from '../components/ClientsInternal/FourthSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
      <Header />
      <Firstsection/>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <SeventhSection />
      <Footer />
      
    </div>
  )
}

export default Index