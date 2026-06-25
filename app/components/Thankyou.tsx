"use client";

import React, { useEffect } from "react";
import { motion, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import Button from "./Button";
import Image from "next/image";

/* 🎉 CONFETTI ON PAGE LOAD */
const shootBottomSideConfetti = async () => {
  const confetti = (await import("canvas-confetti")).default;

  const duration = 1500;
  const end = Date.now() + duration;
  const colors = ["#f6a81c", "#ff4d6d", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 1 },
      colors,
      startVelocity: 60,
      gravity: 0.9,
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 1 },
      colors,
      startVelocity: 60,
      gravity: 0.9,
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};
const cards = [
  { img: "/images/rubberr1.jpg", label: "Young Passionate Crowd", rotate: 10 },
  { img: "/images/rubberr2.webp", label: "Jugged Masters", rotate: -10 },
  { img: "/images/rubberr3.jpg", label: "Goldi-Cricket Champs", rotate: 10 },
  { img: "/images/rubberr4.jpeg", label: "Creative Experts", rotate: 10 },
];
const Thankyou = () => {
  // 🎉 fire confetti immediately when page loads
useEffect(() => {
  shootBottomSideConfetti();
}, []);

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

  // ✅ Safe width check for Next.js SSR
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
  return (
    <div className=" "> 
    <div className=" flex items-end justify-center px-4 min-h-[60vh] lg:mt-0 -mt-60 py-10 sm:py-15 lg:py-10">
      <div className=" text-center">
        <h1 className=" font-semibold text-highlight mb-4">
          You're Officially on Our Radar!
        </h1>

        <p className="black-text mb-8">
          Your request has been received. Expect to hear from our team within 24 hours.
        </p>

         {/* <div className="flex items-center justify-center py-10 z-40">
        <Button href="/" text="Back to Home" className="black-text font-semibold" />
      </div> */}
      </div>
    </div>
     <section className="container w-full lg:h-[100vh] h-full relative py-10 sm:py-15 lg:py-20 overflow-x-hidden overflow-y-hidden">
      <h2 className="mb-3 text-center">
        <span className="text-highlight">Our Culture </span> - Ideate, innovate, create
      </h2>

      {/* ✅ Responsive Cards Container */}
      <motion.div
        className="mt-16 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:gap-0 gap-0 px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
                ${idx !== 0 ? "sm:-ml-12 md:-ml-14 lg:-ml-10" : ""}`}
            >
              <motion.div
                style={{ x, y, rotate }}
                drag
                dragConstraints={{
                  left: -windowWidth / 2,
                  right: windowWidth / 2,
                  top: -100,
                  bottom: 100,
                }}
                dragElastic={0.4}
                whileDrag={{ scale: 1.05 }}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 15, power: 0.2 }}
                onDragEnd={resetPosition}
                className="w-full h-full rounded-xl"
              >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
  <Image
    src={card.img}
    alt={card.label}
    fill
    className="object-cover rounded-xl pointer-events-none"
    quality={100}
    sizes="(max-width: 768px) 100vw, 350px"
  />
</div>

              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center py-10 z-40">
        <Button href="/teams" text="Join Our Culture" className="text-black font-semibold" />
      </div>
    </section>
  
    </div>
  )
}

export default Thankyou