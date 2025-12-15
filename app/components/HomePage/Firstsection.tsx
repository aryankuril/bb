"use client";
import React, { useState } from "react";

const Firstsection = () => {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden h-[85vh] md:h-screen -mt-[82px] md:-mt-8">
      <div className="relative w-full h-full">

        {/* ✅ Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/video-poster-desktop.png"
          onLoadedData={() => setDesktopLoaded(true)}
          className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            desktopLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/hero.2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Mobile Video (85% height) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/video-poster-mobile.png"
          onLoadedData={() => setMobileLoaded(true)}
          className={`block md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            mobileLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/hero.2-m.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </section>
  );
};

export default Firstsection;
