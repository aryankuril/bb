"use client";

import React, { useState, useEffect } from "react";
import Button from "../Button";

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
    
<section className="w-full container py-10 sm:py-15 lg:py-30 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Side - Text */}
  <div className="flex-1 text-center md:text-left">
    <h1 className="black-text w-full max-w-[700px] mx-auto md:mx-0 ">
      We <span className="text-highlight">Build Digital Stories</span> That People Remember

    </h1>

    <p className="body2 w-full max-w-[1000px] black-text mx-auto md:mx-0 mt-4 break-words">
      From Strategy To Storytelling, Identity To Impact, We Craft Everything Your Brand Needs To Stand Out And Grow.
    </p>

  </div>

  {/* Right Side - Image Slider */}
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
</div>

</section>



  );
};

export default FirstSection;
