"use client";
import React from "react";

const Firstsection = () => {
  return (
    <section className="relative overflow-hidden h-screen -mt-[82px] md:-mt-8">
      <div className="relative w-full h-full">

        {/* ✅ Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          // poster="/images/video-poster-desktop.jpg"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Mobile Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          // poster="/images/video-poster-mobile.jpg"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-m.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional: Gradient overlay for better visibility */}
        {/* <div className="absolute inset-0 bg-black/10"></div> */}
      </div>
    </section>
  );
};

export default Firstsection;
