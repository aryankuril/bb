"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "/images/wordpress-logo.svg",
  "/images/tailwind-logo.svg",
  "/images/framer-motion-logo.svg",
  "/images/nextjs-logo.svg",
  "/images/react-logo.svg",
];

export default function ThirdSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = activeIndexRef.current;
      const nextIndex = (currentIndex + 1) % images.length;

      if (imgRefs.current[currentIndex]) {
        gsap.to(imgRefs.current[currentIndex], {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }

      if (imgRefs.current[nextIndex]) {
        gsap.fromTo(
          imgRefs.current[nextIndex],
          { opacity: 0, scale: 1.2 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" }
        );
      }

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className=" h-screen relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url(/images/tech-we-use-bg.png)" }}
    >
      {/* Center wrapper */}
      <div className="flex items-center justify-center h-full  px-6">
        <h1
          className="text-[#1D1D1D] text-center font-[Miso] font-normal capitalize
          text-[40px] leading-[44px] tracking-[-1.2px]
          sm:text-[50px] sm:leading-[54px] sm:tracking-[-1.5px]
          md:text-[60px] md:leading-[64px] md:tracking-[-1.8px]
          lg:text-[72px] lg:leading-[76px] lg:tracking-[-2px]
          xl:text-[80px] xl:leading-[87px] xl:tracking-[-2.4px] lg:w-[900px] w-full "
        >
          The <span className="text-[var(--color-highlight)]">Stack</span> That
          Powers Innovation, Performance,
          <span className="inline-block align-middle mx-2 relative w-10 h-10">
            {images.map((img, i) => (
              <div
                key={i}
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                className={`absolute inset-0 flex items-center justify-center ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img}
                  alt={`icon-${i}`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </span>
          And Growth{" "}
          <span className="text-[var(--color-highlight)]">Across</span> Every{" "}
          <span className="text-[var(--color-highlight)]">Project</span>
        </h1>
      </div>
    </section>
  );
}
