"use client";

import React, { useState, useEffect } from "react";
import Button from "../../Button";
import Image from "next/image";
const FirstSection = () => {
  const images = [
    "/images/pm/chaterbox.png",
    "/images/pm/Dancingleaf.png",
    "/images/pm/Jk-diamonds.png",
    "/images/pm/SCS.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 300); // change every 0.3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    
<section className="w-full container  py-0 sm:py-15 lg:py-20 lg:mt-0 -mt-10 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Side - Text */}
  <div className="flex-1 text-left space-y-4">
    <h1 className= "w-full max-w-[700px] mx-auto md:mx-0 lg:mt-10">

      From clicks to customers,<span className="text-highlight"> we build both. </span>
    </h1>

    <p className="body2 w-full max-w-[600px] mt-4 break-words">
      Anyone can get you clicks. We get you conversions , turning ad spend into real revenue, not vanity metrics.

    </p>

    <div className="mt-6 lg:mt-10 z-50">
      <Button href="/contactus" text="BOOK FREE AUDIT " className="lg:mt-10" />
    </div>
  </div>

  {/* Right Side - Image Slider */}
<div className="flex-1 w-full max-w-[600px] relative">
  {/* Wrapper with no overflow */}
  <div className="aspect-[4/3] relative rounded-[15px]  overflow-hidden">
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
     Marketing, the result-driven style
    </span>
  </div>
</div>

</section>



  );
};

export default FirstSection;
