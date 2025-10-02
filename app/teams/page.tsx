import React from 'react'
import Header from '../components/Header'
import Firstsection from '@/app/components/Teams/Firstsection'
import SecondSection from '@/app/components/Teams/SecondSection'
import ThirdSection from '@/app/components/Teams/ThirdSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'



const Index = () => {
  return (
    <div>
        <Header />
        <Firstsection />
        <SecondSection />
        <ThirdSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index