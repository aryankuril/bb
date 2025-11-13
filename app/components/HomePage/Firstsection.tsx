"use client";
import React from "react";

const Firstsection = () => {
  return (
       <section className="relative overflow-hidden h-screen -mt-[82px] md:-mt-8 ">
      <div className="relative w-full h-full">
        {/* ✅ Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/home2.mp4" type="video/mp4" />
        </video>

        {/* ✅ Mobile Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/home-m2.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Firstsection;
