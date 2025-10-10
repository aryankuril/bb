"use client";

import React, { useState, useEffect } from "react";
import Button from "../../Button";

const FirstSection = () => {
  const images = [
    "/images/section1-img1.png",
    "/images/section1-img2.png",
    "/images/section1-img3.png",
    "/images/section1-img4.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 300); // change every 0.3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    
<section className="w-full container -lg:mt-10 -mt-10 py-0 sm:py-15 lg:py-30 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Side - Text */}
  <div className="flex-1 text-center md:text-left space-y-4">
    <h1 className= "w-full max-w-[650px] mx-auto md:mx-0 lg:mt-10">
      {/* We Don’t Just Code, We Deliver. */}
  We Don’t Just <span className="text-highlight">Code</span> We <span className="text-highlight">Deliver</span>
    </h1>

    <p className="body2 w-full max-w-[600px] mt-4 break-words">
      Your digital presence should work 24/7. We turn websites into growth engines that perform as hard as your business does.
    </p>

    <div className="mt-6 lg:mt-10 z-50">
      <Button href="#" text="BOOK FREE AUDIT " className="lg:mt-10" />
    </div>
  </div>

  {/* Right Side - Image Slider */}
<div className="flex-1 w-full max-w-[600px] relative">
  {/* Wrapper with no overflow */}
  <div className="aspect-[4/3] relative rounded-[20px] sm:rounded-[30px] overflow-hidden">
    {/* Image slider */}
    {images.map((img, idx) => (
      <img
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
  <div className=" font-['Poppins'] absolute top-4 lg:-left-25 left-4 z-30 bg-[#FAB31E] rounded-[20px_20px_0px_20px] px-3 sm:px-5 py-1 sm:py-2 shadow-md">
    <span className="text-black text-xs sm:text-sm leading-[20px] sm:leading-[30px] tracking-[-0.36px] whitespace-nowrap">
      Innovation, the street-smart style
    </span>
  </div>
</div>

</section>



  );
};

export default FirstSection;
