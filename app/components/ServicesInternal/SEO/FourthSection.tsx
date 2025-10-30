"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FourthSection = () => {
  const sectionRef = useRef(null);
const text =
  "Search is more than visibility; it’s where crawlers find you first and customers connect instantly. We optimize for both people and algorithms, ensuring your growth is intentional, consistent, and never left to chance.";

  const words = text.split(" ");

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] container py-0 sm:py-15 lg:py-20 flex justify-center items-center"
    >
      {/* Sticky container */}
      <div className="sticky top-[50%] -translate-y-1/2 text-center">
        <motion.h2
          className="font-['Poppins'] font-semibold flex flex-wrap justify-center"
          style={{ textTransform: "none" }} // ✅ Prevents any auto text transformation
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            const color = useTransform(scrollYProgress, [start, end], [
              "#9ca3af",
              "#000000",
            ]);
            const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

            return (
              <motion.span
                key={i}
                style={{ color, opacity }}
                className="mx-[2px] transition-all duration-300"
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </motion.h2>
      </div>
    </section>
  );
};

export default FourthSection;
