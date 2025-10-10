import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Blogs/Firstsection'
import SecondSection from '../components/Blogs/SecondSection'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import ClientScripts from '../components/ClientScripts'

const page = () => {
  return (
    <div>
      <ClientScripts/>
        <Navbar/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/>
    </div>
  )
}

export default page