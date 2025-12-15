"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";

interface Card {

  image: string;
}

const cards: Card[] = [
  {

    image: "/images/sm/ss1.webp",
  },
  {

    image: "/images/sm/ss2.webp",
  },
  {

    image: "/images/sm/ss3.webp",
  },
  {
    
    image: "/images/sm/ss4.webp",
  },
];

const FourthSection = () => {
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

  // Manual color interpolation based on scroll progress
  const getColor = (start: number, end: number, fromColor: string, toColor: string) => {
    if (progress < start) return fromColor;
    if (progress > end) return toColor;

    const localProgress = (progress - start) / (end - start);

    // simple interpolation for HEX colors (assumes colors like "#RRGGBB")
    const hexToRgb = (hex: string) => hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
    const rgbToHex = (r: number, g: number, b: number) =>
      `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

    const [r1, g1, b1] = hexToRgb(fromColor);
    const [r2, g2, b2] = hexToRgb(toColor);

    const r = Math.round(r1 + (r2 - r1) * localProgress);
    const g = Math.round(g1 + (g2 - g1) * localProgress);
    const b = Math.round(b1 + (b2 - b1) * localProgress);

    return rgbToHex(r, g, b);
  };

  // Example color ranges
  const serviceColor = getColor(0, 1, "#1D1D1D", "#F1F1F1");
  const spanColor = getColor(0, 1, "#FAB31E", "#F1F1F1");

  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative w-full">
      {/* Sticky Title */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-2">
        <h3
          style={{ color: serviceColor }}
          className="text-center select-none"
        >
          {/* Our Strategy Didn’t Follow Trends, It Created Impact{" "}
          <span style={{ color: spanColor }}>Transforming</span> The Brand’s{" "}
          <span style={{ color: spanColor }}>Presence</span> And{" "}
          <span style={{ color: spanColor }}>Turning</span> Every{" "}
          <span style={{ color: spanColor }}>Interaction</span> Into{" "}
          <span style={{ color: spanColor }}>Measurable Results</span> */}

By aligning fun, high-performing creative with the brand’s DNA, we drove skyrocketing ROAS and boosted sales, successfully transforming Supersox from a retail presence to an e-commerce success.
        </h3>
      </div>

      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => {
            const start = i * segment;
            const end = start + segment;

            const visible = progress >= start && progress <= end;
            const localProgress = Math.min(Math.max((progress - start) / segment, 0), 1);

            const y = 100 - localProgress * 200;
            const rotate = i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;

            return (
              <div
                key={i}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  i % 2 === 0 ? "left-0" : "right-0"
                } z-10 px-2`}
                style={{
                  transform: `translateY(${y}%) rotate(${rotate}deg)`,
                  opacity: visible ? 1 : 0,
                  transition: "transform 0.3s linear, opacity 0.3s linear",
                }}
              >
                 <div
  className="
    relative
    p-4 sm:p-6 md:p-10
    h-[300px] sm:h-[440px] md:h-[450px]
    w-[70vw] sm:w-[420px] md:w-[350px]
    rounded-[20px]
    overflow-hidden
  "
>
  <img
    src={card.image}
    alt=""
    className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
  />
</div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FourthSection;



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
// By aligning fun, high-performing creative with the brand’s DNA, we drove skyrocketing ROAS and boosted sales, successfully transforming Supersox from a retail presence to an e-commerce success.

//         </h3>
//       </div>
//   </section>
//   )
// }

// export default FourthSection