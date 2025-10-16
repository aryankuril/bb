import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Blogs/Firstsection'
import SecondSection from '../components/Blogs/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'

const page = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
        <Navbar/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/>
    </div>
  )
}

export default page