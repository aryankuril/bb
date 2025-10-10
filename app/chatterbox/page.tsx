import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/ClientsInternal/Performance/Chatterbox/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/Chatterbox/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/Chatterbox/ThirdSection"
import FourthSection from '../components/ClientsInternal/Performance/Chatterbox/FourthSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Navbar />
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