"use client";

import React, { useState, useEffect } from "react";
import Button from "../../Button";
import Image from "next/image";
const FirstSection = () => {
  const images = [
    "/images/branding-cs/barnd1.jpg",
    "/images/branding-cs/barnd2.jpg",
    "/images/branding-cs/barnd3.jpg",
    "/images/branding-cs/barnd4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 300); // change every 0.3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    
<section className="w-full container  py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Side - Text */}
  <div className="flex-1 text-left space-y-4">
    <h1 className= "w-full max-w-[700px] mx-auto md:mx-0 lg:mt-10">
     From Vision to Value, <span className="text-highlight"> We Connect It All.</span>
      {/* We Don’t Just Brand, <span className="text-highlight">We Build Icons.</span> */}
    </h1>

    <p className="body2 w-full max-w-[600px] mt-4 break-words">
      From strategy to storytelling, identity to impact, we craft everything your brand needs to stand out and grow.

    </p>

    <div className="mt-6 lg:mt-10 z-50">
       <Button href="/estimates-calculator" text="Get Estimates " className="" />
    </div>
  </div>

  {/* Right Side - Image Slider */}
<div className="flex-1 w-full max-w-[600px] relative">
  {/* Wrapper with no overflow */}
  <div className="aspect-[4/3] relative rounded-[20px] sm:rounded-[30px] overflow-hidden">
    {/* Image slider */}
    {images.map((img, idx) => (
      <Image
      width={1000}
          height={1000}
        key={idx}
        src={img}
        alt={`Slide ${idx + 1}`}
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
          idx === current ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>

  {/* Label box (outside card, overlapping) */}
  <div className="hidden sm:block font-['Poppins'] absolute top-4 lg:-left-25 left-4 z-30 bg-[#FAB31E] rounded-[20px_20px_0px_20px] px-3 sm:px-5 py-1 sm:py-2 shadow-md">
    <span className="text-black text-xs sm:text-sm leading-[20px] sm:leading-[30px] tracking-[-0.36px] whitespace-nowrap">
      Innovation, the street-smart style
    </span>
  </div>
</div>

</section>



  );
};

export default FirstSection;
