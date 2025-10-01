import React from 'react'
import Header from '../components/Header'
import Firstsection from '../components/BrandInternal/Firstsection'
import SecondSection from '@/app/components/BrandInternal/SecondSection'
import ThirdSection from '../components/BrandInternal/ThirdSection'
// import FourthSection from '../components/BrandInternal/FourthSection'
import SeventhSection from '../components/Service/SeventhSection'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
      <Header />
      <Firstsection/>
      <SecondSection />
      <ThirdSection />
      {/* <FourthSection /> */}
      <SeventhSection />
      <Footer />
      
    </div>
  )
}

export default Index