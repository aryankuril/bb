import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Blogs/Firstsection'
import SecondSection from '../components/Blogs/SecondSection'
import SeventhSection from '../components/ServicesInternal/SeventhSection'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
        <Navbar/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/>
    </div>
  )
}

export default page