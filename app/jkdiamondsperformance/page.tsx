import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/ClientsInternal/Performance/JKDiamonds/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/JKDiamonds/ThirdSection"
import FourthSection from '../components/ClientsInternal/Performance/JKDiamonds/FourthSection'
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