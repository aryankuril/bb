import React from 'react'
import Navbar from '@/app/components/Navbar'
import Firstsection from '@/app/components/ClientsInternal/Performance/JKDiamonds/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/JKDiamonds/ThirdSection"
import FourthSection from '@/app/components/ClientsInternal/Performance/JKDiamonds/Firstsection'
import SeventhSection from '@/app/components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '@/app/components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '@/app/components/Taxi'

const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
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