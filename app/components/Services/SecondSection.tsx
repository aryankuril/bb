"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Card {
  title: string;
  subtitle: string;
  image: string;
}

const cards: Card[] = [
  {
    title: "Branding Workflow",
    subtitle: "We dig deep into your business, audience and competitors.",
    image: "/images/section1-img1.png",
  },
  {
    title: "Creative Direction",
    subtitle: "Design-first approach to build memorable products.",
    image: "/images/section1-img2.png",
  },
  {
    title: "Strategy & Research",
    subtitle: "Market research to inform design & growth.",
    image: "/images/section1-img3.png",
  },
  {
    title: "Product Design",
    subtitle: "From concept to pixel-perfect interfaces.",
    image: "/images/section1-img4.png",
  },
];

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segment = 1 / cards.length;

  // ✅ Precompute transforms here
  const transforms = cards.map((_, i) => {
    const start = i * segment;
    const end = start + segment;

    const y = useTransform(scrollYProgress, [start, start + segment / 2, end], ["100%", "0%", "-100%"]);
    const opacity = useTransform(scrollYProgress, [start, start + segment / 6, end - segment / 6, end], [0, 1, 1, 0]);
    const rotate = useTransform(
      scrollYProgress,
      [start, start + segment / 2, end],
      i % 2 === 0 ? [5, 0, -5] : [-5, 0, 5]
    );

    return { y, opacity, rotate };
  });

  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative w-full">
      {/* ✅ Static Text */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0 px-2">
        <motion.h1
          style={{
            color: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [
              "#1D1D1D",
              "#F1F1F1",
              "#F1F1F1",
              "#F1F1F1",
            ]),
          }}
          className="
            text-center font-[Miso] font-normal capitalize select-none leading-[1.2]  
            tracking-[-4px] text-[80px] sm:text-[140px] md:text-[200px] lg:text-[260px] xl:text-[300px]
          "
        >
          Services
        </motion.h1>
      </div>

      {/* ✅ Scrollable Cards */}
      <div ref={containerRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => {
            const { y, opacity, rotate } = transforms[i];
            const positionClass = i % 2 === 0 ? "left-0" : "right-0";

            return (
              <motion.div
                key={i}
                style={{ y, opacity, rotate }}
                className={`absolute top-1/2 -translate-y-1/2 ${positionClass} z-10 px-2`}
              >
                <div
                  className="
                    flex flex-col justify-end
                    p-4 sm:p-6 md:p-10
                    h-[300px] sm:h-[440px] md:h-[528px]
                    w-[70vw] sm:w-[420px] md:w-[480px]
                    rounded-[20px]
                    border-[5px] border-black
                  "
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h3
                    className="
                      text-[#FAB31E]
                      font-[Miso]
                      font-normal
                      capitalize
                      leading-[1.2]
                      tracking-[-1px]
                      text-[28px] sm:text-[36px] md:text-[60px]
                    "
                  >
                    {card.title}
                  </h3>
                  <p
                    className="
                      mt-2
                      text-white
                      font-[Poppins]
                      font-normal
                      leading-normal
                      tracking-[-0.72px]
                      text-[16px] sm:text-[20px] md:text-[24px]
                    "
                  >
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
