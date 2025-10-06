import React from 'react'
import Button from '../components/Button'
// import Navbar from '../components/Navbar'

const Index = () => {
  return (
    <div className="">
    {/* <Navbar/> */}
<section className="w-full container py-10 sm:py-15 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Side - Text */}
  <div className="flex-1 text-center md:text-left space-y-4">
    <div className= " text-[80px] w-full font['Poppins'] max-w-[650px] mx-auto md:mx-0 lg:mt-10">
      We Don’t Just Brand, <span className="text-highlight">We Build Icons.</span>
    </div>

    <p className="body2 w-full max-w-[1000px]  mt-4 break-words">
      From Strategy To Storytelling, Identity To Impact, We Craft Everything Your Brand Needs To Stand Out And Grow.
    </p>

    <div className="mt-6 lg:mt-10">
      <Button href="#" text="BOOK FREE AUDIT " className="lg:mt-10" />
    </div>
  </div>


</section>
</div>
  )
}

export default Index