"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Button from "../Button";

const cards = [
  { img: "/images/section1-img1.png", label: "Young Passionate Crowd", rotate: 10 },
  { img: "/images/section1-img2.png", label: "Jugged Masters", rotate: -10 },
  { img: "/images/section1-img3.png", label: "Goldi-Cricket Champs", rotate: 10 },
  { img: "/images/section1-img1.png", label: "Creative Experts", rotate: 10 },
];

const RubberSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full lg:h-[100vh] h-full relative overflow-hidden py-10 sm:py-15 lg:py-20"
    >
      {/* Heading */}
      <h2 className="mb-3 text-center">
        <span className="text-highlight">BB culture </span> - Ideate,innovate,create
      </h2>

      {/* Cards */}
      <div
        className="
          mt-16
          flex
          flex-col
          items-center
          lg:gap-6 gap-1
          sm:flex-col
          md:flex-row
          md:flex-wrap
          md:justify-center 
          lg:space-x-[-3rem]
          px-4
        "
      >
        {cards.map((card, idx) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotate = useTransform(x, [-200, 200], [-25 + card.rotate, 25 + card.rotate]);

          const resetPosition = () => {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
            animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
            animate(rotate, card.rotate, { type: "spring", stiffness: 300, damping: 20 });
          };

          return (
            <motion.div
              key={idx}
              className="
                relative
                w-[220px]
                sm:w-[260px]
                md:w-[300px]
                lg:w-[350px]
                h-[220px]
                sm:h-[260px]
                md:h-[300px]
                lg:h-[350px]
                flex-shrink-0
                rounded-xl
                shadow-lg
                cursor-grab
              "
              style={{ x, y, rotate }}
              drag
              dragConstraints={sectionRef}
              dragElastic={0.4}
              whileDrag={{ scale: 1.05 }}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 15, power: 0.2 }}
              onDragEnd={resetPosition}
            >
              <img
                src={card.img}
                alt={card.label}
                className="w-full h-full rounded-xl object-cover pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>
                     <div className=" flex items-center justify-center py-10 z-40">
  <Button
    href="#"
    text="Join Our Team"
    className=" text-black font-semibold "
  />
</div>
    </section>
  );
};

export default RubberSection;
