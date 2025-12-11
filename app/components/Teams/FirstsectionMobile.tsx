// FirstsectionMobile.tsx
"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FirstsectionMobile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const [targetScale, setTargetScale] = useState(1);

useLayoutEffect(() => {
  if (!zoomRef.current) return;

  const element = zoomRef.current;

  const parentRect = element.parentElement!.getBoundingClientRect();
  const imgRect = element.getBoundingClientRect();

  const scaleX = parentRect.width / imgRect.width;
  const scaleY = parentRect.height / imgRect.height;

  let fitScale = Math.max(scaleX, scaleY);

  // FORCE visible zoom (mobile needs more)
  let target = fitScale * 1.5;

  // Clamp so iPhone doesn't explode
  if (target > 1.45) target = 1.45;

  setTargetScale(target);
}, []);


  // --- Same scroll logic as Desktop ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.55", "start 0.15"], // perfect mobile scroll timing
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.2,
  });

  const scale = useTransform(smooth, [0, 1], [1, targetScale]);

  return (
    <section className="container py-0 -mt-6">
      <h1 className="black-text text-center text-sm">
        The Squad That Turns <span className="text-highlight">What If</span>’ Into <br />
        ‘<span className="text-highlight">What’s Next.</span>’
      </h1>

      {/* MAIN GRID */}
      <div className="mt-6 flex justify-center items-center">
        <div
          ref={containerRef}
          className="flex flex-col gap-2 justify-center items-center w-full rounded-[14px] overflow-hidden relative"
        >
          {/* ROW 1 */}
          <div className="flex gap-2 w-full justify-center">
            <div className="w-1/3">
              <Image
                src="/images/teams/1.png"
                alt="1"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>

            <div className="w-1/3">
              <Image
                src="/images/teams/2.png"
                alt="2"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>

            <div className="w-1/3">
              <Image
                src="/images/teams/3.png"
                alt="3"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* ROW 2 - CENTER ZOOM IMAGE */}
          <div className="flex gap-2 w-full justify-center items-center">
            <div className="w-1/3 h-[220px]">
              <Image
                src="/images/teams/4.png"
                alt="4"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>

            {/* Animated center image */}
            <motion.div
              ref={zoomRef}
              style={{ scale, transformOrigin: "center center", zIndex: 10 }}
              className="w-1/3 h-[220px] relative"
            >
              <Image
                src="/images/teams/team5.webp"
                alt="zoom"
                fill
                className="rounded-[8px] object-cover"
              />
            </motion.div>

            <div className="w-1/3 h-[220px]">
              <Image
                src="/images/teams/6.png"
                alt="6"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="flex gap-2 w-full justify-center">
            <div className="w-1/3">
              <Image
                src="/images/teams/7.png"
                alt="7"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>

            <div className="w-1/3">
              <Image
                src="/images/teams/8.png"
                alt="8"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>

            <div className="w-1/3">
              <Image
                src="/images/teams/9.png"
                alt="9"
                width={250}
                height={250}
                className="rounded-[8px] object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstsectionMobile;
