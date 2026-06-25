"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AnimatedButton from "../components/AnimatedButton";
import type { WorkflowContent } from "./departmentConfig";

const MARGIN = 40;

const AdsWorkflowSection = ({ content }: { content: WorkflowContent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ viewWidth: 0, rowWidth: 0 });

  useEffect(() => {
    const update = () => {
      setDims({
        viewWidth: window.innerWidth,
        rowWidth: rowRef.current?.scrollWidth ?? 0,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Cards: shift right at start to reveal first card, left at end to reveal last
  const x = useTransform(scrollYProgress, (v) => {
    const overflow = Math.max(0, dims.rowWidth - dims.viewWidth);
    const startX = overflow / 2 + MARGIN;
    const endX = -(overflow / 2 + MARGIN);
    return startX + (endX - startX) * v;
  });

  // Train: sweeps from left edge to off-screen right
  const trainX = useTransform(scrollYProgress, (v) => {
    return (dims.viewWidth + 640) * v * 0.85;
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] container py-0 sm:py-15 lg:py-20"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center lg:mb-5 px-4">
          <h6 className="black-text">{content.title}</h6>
        </div>

        {/* Train + track */}
        <div className="relative w-full flex flex-col">
          <motion.div
            style={{ x: trainX }}
            className="relative w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[20px] sm:h-[50px] z-20 lg:mt-0 mt-5"
          >
            <Image
              width={1000}
              height={1000}
              src="/images/train.png"
              alt="train"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <div className="w-full h-[3px] sm:h-[4px] bg-[var(--color-highlight)] z-10 rounded-full" />
        </div>

        {/* Cards */}
        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex gap-4 sm:gap-8 px-4 sm:px-10 md:px-20 mt-3 overflow-hidden"
        >
          {content.steps.map((step) => (
            <div
              key={step.title}
              className="bg-black rounded-[20px] sm:rounded-[30px] overflow-hidden p-4 sm:p-6 md:p-8 relative w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[380px] sm:h-[450px] md:h-[500px] lg:h-[540px] flex-shrink-0"
            >
              <div className="absolute right-0 top-0 h-full w-3 sm:w-5 candy-border rounded-r-[20px] sm:rounded-r-[30px]" />
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="border-b border-[var(--color-highlight)] pb-4 sm:pb-6 md:pb-8">
                  <h3 className="white-text">{step.title}</h3>
                </div>
                <p className="white-text subtitle">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag, tagIndex) => (
                    <span key={tag} className="black-text capitalize">
                      <AnimatedButton text={tag} href="/" index={tagIndex} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdsWorkflowSection;
