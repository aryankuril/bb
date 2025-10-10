"use client";
 
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Button";
 
type CardItem = {
  id: number;
  src: string;
  alt?: string;
  hoverText?: string;
};
 
const CardCarousel: React.FC = () => {
  const cards: CardItem[] = [
      { id: 1, src: "/images/unskippable-brands/cadini.webp", hoverText: "View Case Study" },
      { id: 2, src: "/images/unskippable-brands/carron.webp", hoverText: "Explore Work" },
      { id: 3, src: "/images/unskippable-brands/divine.webp", hoverText: "See Details" },
      { id: 4, src: "/images/unskippable-brands/manba.webp", hoverText: "Open Project" },
      { id: 5, src: "/images/unskippable-brands/supersox.webp", hoverText: "Learn More" },
      { id: 6, src: "/images/unskippable-brands/Mbmehta.webp", hoverText: "Discover" },
    ];
 
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
 
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["80%", "-42%"] : ["82%", "-27%"]
  );
 
  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] container py-10 sm:py-15 lg:py-20"
    >
      {/* Sticky wrapper keeps everything (title + cards) fixed */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden gap-5">
      <h2 className="mb-3 text-center">
        <span className="text-highlight">Bombay Blokes </span>makes ideas real
      </h2>
        {/* Title stays fixed at center */}
        {/* <div className="absolute text-center px-4 z-0">
          <h1 className="black-text">
            <span className="text-highlight">UNSKIPPABLE</span>{" "}
            <span className="black-text">BRANDS</span>
          </h1>
        </div> */}
 
        {/* Horizontal cards */}
        <motion.div
          style={{ x }}
          className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 relative z-10"
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="
                group relative flex-shrink-0
                w-[88vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw]
                h-[60vh] sm:h-[65vh] lg:h-[70vh]
                rounded-[20px] sm:rounded-[28px] overflow-hidden 
                bg-[var(--color-secondary)]
              "
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={card.src}
                  alt={card.alt ?? `Card ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 88vw, (max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
                  priority={i < 3}
                />
              </div>
 
              {/* Subtle bottom gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
 
              {/* Hover overlay */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  bg-[rgba(29,29,29,0.50)]
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                "
              >
                <span className="white-text body1 text-center px-4">
                  {card.hoverText ?? "Open"}
                </span>
              </div>
 
              {/* Click target */}
              <button
                aria-label={card.hoverText ?? `Open Card ${i + 1}`}
                className="absolute inset-0 cursor-pointer"
                onClick={() => {
                  // handle click / route / lightbox
                  console.log(`Card ${i + 1} clicked`);
                }}
              />
            </div>
          ))}
        </motion.div>

        <div className="flex justify-center items-center lg:mt-10 mt-5">
      <Button href="#" text="BOOK FREE AUDIT " className="" />
    </div>
      </div>
      
    </section>
  );
};
 
export default CardCarousel;