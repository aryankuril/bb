"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "/images/wordpress-logo.svg",
  "/images/tailwind-logo.svg",
  "/images/framer-motion-logo2.webp",
  "/images/nextjs-logo.svg",
  "/images/react-logo.svg",
];

export default function ThirdSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]); // ✅ FIXED TYPE
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = activeIndexRef.current;
      const nextIndex = (currentIndex + 1) % images.length;

      // Fade out current image
      if (imgRefs.current[currentIndex]) {
        gsap.to(imgRefs.current[currentIndex], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Fade in next image
      if (imgRefs.current[nextIndex]) {
        gsap.to(imgRefs.current[nextIndex], {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      setActiveIndex(nextIndex);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="lg:h-screen h-100 relative bg-contain bg-center bg-no-repeat py-10 sm:py-15 lg:py-20"
      style={{ backgroundImage: "url(/images/tech-we-use-bg.png)" }}
    >
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mb-6 flex items-center justify-center">
  {images.map((img, i) => (
    <div
      key={i}
      ref={(el: HTMLDivElement | null) => {
        imgRefs.current[i] = el;
      }}
      className={`absolute inset-0 flex items-center justify-center ${
        i === activeIndex ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      <Image
        src={img}
        alt={`icon-${i}`}
        width={250}
        height={220}
        className="object-contain w-full h-full"
      />
    </div>
  ))}
</div>


        <h2 className="black-text text-center lg:w-[900px] w-full leading-snug">
          The <span className="text-highlight">Stack</span> That Powers{" "}
          <span className="text-highlight">Innovation,</span> Performance,
          And Growth{" "}
          <span className="text-highlight">Across</span> Every{" "}
          <span className="text-highlight">Project</span>
        </h2>
      </div>
    </section>
  );
}
