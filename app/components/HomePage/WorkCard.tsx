"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";
import AnimatedButton from "../AnimatedButton";
import Button from "../Button";
import Link from "next/link";

type Card = {
  title: string;
  tags: string[];
  content: string;
  image: string;
  url: string;
};

const cardsData: Card[] = [
  {
    title: "Supersox",
    tags: ["Social Media", "Meta Ads", "Shopify"],
    content:
      "Supersox had already built a solid footprint in offline retail, but their online presence was still dusty.",
    image: "/images/sm/SS.jpg",
    url: "/work/social-media-marketing/supersox",
  },
  {
    title: "Mr Blox",
    tags: ["UI UX", "Shopify"],
    content:
      "Mr Blox is a toy brand for kids 3+, with a playful Panda mascot and a parent-friendly digital presence.",
    image: "/images/webdev/MrBloxnew.jpg",
    url: "/work/website-development/mrblox",
  },
  {
    title: "SCS Sports",
    tags: ["Meta Ads", "Social Media", "SEO"],
    content:
      "We took SCS Sports, a 37-year-old legacy brand and drove 12x ROAS digitally.",
    image: "/images/sm/SCS.jpg",
    url: "/work/social-media-marketing/scssports",
  },
  {
    title: "My Suit Tailor",
    tags: ["UI UX", "Shopify", "SEO"],
    content: "We crafted a seamless bespoke tailoring e-commerce experience.",
    image: "/images/webdev/MSTnew.jpg",
    url: "/work/website-development/mysuittailor",
  },
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const router = useRouter();
  const num = cardsData.length;

  const lastCardStart = (num - 1) / num;
const headingOpacity = useTransform(
  scrollYProgress,
  [lastCardStart - 0.05, lastCardStart + 0.05],
  [1, 0]
);


  return (
    <section className=" min-h-screen container py-10 sm:py-15 lg:py-20">
      {/* <header
        className="text-center absloute z-20"
        style={{
          top: "6vh",
          marginBottom: "2vh",
        }}
      >
        <h2 className="black-text">Our Work</h2>
      </header> */}

      <div
        ref={containerRef}
        className="relative "
        style={{ height: `${num * 80}vh` }}
      >
        <motion.header
  className="text-center absloute z-20 sticky"
  style={{
    top: "6vh",
    marginBottom: "5vh",
    opacity: headingOpacity,
  }}
>
  <h2 className="black-text">Our Work</h2>
</motion.header>

        <ul className="space-y-10">
          {cardsData.map((card, i) => {
            const gap = 1 / num;

            const start = i * gap;
            const mid = start + gap * 0.7;
            const end = start + gap;

            // Move card from bottom
            // Move card from bottom with better delays for first 2 cards
            let y: any;
            if (i === 0) {
              y = useTransform(scrollYProgress, [0, gap * 0.7], [200, 0]); // first card
            } else if (i === 1) {
              y = useTransform(
                scrollYProgress,
                [gap * 0.3, gap * 1],
                [1000, 0]
              ); // delay second card
            } else {
              const startY = i * gap;
              const midY = startY + gap * 0.7;
              y = useTransform(scrollYProgress, [startY, midY], [140, 0]);
            }

            // ⬇️ Trigger blur/scale ONLY when next card is coming
            const nextStart = (i + 1) / num;
            const nextMid = nextStart + 0.12;

            // Only previous cards should blur/scale
            const scale =
              i === num - 1
                ? 1
                : useTransform(
                    scrollYProgress,
                    [nextStart, nextMid],
                    [1, 0.94]
                  );

            const blur =
              i === num - 1
                ? 0
                : useTransform(scrollYProgress, [nextStart, nextMid], [0, 3]);

            const filter = useTransform(
              blur instanceof Object ? blur : scrollYProgress,
              blur instanceof Object
                ? (b: number) => `blur(${b}px)`
                : () => `blur(0px)`
            );

            // Only show top 3 cards
            const shouldHide = i > 2;

            // Background dimming
            const bgColor = "#000000";

            // Depth layering
            const zIndex = num - i;

            // When a card is going behind, apply scale/blur gradually
            const behindScale = useTransform(
              scrollYProgress,
              [nextStart, nextMid],
              [1, 0.94]
            );
            const behindBlur = useTransform(
              scrollYProgress,
              [nextStart, nextMid],
              [0, 3]
            );
            const behindFilter = useTransform(
              behindBlur,
              (b) => `blur(${b}px)`
            );

            // Final motion style
            const motionStyle: MotionStyle = {
              y,
              scale: i === num - 1 ? 1 : behindScale,
              filter: i === num - 1 ? undefined : behindFilter,
              zIndex,
              pointerEvents: i === num - 1 ? "auto" : "none",
            };

            return (
              <li
                key={card.title}
                className="sticky"
                style={{
                  top: "20vh", // start a bit lower
                  height: "70vh", // leave space at the top/bottom
                }}
              >
                <Link href={card.url}>
                  <motion.article
                    style={motionStyle}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                    className="

                    
                      w-full h-auto
                      rounded-2xl overflow-hidden
                      shadow-xl text-white
                      grid grid-cols-1 md:grid-cols-2
                      items-stretch p-6 md:p-8 gap-6
                      cursor-pointer
                      transform-gpu
                      will-change-transform
                      bg-black
                    "
                  >
                    {/* Yellow border */}
                   <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5  candy-border"></div>
                    {/* Content */}
                    <div className="flex flex-col justify-center gap-4 z-10">
                      <h3 className="white-text">{card.title}</h3>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {card.tags.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <AnimatedButton text={t} href="/" index={idx} />
                          </button>
                        ))}
                      </div>

                      <p className="mt-4 opacity-90 body2 white-text">
                        {card.content}
                      </p>
                    </div>

                    {/* Image */}
                    <motion.div
                      // style={{ filter }}
                      className="relative w-full lg:h-[60vh] h-[30vh]"
                    >
                      {/* <div className="relative w-full lg:h-[60vh] h-[30vh]"> */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={800}
                        height={600}
                        className="object-cover rounded-3xl w-full h-full"
                        quality={100}
                        priority={i === 0}
                      />
                      {/* </div> */}
                    </motion.div>
                  </motion.article>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Button */}
        <div className="flex justify-center items-center mt-20">
          <Button href="/work" text="Explore Our Work" />
        </div>


         <div className="h-[50vh]">
          
        </div>

        {/* Spacer */}
        <div style={{ height: `${num * 8}rem` }} />
      </div>
    </section>
  );
}
