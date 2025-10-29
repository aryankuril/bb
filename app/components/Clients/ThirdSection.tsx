"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../Button";

const logos = [
  { src: "/images/logo/LOGO(1).png", alt: "Logo 1" },
  { src: "/images/logo/LOGO(2).png", alt: "Logo 2" },
  { src: "/images/logo/LOGO(3).png", alt: "Logo 3" },
  { src: "/images/logo/LOGO(4).png", alt: "Logo 4" },
  { src: "/images/logo/LOGO(5).png", alt: "Logo 5" },
  { src: "/images/logo/LOGO(6).png", alt: "Logo 6" },
  { src: "/images/logo/LOGO(7).png", alt: "Logo 7" },
  { src: "/images/logo/LOGO(8).png", alt: "Logo 8" },
  { src: "/images/logo/LOGO(9).png", alt: "Logo 9" },
  { src: "/images/logo/LOGO(10).png", alt: "Logo 10" },
  { src: "/images/logo/LOGO(11).png", alt: "Logo 11" },
  { src: "/images/logo/LOGO(12).png", alt: "Logo 12" },
  { src: "/images/logo/LOGO(13).png", alt: "Logo 13" },
  { src: "/images/logo/LOGO(14).png", alt: "Logo 14" },
  { src: "/images/logo/LOGO(15).png", alt: "Logo 15" },
  { src: "/images/logo/LOGO(16).png", alt: "Logo 16" },
  { src: "/images/logo/LOGO(17).png", alt: "Logo 17" },
  { src: "/images/logo/LOGO(18).png", alt: "Logo 18" },
  { src: "/images/logo/LOGO(19).png", alt: "Logo 19" },
  { src: "/images/logo/LOGO(20).png", alt: "Logo 20" },
  { src: "/images/logo/LOGO(21).png", alt: "Logo 21" },
  { src: "/images/logo/LOGO(22).png", alt: "Logo 22" },
  { src: "/images/logo/LOGO(23).png", alt: "Logo 23" },
  { src: "/images/logo/LOGO(24).png", alt: "Logo 24" },
  { src: "/images/logo/LOGO(25).png", alt: "Logo 25" },
  { src: "/images/logo/LOGO(26).png", alt: "Logo 26" },
  { src: "/images/logo/LOGO(27).png", alt: "Logo 27" },
  { src: "/images/logo/LOGO(28).png", alt: "Logo 28" },
  { src: "/images/logo/LOGO(29).png", alt: "Logo 29" },
  { src: "/images/logo/LOGO(30).png", alt: "Logo 30" },
  { src: "/images/logo/LOGO(31).png", alt: "Logo 31" },
  { src: "/images/logo/LOGO(32).png", alt: "Logo 32" },
  { src: "/images/logo/LOGO(33).png", alt: "Logo 33" },
  { src: "/images/logo/LOGO(34).png", alt: "Logo 34" },
  { src: "/images/logo/LOGO(35).png", alt: "Logo 35" },
  { src: "/images/logo/LOGO(36).png", alt: "Logo 36" },
  { src: "/images/logo/LOGO(37).png", alt: "Logo 37" },
  { src: "/images/logo/LOGO(38).png", alt: "Logo 38" },
  { src: "/images/logo/LOGO(39).png", alt: "Logo 39" },

];

const ThirdSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show logic:
  // Mobile → 9 visible
  // Desktop → 15 visible (~3 rows of 5)
  const visibleCount = isMobile ? 20 : 24;
  const visibleLogos = showAll ? logos : logos.slice(0, visibleCount);

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      <div
        className={`grid grid-cols-4 md:grid-cols-6 gap-2 sm:gap-6 max-w-full mx-auto transition-all duration-500 ease-in-out`}
      >
        {visibleLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-2 border-[#FAB31E] bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 lg:p-6 p-2"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={80}
              className="object-contain max-h-[60px] sm:max-h-[80px] w-auto"
            />
          </div>
        ))}
      </div>

      {/* Show More / Less Button (desktop + mobile) */}
      <div className="flex justify-center mt-6">
       <Button
  text={showAll ? "View Less" : "View More"}
  onClick={() => setShowAll(!showAll)}
  className="text-black font-semibold transition-colors"
/>

      </div>
    </section>
  );
};

export default ThirdSection;
