import React from 'react'
import Header from '../components/Header'
import Firstsection from '@/app/components/Career/Firstsection'
import SecondSection from '../components/Career/SecondSection'
import ThirdSection from '../components/Career/ThirdSection'

import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
        <Header />
        <Firstsection/>
        <SecondSection/>
        <ThirdSection/>
        <SeventhSection/>
        <Footer />
        

    </div>
  )
}

export default Index