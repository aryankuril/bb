"use client";


import React from "react";

const SeventhSection = () => {
  return (
<section className="container sm:py-10 md:py-12">
  <div className="bg-[#1D1D1D] rounded-[20px] relative overflow-hidden">
    <div className="relative z-10 flex items-center justify-center py-10 sm:py-12 md:py-16">
      <div className="text-center space-y-6 sm:space-y-8">
        
        {/* Image */}
        <img
          src="/images/BB-web-chai-1.gif"
          className="w-[180px] h-[120px] sm:w-[240px] sm:h-[160px] md:w-[290px] md:h-[190px] mx-auto mb-6 sm:mb-8"
        />

        {/* Animated Heading */}
        <h2 className="text-center font-[Miso] 
                       text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] 
                       not-italic font-normal 
                       leading-[38px] sm:leading-[52px] md:leading-[64px] lg:leading-[74px] 
                       tracking-[-1px] sm:tracking-[-1.6px] md:tracking-[-2px] lg:tracking-[-2.4px] 
                       capitalize flex flex-wrap justify-center gap-2 sm:gap-3">
          <span className="animated-word">Connect.</span>
          <span className="animated-word">Collaborate.</span>
          <span className="animated-word">Grow.</span>
        </h2>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 
                        text-[14px] sm:text-[16px] md:text-[18px] 
                        leading-[24px] sm:leading-[28px] md:leading-[33px] 
                        tracking-[0.2px] text-white">
          <span>hello@bombayblokes.com</span>
          <span >|</span>
          <span>+91 99875 58189</span>
        </div>
      </div>
    </div>

    {/* Yellow Stripe */}
    <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E]"></div>
  </div>
</section>

  )
}

export default SeventhSection