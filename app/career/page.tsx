import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Career/Firstsection'
import SecondSection from '../components/Career/SecondSection'
// import ThirdSection from '../components/Career/ThirdSection'
import RubberSection from '../components/HomePage/RubberSection'

import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
      <ClientScripts/>
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        <RubberSection/>
        {/* <ThirdSection/> */}
        <SeventhSection/>
        <Footer />
        

    </div>
  )
}

export default Index