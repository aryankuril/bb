"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

interface Card {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const cards: Card[] = [
  {
    title: "Web Development",
    subtitle:
      "Custom websites and applications built with modern technologies to deliver performance and scalability.",
    image: "/images/section1-img1.png",
    link: "/website-design",
  },
  {
    title: "Performance Marketing",
    subtitle:
      "Data-driven marketing strategies to maximize ROAS and drive measurable business growth.",
    image: "/images/section1-img2.png",
    link: "/performance-maketing",
    
  },
  {
    title: "SEO Optimization",
    subtitle:
      "On-page and off-page SEO solutions to boost visibility, organic traffic, and search engine rankings.",
    image: "/images/section1-img3.png",
    link: "/seo",
  },
  {
    title: "Social Media Management",
    subtitle:
      "Engaging content and campaigns to grow, nurture, and retain your social audience effectively.",
    image: "/images/section1-img4.png",
    link: "/social-media",
  },
];

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  const segment = 1 / cards.length;

  return (
    <section id="second-section" className="container py-10 sm:py-15 lg:py-20 relative w-full">
      {/* Sticky Title */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0 px-2">
        <div
          style={{
            color: progress < 0.05 ? "#1D1D1D" : "#F1F1F1",
            transition: "color 0.3s linear",
          }}
          className="text-center single-title select-none"
        >
          Services
        </div>
      </div>

      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => {
            const start = i * segment;
            const end = start + segment;

            const visible = progress >= start && progress <= end;
            const localProgress = Math.min(
              Math.max((progress - start) / segment, 0),
              1
            );

            const y = 100 - localProgress * 200;
            const rotate = i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;

            return (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? "left-0" : "right-0"} z-10 px-2`}
                style={{
                  transform: `translateY(${y}%) rotate(${rotate}deg)`,
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.3s linear, opacity 0.3s linear",
                  cursor: "pointer",
                }}
                onClick={() => router.push(card.link)}
              >
                <div
                  className="flex flex-col justify-end
                    p-4 sm:p-6 md:p-10
                    h-[300px] sm:h-[440px] md:h-[528px]
                    w-[70vw] sm:w-[420px] md:w-[480px]
                    rounded-[20px]
                    border-[5px] border-[var(--color-primary)]"
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h3 className="text-highlight">{card.title}</h3>
                  <p className="mt-2 white-text body2">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
