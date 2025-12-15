"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
interface Card {

  image: string;

}
const cards: Card[] = [
  {

      image: "/images/pm/chaterbox1.png",

  },
  {
    image: "/images/pm/chaterbox1.png",
    
  },
  {
   image: "/images/pm/chaterbox1.png",
   
  },
  {
     image: "/images/pm/chaterbox1.png",
   
  },
  
];
export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const isMobile =
  typeof window !== "undefined" && window.innerWidth <= 768;
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
        <h3
          style={{
            color: progress < 0.05 ? "#1D1D1D" : "#F1F1F1",
            transition: "color 0.3s linear",
          }}
          className="text-center select-none"
        >
Sales scaled to ₹30L+ per month—sustainably. ROAS has consistently held above 3x, even at higher spends.  
        </h3>
      </div>
      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[800vh] z-10">
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
                  onClick={(e) => {
                    e.preventDefault();
                    const cardElement = cardRefs.current[i];
                    if (!cardElement) return;
                    // Animate card before navigating
                    gsap.to(cardElement, {
                      y: "100vh",
                      opacity: 0,
                      duration: 0.6,
                      ease: "power3.inOut",
                      
                    });
                  }}
                >
                  <div className="flex flex-col justify-end h-[300px] sm:h-[440px] md:h-[450px]
    w-[70vw] sm:w-[420px] md:w-[350px]
     rounded-[20px]
     overflow-hidden ">
  <img
    src={card.image}
    alt="Card image"
    className="w-full h-full object-cover rounded-lg"
  />
</div>

                </motion.div>

            );
          })}
        </div>
      </div>
    </section>
  );
}





