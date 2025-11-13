"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "./Button";
import Image from "next/image";
const Pagenotfound = () => {
    const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [stopPosition, setStopPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const stationRef = useRef<HTMLDivElement | null>(null);
  const trainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateStopPosition = () => {
      if (!containerRef.current || !stationRef.current || !trainRef.current)
        return;

      const trainWidth = trainRef.current.offsetWidth;
      const stationRight =
        stationRef.current.offsetLeft + stationRef.current.offsetWidth;

      // 🟢 Desktop default stop position
      let stopX = stationRight - trainWidth * 1.15;

      // 📱 On mobile, stop a little earlier so it doesn’t hit the pole
      if (window.innerWidth < 640) {
        stopX = stationRight - trainWidth * 1.10;
      }

      setStopPosition(stopX);
    };

    calculateStopPosition();
    window.addEventListener("resize", calculateStopPosition);
    return () => window.removeEventListener("resize", calculateStopPosition);
  }, []);
  return (
    <div className=""> 
   <section
        ref={(el) => {
          inViewRef(el);
          containerRef.current = el as HTMLDivElement | null;
        }}
        className="relative h-3xl border-b-2 border-[var(--color-highlight)] container py-20 sm:py-15 lg:py-20 "
      >
        <div className="flex flex-col lg:flex-row items-end relative lg:mb-0 mb-30">
          <div className="flex-1">
            <h1 className="black-text max-w-full lg:max-w-[1000px]">
  You&apos;re at the <span className="text-highlight">wrong station</span> let us take you to the <span className="text-highlight">right one.</span>
</h1>

        <div className="   mt-8">
    <Button
      href="/"
      text="Way To Station"
      className="text-black font-semibold"
    />
  </div>
          </div>
        </div>
  
        {/* Station Board */}
        <div
          ref={stationRef}
          className="absolute bottom-0 right-4 sm:right-8 lg:right-16 flex justify-end"
        >
          <Image
           width={1000}
          height={1000}
            src="/images/wrong-stataion.png"
            alt="Station board"
            className="w-28 sm:w-40 md:w-45 lg:w-48 xl:w-50 h-auto"
          />
        </div>
  
        {/* Train Animation */}
        <motion.div
          ref={trainRef}
          initial={{ x: "-100%" }}
          animate={inView ? { x: stopPosition } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 z-20 w-[700px] sm:w-[710px] md:w-[750px] lg:w-[800px] xl:w-[800px]"
        >
          <img
            src="/images/train.png"
            alt="train"
            className="w-full h-auto object-contain"
          />
        </motion.div>


      </section>


      </div>
  )
}

export default Pagenotfound