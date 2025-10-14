"use client";

import { motion, Variants, Transition } from "framer-motion";
import React from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className = "" }) => {
  const transition: Transition = { duration: 0.6, ease: "easeOut" };

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition },
  };

  return (
    <motion.h2
      className={`flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#010205] font-semibold leading-[100%] tracking-[-1.44px] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedHeading;
