"use client";

import React from "react";
import { motion, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import Button from "../Button";

const cards = [
  { img: "/images/rubber1.webp", label: "Young Passionate Crowd", rotate: 10 },
  { img: "/images/rubber2.webp", label: "Jugged Masters", rotate: -10 },
  { img: "/images/rubber3.webp", label: "Goldi-Cricket Champs", rotate: 10 },
  { img: "/images/rubber4.webp", label: "Creative Experts", rotate: 10 },
];

const RubberSection = () => {
  const throwInVariant: Variants = {
    hidden: { x: 600, y: 0, rotate: 45, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  return (
    <section className="container w-full lg:h-[100vh] h-full relative py-10 sm:py-15 lg:py-20 overflow-x-hidden overflow-y-hidden">
      <h2 className="mb-3 text-center">
        <span className="text-highlight">BB culture </span> - Ideate, innovate, create
      </h2>

      {/* ✅ Responsive Cards Container */}
      <motion.div
        className="mt-16 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:gap-0 gap-0 px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
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
              variants={throwInVariant}
              className={`relative w-[250px] sm:w-[260px] md:w-[280px] lg:w-[350px] h-[250px] sm:h-[260px] md:h-[280px] lg:h-[330px] flex-shrink-0 cursor-grab rounded-xl
                ${
                  idx !== 0
                    ? "sm:-ml-12 md:-ml-14 lg:-ml-10" // overlap only on desktop
                    : ""
                }`}
            >
              <motion.div
                style={{ x, y, rotate }}
                drag
                dragConstraints={{
                  left: -window.innerWidth / 2,
                  right: window.innerWidth / 2,
                  top: -100,
                  bottom: 100,
                }}
                dragElastic={0.4}
                whileDrag={{ scale: 1.05 }}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 15, power: 0.2 }}
                onDragEnd={resetPosition}
                className="w-full h-full rounded-xl"
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full rounded-xl object-cover pointer-events-none"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center py-10 z-40">
        <Button href="/join-our-team" text="Join Our Team" className="text-black font-semibold" />
      </div>
    </section>
  );
};

export default RubberSection;
