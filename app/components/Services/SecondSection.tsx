"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";

interface Card {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  shape: "square" | "rectangle" | "circle";
}

const cards: Card[] = [
  {
    title: "Web Development",
    subtitle:
      "We build pixel-perfect websites and digital experiences that aren't just beautiful, but are engineered to convert.",
    image: "/images/servicespage/Development.png",
    link: "/services/website-development",
    shape: "rectangle",
  },
  {
    title: "Performance Marketing",
    subtitle:
      "We create data-driven ad campaigns that deliver measurable results, turning clicks into customers and spend into revenue.",
    image: "/images/servicespage/Performance.png",
    link: "/services/performance-marketing",
    shape: "square",
  },
  {
    title: "SEO Optimization",
    subtitle:
      "We put your brand at the top of Google, connecting you with customers who are already searching for you.",
    image: "/images/servicespage/SEO.png",
    link: "/services/seo-services",
    shape: "circle",
  },
  // 
  {
    title: "Social Media Management",
    subtitle:
      "We build and nurture your online community, turning followers into loyal fans through creative content and authentic engagement.",
    image: "/images/servicespage/Social-Media.png",
    link: "/services/social-media-marketing",
    shape: "rectangle",
  },
];

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  const segment = 1 / cards.length;

  return (
    <section
      id="second-section"
      className="container py-10 sm:py-15 lg:py-20 relative w-full"
    >
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

            const cardRef = useRef<HTMLDivElement>(null);

            return (
              <Link key={i} href={card.link} scroll={true}>
  <div
    ref={cardRef}
    className={`absolute top-1/2 -translate-y-1/2 md:px-4 px-2 z-10
      ${i % 2 === 0 ? "md:left-0" : "md:right-0"} 
      max-md:left-1/2 max-md:-translate-x-1/2`}
    style={{
      transform: `translateY(${y}%) rotate(${rotate}deg)`,
      opacity: visible ? 1 : 0,
      transition: "transform 0.3s linear, opacity 0.3s linear",
      cursor: "pointer",
    }}
    onClick={(e) => {
      e.preventDefault();
      if (!cardRef.current) return;

      // Animate card before navigating
      gsap.to(cardRef.current, {
        y: "100vh",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          window.location.href = card.link;
        },
      });
    }}
  >
   <div
                  className="flex flex-col justify-end p-4 sm:p-6 border-[5px] border-[var(--color-primary)]"
                  style={{
                    width:
                      card.shape === "circle"
                        ? "clamp(220px, 65vw, 480px)"
                        : card.shape === "square"
                        ? "clamp(220px, 75vw, 400px)"
                        : "clamp(260px, 80vw, 650px)",
                    height:
                      card.shape === "circle"
                        ? "clamp(220px, 65vw, 440px)"
                        : card.shape === "square"
                        ? "clamp(220px, 75vw, 400px)"
                        : "clamp(260px, 60vh, 350px)",
                    borderRadius: card.shape === "circle" ? "20%" : "20px",
                    background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                 >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-highlight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base md:text-lg white-text">
                    {card.subtitle}
                  </p>
                </div>
  </div>
</Link>

            );
          })}
        </div>
      </div>
    </section>
  );
}
