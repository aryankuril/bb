"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/shopifylogo.webp",
  "/images/figmalogo.webp",
  "/images/framerlogo.webp",
  "/images/nextjslogo.webp",
  "/images/wordpresslogo.webp",
];

export default function ThirdSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 900);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      className="
        lg:h-screen h-200 relative bg-center bg-no-repeat py-10 sm:py-15 lg:py-20
        bg-[url('/images/tech-we-use-bg-m.svg')]
        lg:bg-[url('/images/tech-we-use-bg.png')]
        bg-contain lg:bg-cover w-full
      "
    >
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        {/* ✅ Animated Image Wrapper */}
        <div className="relative w-30 h-30 sm:w-35 sm:h-35 md:w-36 md:h-36 lg:w-25 lg:h-35 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25, // ⬅️ faster fade
    ease: "easeOut", // ⬅️ snappier feel
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={images[activeIndex]}
                alt={`icon-${activeIndex}`}
                width={350}
                height={220}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ✅ Title */}
        <h2 className="black-text text-center lg:w-[900px] w-full leading-snug">
          The <span className="text-highlight">Stack</span> That Powers{" "}
          <span className="text-highlight">Innovation,</span> Performance, And Growth{" "}
          <span className="text-highlight">Across</span> Every{" "}
          <span className="text-highlight">Project</span>
        </h2>
      </div>
    </section>
  );
}
