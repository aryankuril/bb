"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

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

  // 👇 store live scroll progress in state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  const segment = 1 / cards.length;

  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative w-full">
      {/* Sticky Title */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0 px-2">
        <h1
          style={{
            color: progress < 0.05 ? "#1D1D1D" : "#F1F1F1",
            transition: "color 0.3s linear",
          }}
          className="text-center font-[Miso] font-normal capitalize select-none leading-[1.2]  
            tracking-[-4px] text-[80px] sm:text-[140px] md:text-[200px] lg:text-[260px] xl:text-[300px]"
        >
          Services
        </h1>
      </div>

      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => {
            const start = i * segment;
            const end = start + segment;

            // check visibility of each card
            const visible = progress >= start && progress <= end;
            const localProgress = Math.min(
              Math.max((progress - start) / segment, 0),
              1
            );

            const y = 100 - localProgress * 200; // moves from bottom → center → top
            const opacity =
              localProgress < 0.2
                ? localProgress * 5
                : localProgress > 0.8
                ? (1 - localProgress) * 5
                : 1;
            const rotate =
              i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;

            return (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  i % 2 === 0 ? "left-0" : "right-0"
                } z-10 px-2`}
                style={{
                  transform: `translateY(${y}%) rotate(${rotate}deg)`,
                  opacity: visible ? opacity : 0,
                  transition: "transform 0.3s linear, opacity 0.3s linear",
                }}
              >
                <div
                  className="flex flex-col justify-end
                    p-4 sm:p-6 md:p-10
                    h-[300px] sm:h-[440px] md:h-[528px]
                    w-[70vw] sm:w-[420px] md:w-[480px]
                    rounded-[20px]
                    border-[5px] border-black"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
