"use client";
import React, { useState } from "react";

const Firstsection = () => {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden h-screen -mt-[82px] md:-mt-8">
      <div className="relative w-full h-full">

        {/* ✅ Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/video-poster-desktop.png"            // 👈 Poster for desktop
          onLoadedData={() => setDesktopLoaded(true)}
          className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            desktopLoaded ? "opacity-100" : "opacity-0"
          }`}
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
          preload="auto"
          poster="/images/video-poster-mobile.png"          // 👈 Poster for mobile
          onLoadedData={() => setMobileLoaded(true)}
          className={`block md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            mobileLoaded ? "opacity-100" : "opacity-0"
          }`}
        > 
          <source src="/video/hero-m.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </section>
  );
};

export default Firstsection;
