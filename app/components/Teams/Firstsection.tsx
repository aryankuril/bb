"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Firstsection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const secondImgRef = useRef<HTMLDivElement>(null);

  const [targetScale, setTargetScale] = useState(1);




  const recalcScale = () => {
  if (!secondImgRef.current || !containerRef.current) return;

  const element = secondImgRef.current;
  const container = containerRef.current;

  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const scaleX = containerRect.width / elementRect.width;
  const scaleY = containerRect.height / elementRect.height;

  const fitScale = Math.max(scaleX, scaleY);

setTargetScale(Math.max(1, fitScale * 0.88));

};

  /** 🔥 Calculate correct scale (GSAP-style) */
useLayoutEffect(() => {
  recalcScale(); // initial try
}, []);


const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"],
});

const smoothScroll = useSpring(scrollYProgress, {
  stiffness: 120,
  damping: 20,
  mass: 0.15,
});

// 🚀 FULL ZOOM on small scroll (0 → 0.02)
const scale = useTransform(smoothScroll, [0, 0.01], [1, targetScale]);


  return (
    <section className="container py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10">
      <h1 className="black-text text-center md:text-left">
        The Squad That Turns <span className="text-highlight">What If</span>’
        Into <br />‘<span className="text-highlight">What’s Next.</span>’
      </h1>

      <div className="mt-10 flex justify-center items-center">
        <div
          ref={containerRef}
          className="flex flex-col lg:gap-4 gap-1 justify-center items-center w-full h-auto  lg:w-[1295px] lg:h-[650px] rounded-[20px] overflow-hidden relative"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center lg:mt-20 mt-0 ">
            <div className="w-[32%] max-w-[562px] lg:w-[562px]  ">
              <Image
                src="/images/teams/1.png"
                alt="Big Image"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[32%] max-w-[350px] lg:w-[350px]">
              <Image
                src="/images/teams/2.png"
                alt="Small 1"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[32%] max-w-[350px] lg:w-[350px]">
              <Image
                src="/images/teams/3.png"
                alt="Small 2"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[250px] flex-shrink-0">
              <Image
                src="/images/teams/4.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            {/* 🔥 Animated zoom image */}
            <motion.div
  ref={secondImgRef}
  style={{
    scale,
    transformOrigin: "center center",
    zIndex: 10,
    willChange: "transform",
    WebkitTransform: "translateZ(0)",
  }}
  className="w-[32%] max-w-[562px] lg:w-[562px] lg:h-[370px] h-[250px] flex-shrink-0 relative"
>
 <Image
  src="/images/teams/team5.webp"
  alt="Hands Zoom"
  width={600}
  height={400}
  onLoadingComplete={recalcScale}   // ⭐ FIXES IPHONE BUG ⭐
  className="absolute inset-0 w-full h-full lg:rounded-[30px] rounded-[10px] object-cover"
/>

</motion.div>


            <div className="w-[30%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[250px] flex-shrink-0">
              <Image
                src="/images/teams/6.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0 ">
              <Image
                src="/images/teams/7.png"
                alt="Woman"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image
                src="/images/teams/8.png"
                alt="Man"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[30%] max-w-[562px] lg:w-[562px] flex-shrink-0">
              <Image
                src="/images/teams/9.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Firstsection;