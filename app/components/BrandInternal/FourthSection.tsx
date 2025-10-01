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

const FourthSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segment = 1 / cards.length;
  const startRange = segment * 0.1;
  const endRange = 1 - segment * 0.1;

  // Top-level transforms for heading
  const serviceColor = useTransform(
    scrollYProgress,
    [0, startRange, endRange, 1],
    ["#1D1D1D", "#F1F1F1", "#F1F1F1", "#F1F1F1"]
  );

  const spanColor = useTransform(scrollYProgress, [0, startRange, endRange, 1], [
    "#FAB31E",
    "#F1F1F1",
    "#F1F1F1",
    "#F1F1F1",
  ]);

  // Precompute card transforms **at top level**
  const cardTransforms = cards.map((_, i) => ({
    y: useTransform(scrollYProgress, [i * segment, i * segment + segment / 2, (i + 1) * segment], ["100%", "0%", "-100%"]),
    opacity: useTransform(
      scrollYProgress,
      [i * segment, i * segment + segment / 6, (i + 1) * segment - segment / 6, (i + 1) * segment],
      [0, 1, 1, 0]
    ),
    rotate: useTransform(
      scrollYProgress,
      [i * segment, i * segment + segment / 2, (i + 1) * segment],
      i % 2 === 0 ? [5, 0, -5] : [-5, 0, 5]
    ),
  }));

  return (
    <section className="container relative w-full">
      {/* Heading */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-2">
        <motion.h1
          style={{ color: serviceColor }}
          className="text-center font-[Miso] font-normal leading-[1.3] tracking-[-1px] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px]"
        >
          Our Strategy Didn&apos;t Follow Trends, It Created Impact{" "}
          <motion.span style={{ color: spanColor }}>Transforming</motion.span> The Brand&apos;s{" "}
          <motion.span style={{ color: spanColor }}>Presence</motion.span> And{" "}
          <motion.span style={{ color: spanColor }}>Turning</motion.span> Every{" "}
          <motion.span style={{ color: spanColor }}>Interaction</motion.span> Into{" "}
          <motion.span style={{ color: spanColor }}>Measurable Results</motion.span>
        </motion.h1>
      </div>

      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              style={cardTransforms[i]}
              className={`absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? "left-0" : "right-0"} z-10 px-2`}
            >
              <div
                className="flex flex-col justify-end p-4 sm:p-6 md:p-10 h-[300px] sm:h-[440px] md:h-[528px] w-[70vw] sm:w-[420px] md:w-[480px] rounded-[20px] border-[5px] border-black"
                style={{
                  background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h3 className="text-[#FAB31E] font-[Miso] font-normal capitalize leading-[1.2] tracking-[-1px] text-[28px] sm:text-[36px] md:text-[60px]">
                  {card.title}
                </h3>
                <p className="mt-2 text-white font-[Poppins] font-normal leading-normal tracking-[-0.72px] text-[16px] sm:text-[20px] md:text-[24px]">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
