"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

type WordSpanProps = {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

const WordSpan = ({ word, index, total, scrollYProgress }: WordSpanProps) => {
  const start = index / total;
  const end = start + 1 / total;
  const color = useTransform(scrollYProgress, [start, end], ["#9ca3af", "#000000"]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

  return (
    <motion.span
      style={{ color, opacity }}
      className="mx-[2px] transition-all duration-300"
    >
      {word}&nbsp;
    </motion.span>
  );
};

const AdsWhySection = ({ text }: { text: string }) => {
  const sectionRef = useRef(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  return (
    <section
      id="why-bombay-blokes"
      ref={sectionRef}
      className="relative min-h-[200vh] container py-0 sm:py-15 lg:py-20 flex justify-center items-center"
    >
      <div className="sticky top-[50%] -translate-y-1/2 text-center">
        <motion.h2
          className="font-['Poppins'] font-semibold flex flex-wrap justify-center"
          style={{ textTransform: "none" }}
        >
          {words.map((word, index) => (
            <WordSpan
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default AdsWhySection;
