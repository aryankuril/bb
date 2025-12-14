"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ZoomParallax = forwardRef<HTMLDivElement, {}>(function ZoomParallax(
  _props,
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: "/images/teams/team1.webp", scale: scale4 },
    { src: "/images/teams/team1.webp", scale: scale5 },
    { src: "/images/teams/team1.webp", scale: scale6 },
    { src: "/images/teams/team1.webp", scale: scale5 },
    { src: "/images/teams/team1.webp", scale: scale6 },
    { src: "/images/teams/team1.webp", scale: scale8 },
    { src: "/images/teams/team1.webp", scale: scale9 },
  ];

  return (
    <div ref={ref}>
      <div ref={containerRef} className="containerr">
        <div className="sticky">
          {pictures.map(({ src, scale }, index) => (
            <motion.div key={index} style={{ scale }} className="el">
              <div className="imageContainer">
                <Image
                  src={src}
                  alt="team"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ZoomParallax;
