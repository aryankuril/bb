import React from 'react'
import Button from '../components/Button'
// import Navbar from '../components/Navbar'
// import Firstsection from '../components/Blogs/Firstsection'
// import SecondSection from '../components/Blogs/SecondSection'
// import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
// import Footer from '../components/Footer'
// // import ClientScripts from '../components/ClientScripts'
// import Taxi from '../components/Taxi'

import SmoothScroll from '@/app/components/SmoothScroll'
import { createPageMetadata } from "@/lib/metadata";


export const metadata = createPageMetadata("Blogs");

const page = () => {
  return (
    <div>
      <SmoothScroll> 
      {/* <ClientScripts/> */}
      {/* <Taxi/>
        <Navbar/>
        <Firstsection/>
        <SecondSection/>
        <SeventhSection/>
        <Footer/> */}


         <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black text-center px-4">
  <h1 className="text-2xl sm:text-4xl font-semibold">
    This page is under construction, we’ll fix it soon 🚧
  </h1>

  <div className="mt-8">
    <Button
      href="/"
      text="Go Back"
      className="text-black font-semibold"
    />
  </div>
</div>
</SmoothScroll>
    </div>
  )
}

export default page