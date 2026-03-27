"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Firstsection = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000); // delay video
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden h-[85vh] md:h-screen -mt-[82px] md:-mt-8">

      {/* ✅ MOBILE POSTER */}
      <Image
        src="/images/video-poster-mobile.png"
        alt="Hero Mobile"
        fill
        priority
        className="object-cover md:hidden"
      />

      {/* ✅ DESKTOP POSTER */}
      <Image
        src="/images/video-poster-desktop.png"
        alt="Hero Desktop"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* ✅ VIDEO LOADS LATE */}
      {showVideo && (
        <>
          {/* Desktop */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero4.5-Trim.mp4" type="video/mp4" />
          </video>

          {/* Mobile */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero.2-m.mp4" type="video/mp4" />
          </video>
        </>
      )}
    </section>
  );
};

export default Firstsection;