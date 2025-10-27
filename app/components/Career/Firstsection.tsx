"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Firstsection: React.FC = () => {
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

      // 🟢 Stop train right near station corner (pole bottom)
      const stopX = stationRight - trainWidth * 1.23;
      setStopPosition(stopX);
    };

    calculateStopPosition();
    window.addEventListener("resize", calculateStopPosition);
    return () => window.removeEventListener("resize", calculateStopPosition);
  }, []);

  return (
    <section
     ref={(el) => {
    inViewRef(el);
    containerRef.current = el as HTMLDivElement | null;
  }}
      className="relative h-3xl border-b-2 border-[var(--color-highlight)] container py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col lg:flex-row items-end relative lg:mb-0 mb-30">
        <div className="flex-1">
          <h1 className="black-text max-w-full lg:max-w-[1000px]">
            Ride the Mumbai spirit,{" "}
            <span className="text-highlight">
              Grab opportunities and grow with us.
            </span>
          </h1>
        </div>
      </div>

      {/* Station Board */}
      <div
        ref={stationRef}
        className="absolute bottom-0 right-4 sm:right-8 lg:right-16 flex justify-end"
      >
        <img
          src="/images/carrer-station.png"
          alt="Station board"
          className="w-20 sm:w-40 md:w-48 lg:w-40 xl:w-50 h-auto"
        />
      </div>

      {/* Train Animation */}
      <motion.div
        ref={trainRef}
        initial={{ x: "-100%" }}
        animate={inView ? { x: stopPosition } : {}}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 z-20 w-[180px] sm:w-[250px] md:w-[350px] lg:w-[500px] xl:w-[600px]"
      >
        <img
          src="/images/train.png"
          alt="train"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  );
};

export default Firstsection;
