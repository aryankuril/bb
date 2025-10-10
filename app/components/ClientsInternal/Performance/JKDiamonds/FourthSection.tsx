// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { useScroll } from "framer-motion";

// interface Card {
//   title: string;
//   subtitle: string;
//   image: string;
// }

// const cards: Card[] = [
//   {
//     title: "Branding Workflow",
//     subtitle: "We dig deep into your business, audience and competitors.",
//     image: "/images/section1-img1.png",
//   },
//   {
//     title: "Creative Direction",
//     subtitle: "Design-first approach to build memorable products.",
//     image: "/images/section1-img2.png",
//   },
//   {
//     title: "Strategy & Research",
//     subtitle: "Market research to inform design & growth.",
//     image: "/images/section1-img3.png",
//   },
//   {
//     title: "Product Design",
//     subtitle: "From concept to pixel-perfect interfaces.",
//     image: "/images/section1-img4.png",
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

// Our new webinar funnel boosted high-quality lead flow by 30%, with no extra budget, while keeping the junk lead ratio far below the category average at just 20%
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
//                 <div
//                   className="flex flex-col justify-end
//                     p-4 sm:p-6 md:p-10
//                     h-[300px] sm:h-[440px] md:h-[528px]
//                     w-[70vw] sm:w-[420px] md:w-[480px]
//                     rounded-[20px]
//                     border-[5px] border-[var(--color-pirmary)]"
//                   style={{
//                     background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                 >
//                   <h3 className="text-highlight ">
//                     {card.title}
//                   </h3>
//                   <p className="body2 white-text">
//                     {card.subtitle}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FourthSection;


import { section } from 'framer-motion/client'
import React from 'react'

const FourthSection = () => {

  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative w-full">

           <div className="sticky top-0 flex items-center justify-center px-2">
        <h3
          // style={{ color: serviceColor }}
          className="text-center select-none"
        >
          {/* Our Strategy Didn’t Follow Trends, It Created Impact{" "}
          <span style={{ color: spanColor }}>Transforming</span> The Brand’s{" "}
          <span style={{ color: spanColor }}>Presence</span> And{" "}
          <span style={{ color: spanColor }}>Turning</span> Every{" "}
          <span style={{ color: spanColor }}>Interaction</span> Into{" "}
          <span style={{ color: spanColor }}>Measurable Results</span> */}
By strengthening the site's content depth, we achieved rankings for high-volume keywords, attracted a wider audience from new search queries, and increased overall user engagement.
        </h3>
      </div>
  </section>
  )
}

export default FourthSection