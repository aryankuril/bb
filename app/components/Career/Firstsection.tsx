"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Firstsection = () => {
      const { ref, inView } = useInView({
    triggerOnce: true,   // runs animation only once
    threshold: 0.5,      // 50% of section visible
  });

  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile width (<640px = Tailwind sm breakpoint)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (    <section
      ref={ref}
      className="relative container mx-auto overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="border-b-2 border-yellow-400">
        <div className="flex flex-col lg:flex-row items-start relative">
          
          {/* Heading */}
          <div className="flex-1">
            <h1
              className="
                font-[Miso]
                text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px]
                leading-[38px] sm:leading-[54px] md:leading-[72px] lg:leading-[100px] xl:leading-[120px]
                font-normal tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px]
                capitalize  text-[#1D1D1D] max-w-full lg:max-w-[1020px]
              "
            >
              Ride the Mumbai Spirit.{" "}
              <span className="text-[#FAB31E]"> Grow With Us</span>

            </h1>
          </div>

          {/* Station Board */}
          <div className="lg:absolute lg:top-10 top-15 lg:right-15 right-5 flex justify-end w-full lg:w-auto">
            <img
              src="/images/stationbord.png"
              alt="Decorative element"
              className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-55 h-auto"
            />
          </div>
        </div>

        {/* Train Animation */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={
            isMobile
              ? { x: 80 }             // 🚫 No movement on mobile
              : inView
              ? { x: 550 }           // ✅ Animate on larger screens
              : {}
          }
          transition={{ duration: 2, ease: "easeOut" }}
          className="
            relative z-20 -mt-5 sm:mt-8 lg:mt-12
            w-[180px] sm:w-[250px] md:w-[350px] lg:w-[500px] xl:w-[600px]
            h-[20px] sm:h-[30px] md:h-[40px] lg:h-auto
          "
        >
          <img
            src="/images/train.png"
            alt="train"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Firstsection