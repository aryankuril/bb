"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";

interface Card {
  title: string;
  subtitle: string;
  image: string;
}

const cards: Card[] = [
  {
    title: "Antar",
    subtitle: "Your confidential digital companion for accessible mental health and wellness support, right in your pocket.",
    image: "/images/clientpage/Antar.webp",
  },
  {
    title: "Blancorra",
    subtitle: "Where timeless elegance meets modern sophistication in a curated collection of womenswear.",
    image: "/images/clientpage/blancorra.webp",
  },
  {
    title: "Cadini",
    subtitle: "The epitome of Italian luxury, offering finely crafted formal wear for the discerning gentleman.",
    image: "/images/clientpage/Cadini.webp",
  },
  {
    title: "Carron",
    subtitle: "Elevating classic board games into timeless works of handcrafted art",
    image: "/images/clientpage/Carron.webp",
  },
    {
    title: "Divine Solitaire",
    subtitle: "Setting the standard for brilliance with perfectly cut and certified solitaire diamonds.",
    image: "/images/clientpage/Divine-solitaire.webp",
  },
  {
    title: "Manba Finance",
    subtitle: "Your trusted financial partner, providing the support to help you achieve your goals.",
    image: "/images/clientpage/manba.webp",
  },
  {
    title: "MB Mehta ",
    subtitle: "A legacy of trust, crafting timeless jewelry for generations.",
    image: "/images/clientpage/MB-mehta.webp",
  },
  {
    title: "Obuka",
    subtitle: "Crafting exquisite, handcrafted leather shoes for the modern connoisseur.",
    image: "/images/clientpage/obuka.webp",
  },
    {
    title: "Ric Rac",
    subtitle: "Thoughtfully designed innerwear for Indian kids, created by parents who understand true comfort.",
    image: "/images/clientpage/Ric-Rac.webp",
  },
  {
    title: "SCS",
    subtitle: "The trusted one-stop destination for authentic gear across every sport.",
    image: "/images/clientpage/SCS.webp",
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
    <section id="second-section" className="container py-10 sm:py-15 lg:py-20 relative w-full">
      {/* Sticky Title */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0 px-2">
        <div
          style={{
            color: progress < 0.05 ? "#1D1D1D" : "#F1F1F1",
            transition: "color 0.3s linear",
          }}
          className="ext-center single-title  select-none "
        >
          Clients
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

            // only slide + rotate, no fade
            const y = 100 - localProgress * 200;
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
                  opacity: visible ? 1 : 0, // 👈 no fading in/out, just snap
                  transition: "transform 0.3s linear, opacity 0.3s linear",
                }}
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
                  <h3 className="text-highlight">
                    {card.title}
                  </h3>
                  <p className="mt-2 white-text body2">
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
