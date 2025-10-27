"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const logos = [
  { src: "/images/logo/logo (1).png", alt: "Logo 1" },
  { src: "/images/logo/logo (2).png", alt: "Logo 2" },
  { src: "/images/logo/logo (3).png", alt: "Logo 3" },
  { src: "/images/logo/logo (4).png", alt: "Logo 4" },
  { src: "/images/logo/logo (5).png", alt: "Logo 5" },
  { src: "/images/logo/logo (6).png", alt: "Logo 6" },
  { src: "/images/logo/logo (7).png", alt: "Logo 7" },
  { src: "/images/logo/logo (8).png", alt: "Logo 8" },
  { src: "/images/logo/logo (9).png", alt: "Logo 9" },
  { src: "/images/logo/logo (10).png", alt: "Logo 10" },
  { src: "/images/logo/logo (11).png", alt: "Logo 11" },
  { src: "/images/logo/logo (12).png", alt: "Logo 12" },
  { src: "/images/logo/logo (13).png", alt: "Logo 13" },
  { src: "/images/logo/logo (14).png", alt: "Logo 14" },
  { src: "/images/logo/logo (15).png", alt: "Logo 15" },
  { src: "/images/logo/logo (16).png", alt: "Logo 16" },
  { src: "/images/logo/logo (17).png", alt: "Logo 17" },
  { src: "/images/logo/logo (18).png", alt: "Logo 18" },
  { src: "/images/logo/logo (19).png", alt: "Logo 19" },
  { src: "/images/logo/logo (20).png", alt: "Logo 20" },
  { src: "/images/logo/logo (21).png", alt: "Logo 21" },
  { src: "/images/logo/logo (22).png", alt: "Logo 22" },
  { src: "/images/logo/logo (23).png", alt: "Logo 23" },
  { src: "/images/logo/logo (24).png", alt: "Logo 24" },
  { src: "/images/logo/logo (25).png", alt: "Logo 25" },
  { src: "/images/logo/logo (26).png", alt: "Logo 26" },
  { src: "/images/logo/logo (27).png", alt: "Logo 27" },
  { src: "/images/logo/logo (28).png", alt: "Logo 28" },
  { src: "/images/logo/logo (29).png", alt: "Logo 29" },
  { src: "/images/logo/logo (30).png", alt: "Logo 30" },
  { src: "/images/logo/logo (31).png", alt: "Logo 31" },
  { src: "/images/logo/logo (32).png", alt: "Logo 32" },
  { src: "/images/logo/logo (33).png", alt: "Logo 33" },
  { src: "/images/logo/logo (34).png", alt: "Logo 34" },
  { src: "/images/logo/logo (35).png", alt: "Logo 35" },
  { src: "/images/logo/logo (36).png", alt: "Logo 36" },
  { src: "/images/logo/logo (37).png", alt: "Logo 37" },
  { src: "/images/logo/logo (38).png", alt: "Logo 38" },
  { src: "/images/logo/logo (39).png", alt: "Logo 39" },
  { src: "/images/logo/logo (40).png", alt: "Logo 40" },
  { src: "/images/logo/logo (41).png", alt: "Logo 41" },
  { src: "/images/logo/logo (42).png", alt: "Logo 42" },
  { src: "/images/logo/logo (43).png", alt: "Logo 43" },
  { src: "/images/logo/logo (44).png", alt: "Logo 44" },
  { src: "/images/logo/logo (45).png", alt: "Logo 45" },
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

  // Logic: show all on desktop, only 9 on mobile unless toggled
  const visibleLogos = isMobile && !showAll ? logos.slice(0, 9) : logos;

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      <div
        className={`grid grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto transition-all duration-500 ease-in-out`}
      >
        {visibleLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-2 border-[#FAB31E] bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 lg:p-6 p-3"
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

      {/* Show More / Less Button (mobile only) */}
      {isMobile && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
           className="px-6 py-2 border border-[var(--color-primary)] cursor-pointer text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ThirdSection;
