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










































// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { useScroll } from "framer-motion";

// interface Card {

//   image: string;
// }

// const cards: Card[] = [
//   {

//     image: "/images/pm/chaterbox1.png",
//   },
//   {

//     image: "/images/pm/chaterbox2.png",
//   },
//   {

//     image: "/images/pm/chaterbox3.png",
//   },
//   {
    
//     image: "/images/pm/chaterbox4.png",
//   },
// ];

// const FourthSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     return scrollYProgress.on("change", (v) => setProgress(v));
//   }, [scrollYProgress]);

//   const segment = 1 / cards.length;

//   // Manual color interpolation based on scroll progress
//   const getColor = (start: number, end: number, fromColor: string, toColor: string) => {
//     if (progress < start) return fromColor;
//     if (progress > end) return toColor;

//     const localProgress = (progress - start) / (end - start);

//     // simple interpolation for HEX colors (assumes colors like "#RRGGBB")
//     const hexToRgb = (hex: string) => hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
//     const rgbToHex = (r: number, g: number, b: number) =>
//       `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

//     const [r1, g1, b1] = hexToRgb(fromColor);
//     const [r2, g2, b2] = hexToRgb(toColor);

//     const r = Math.round(r1 + (r2 - r1) * localProgress);
//     const g = Math.round(g1 + (g2 - g1) * localProgress);
//     const b = Math.round(b1 + (b2 - b1) * localProgress);

//     return rgbToHex(r, g, b);
//   };

//   // Example color ranges
//   const serviceColor = getColor(0, 1, "#1D1D1D", "#F1F1F1");
//   const spanColor = getColor(0, 1, "#FAB31E", "#F1F1F1");

//   return (
//     <section className="container py-10 sm:py-15 lg:py-20 relative w-full">
//       {/* Sticky Title */}
//       <div className="sticky top-0 h-screen flex items-center justify-center px-2">
//         <h3
//           style={{ color: serviceColor }}
//           className="text-center select-none"
//         >
//           {/* Our Strategy Didn’t Follow Trends, It Created Impact{" "}
//           <span style={{ color: spanColor }}>Transforming</span> The Brand’s{" "}
//           <span style={{ color: spanColor }}>Presence</span> And{" "}
//           <span style={{ color: spanColor }}>Turning</span> Every{" "}
//           <span style={{ color: spanColor }}>Interaction</span> Into{" "}
//           <span style={{ color: spanColor }}>Measurable Results</span> */}

// Sales scaled to ₹30L+ per month—sustainably. ROAS has consistently held above 3x, even at higher spends.    
//         </h3>
//       </div>

//       {/* Scrollable Cards */}
//       <div ref={containerRef} className="relative h-[400vh] z-10">
//         <div className="sticky top-0 h-screen overflow-hidden">
//           {cards.map((card, i) => {
//             const start = i * segment;
//             const end = start + segment;

//             const visible = progress >= start && progress <= end;
//             const localProgress = Math.min(Math.max((progress - start) / segment, 0), 1);

//             const y = 100 - localProgress * 200;
//             const rotate = i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;

//             return (
//               <div
//                 key={i}
//                 className={`absolute top-1/2 -translate-y-1/2 ${
//                   i % 2 === 0 ? "left-0" : "right-0"
//                 } z-10 px-2`}
//                 style={{
//                   transform: `translateY(${y}%) rotate(${rotate}deg)`,
//                   opacity: visible ? 1 : 0,
//                   transition: "transform 0.3s linear, opacity 0.3s linear",
//                 }}
//               >
//                  <div
//   className="
//     relative
//     p-4 sm:p-6 md:p-10
//     h-[300px] sm:h-[440px] md:h-[450px]
//     w-[70vw] sm:w-[420px] md:w-[350px]
//     rounded-[20px]
//     overflow-hidden
//   "
// >
//   <img
//     src={card.image}
//     alt=""
//     className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
//   />
// </div>

//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FourthSection;


// import { section } from 'framer-motion/client'
// import React from 'react'

// const FourthSection = () => {

//   return (
//     <section className="container py-10 sm:py-15 lg:py-20 relative w-full">

//            <div className="sticky top-0 h-[50vh] flex items-center justify-center px-2">
//         <h3
//           // style={{ color: serviceColor }}
//           className="text-center select-none"
//         >
//           {/* Our Strategy Didn’t Follow Trends, It Created Impact{" "}
//           <span style={{ color: spanColor }}>Transforming</span> The Brand’s{" "}
//           <span style={{ color: spanColor }}>Presence</span> And{" "}
//           <span style={{ color: spanColor }}>Turning</span> Every{" "}
//           <span style={{ color: spanColor }}>Interaction</span> Into{" "}
//           <span style={{ color: spanColor }}>Measurable Results</span> */}
// Sales scaled to ₹30L+ per month—sustainably. ROAS has consistently held above 3x, even at higher spends.        </h3>
//       </div>
//   </section>
//   )
// }

// export default FourthSection