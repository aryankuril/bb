import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Teams/Firstsection'
// import SecondSection from '@/app/components/Teams/SecondSection'
import ThirdSection from '@/app/components/Teams/ThirdSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import ClientScripts from '../components/ClientScripts'


const Index = () => {
  return (
    <div>
      <ClientScripts/>
        <Navbar />
        <Firstsection />
        {/* <SecondSection /> */}
        <ThirdSection />
        <SeventhSection />
        <Footer />
    </div>
  )
}

export default Index