"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import gsap from "gsap";

interface Card {
  number?: string;
  title: string;
  subtitle: string;
  image: string;
  shape: "square" | "rectangle" | "circle";
}

const cards: Card[] = [
  {
    title: "Antar",
    subtitle:
      "Your confidential digital companion for accessible mental health and wellness support, right in your pocket.",
    image: "/images/clientpage/Antar.webp",
    shape: "rectangle",
  },
  {
    title: "Earth By Blancora",
    subtitle:
      "Where timeless elegance meets modern sophistication in a curated collection of womenswear.",
    image: "/images/clientpage/blancorra.webp",
    shape: "square",
  },
  {
    title: "Cadini Italy",
    subtitle:
      "The epitome of Italian luxury, offering finely crafted formal wear for the discerning gentleman.",
    image: "/images/clientpage/Cadini.webp",
    shape: "circle",
  },
  {
    title: "Carron Clothing",
    subtitle:
      "Elevating classic board games into timeless works of handcrafted art",
    image: "/images/clientpage/Carron.webp",
    shape: "rectangle",
  },
  {
    title: "Divine Solitaire",
    subtitle:
      "Setting the standard for brilliance with perfectly cut and certified solitaire diamonds.",
    image: "/images/clientpage/Divine-solitaire.webp",
    shape: "rectangle",
  },
  {
    title: "Manba Finance",
    subtitle:
      "Your trusted financial partner, providing the support to help you achieve your goals.",
    image: "/images/clientpage/manba.webp",
    shape: "square",
  },
  {
    title: "M. B. Mehta & Co.",
    subtitle: "A legacy of trust, crafting timeless jewelry for generations.",
    image: "/images/clientpage/MB-mehta.webp",
    shape: "circle",
  },
  {
    title: "Obuka",
    subtitle:
      "Crafting exquisite, handcrafted leather shoes for the modern connoisseur.",
    image: "/images/clientpage/obuka.webp",
    shape: "rectangle",
  },
  {
    title: "RicRac Kids",
    subtitle:
      "Thoughtfully designed innerwear for Indian kids, created by parents who understand true comfort.",
    image: "/images/clientpage/Ric-Rac.webp",
    shape: "rectangle",
  },
  {
    title: "SCS Sports",
    subtitle:
      "The trusted one-stop destination for authentic gear across every sport.",
    image: "/images/clientpage/SCS.webp",
    shape: "square",
  },
];

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
         Wall of Fame        </div>
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
            const rotate =
              i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;

            return (
              <motion.div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`absolute top-1/2 md:px-4 px-2 z-10
                  ${i % 2 === 0 ? "md:left-0" : "md:right-0"} 
                  max-md:left-1/2 max-md:-translate-x-1/2`}
                style={{
                  cursor: "pointer",
                  willChange: visible ? "transform, opacity" : "auto",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  WebkitPerspective: 1000,
                  perspective: 1000,
                  translateY: "-50%",
                }}
                animate={{
                  y: `${y}%`,
                  rotate: rotate,
                  opacity: visible ? 1 : 0,
                }}
                transition={{
                  type: "tween",
                  ease: "linear",
                  duration: 0.3,
                  opacity: { duration: 0.3 },
                }}
              >
                <div
                  className="flex flex-col justify-end p-4 sm:p-6 border-[5px] border-[var(--color-primary)]"
                   style={{
    width: isMobile
      ? card.shape === "circle"
        ? "330px"
        : card.shape === "square"
        ? "330px"
        : "330px"
      : card.shape === "circle"
      ? "clamp(220px, 65vw, 480px)"
      : card.shape === "square"
      ? "clamp(220px, 75vw, 550px)"
      : "clamp(260px, 80vw, 650px)",

    height: isMobile
      ? card.shape === "circle"
        ? "350px"
        : card.shape === "square"
        ? "350px"
        : "350px"
      : card.shape === "circle"
      ? "clamp(220px, 65vw, 480px)"
      : card.shape === "square"
      ? "clamp(220px, 75vw, 480px)"
      : "clamp(260px, 60vh, 480px)",

                    borderRadius: card.shape === "circle" ? "20%" : "20px",
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    WebkitTransform: "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)",
                  }}
                >
                  <div className="text-highlight numbering">
                    {card.number}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-highlight gap-5">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base md:text-lg white-text">
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
