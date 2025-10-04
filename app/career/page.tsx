import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Career/Firstsection'
import SecondSection from '../components/Career/SecondSection'
import ThirdSection from '../components/Career/ThirdSection'

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
        <ThirdSection/>
        <SeventhSection/>
        <Footer />
        

    </div>
  )
}

export default Index