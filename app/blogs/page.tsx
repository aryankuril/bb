import React from 'react'
import Header from '../components/Header'
import Firstsection from '../components/Blogs/Firstsection'
import SecondSection from '../components/Blogs/SecondSection'
import SeventhSection from '../components/Service/SeventhSection'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
        <Header/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/>
    </div>
  )
}

export default page