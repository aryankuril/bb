"use client";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Button from "../Button";
import AnimatedButton from "../AnimatedButton";
import { start } from "repl";

// ------- Demo data -------
const cardsData = [
  {
    title: "Supersox",
    tags: ["Social Media", "Meta Ads", "Shopify"],
    content:
      "Supersox had already built a solid footprint in offline retail, but their online presence was still dusty. They needed a social media strategy that not only brought in traffic but consistently turned scrollers into shoppers.",
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
      "Our challenge was to take SCS Sports, a 37-year-old legacy brand with zero online sales, and translate its offline success into digital revenue, a mission that culminated in a game-changing 12x ROAS.",
    image: "/images/sm/SCS.jpg",
    url: "/work/social-media-marketing/scssports",
  },

  {
    title: "My Suit Tailor",
    tags: [" UI UX", "Shopify ", "SEO"],
    content:
      "We partnered with My Suit Tailor to craft a translating the art of bespoke tailoring into a seamless digital experience. Our elegant e-commerce platform empowers any man to become his own tailor.",
    image: "/images/webdev/MSTnew.jpg",
    url: "/work/website-development/mysuittailor",
  },
];
 

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null);



  

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ✅ Add heavy resistance to scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,   // lower = heavier
    damping: 25,     // resistance
    mass: 1.4,       // weight feeling
  });

  // ✅ Slow it down even more
  const slowedProgress = useTransform(
    smoothProgress,
    (v) => v * 0.75
  );

  const totalCards = cardsData.length;
const step = 1 / (totalCards + 1.5);


  // ---------- FIXED: heading hide AFTER last card is centered ----------
  // last card's "hold/center" point (matches card y mapping hold)
  const lastStart = (totalCards - 1) * step;
  const lastHold = lastStart + step * 0.45;

// Use raw scrollYProgress for immediate reaction, hide only AFTER lastHold
// Range: [lastHold + small, lastHold + larger] -> [1,0]

// removed erroneous top-level opacity mapping that referenced `i` (per-card index);
// individual card opacity is computed inside the cards.map() below

const titleOpacity = useTransform(
  scrollYProgress,
  [
    lastHold + 0.25,   // ✅ wait longer after last card centers
    lastHold + 0.30    // ✅ fade later, not immediately
  ],
  [1, 0]
);



  return (
    <div className="py-0 sm:py-10 lg:py-20">

      {/* ⬇️ Bigger height = slower scroll */}
      <section
        ref={sectionRef}
        className="relative w-full h-[450vh]"
      >
        <div className="container mx-auto h-full">
          <div className="sticky top-0 py-0 sm:py-10 lg:py-10">

            {/* ✅ Title with fade (only heading logic changed) */}
            <motion.div
              className="sticky top-0 z-30 pointer-events-none"
              style={{ opacity: titleOpacity }}
            >
              <div className="flex justify-center">
                <h2 className="text-center black-text">
                  Our Work
                </h2>
              </div>
            </motion.div>


            {/* Cards */}
            <div className="relative w-full pt-20 sm:pt-24 lg:pt-32 mt-15 p-5">
              {cardsData.map((card, i) => {
               const start = i * step;
const hold = start + step * 0.45;
const fade = start + step * 0.9; // fade only when next card nearly visible
const end = start + step * 1.2;


const activeCardIndex = useTransform(slowedProgress, (p) => {
  return Math.min(Math.floor(p / step), totalCards - 1);
});

zIndex: useTransform(activeCardIndex, (active) => {
  const distance = Math.abs(active - i);
  return 100 - distance;   // closer cards are on top
})

// cards behind move UP (top stays visible)
const stackOffset = useTransform(
  slowedProgress,
  [start, hold, fade, end],
  i === totalCards - 1
    ? [0, 0, 0, 0]
    : [0, 0, -20 * (i + 1), -35 * (i + 1)]
);


// ✅ Card moves in and STOPS
const y = useTransform(
  [slowedProgress, stackOffset],
  (values: number[]) => {
    const [p, stack] = values;

    const base =
      p < start ? 1000 :      // fully off-screen
      p < hold ? 0 :
      p < fade ? 0 :
      -10;

    return base + stack;
  }
);





const scale = useTransform(
  slowedProgress,
  [start, hold, fade, end],
  i === totalCards - 1
    ? [1, 1, 1, 1]
    : [1, 1, 1 - 0.05 * (i + 1), 1 - 0.08 * (i + 1)]
);


  // Blur effect: ONLY cards behind get blurred
  const blur = useTransform(activeCardIndex, (active) =>
    active === i ? "blur(0px)" : "blur(10px)"
  );


// Opacity (reduce *just a little*, NOT disappear)
const opacity = useTransform(
  slowedProgress,
  [start, hold, fade, end],
  i === totalCards - 1
    ? [1, 1, 1, 1]
    : [1, 1, 0.85, 0.7] // softer but still visible
);




                return (
                 <motion.div
  key={i}
 style={{
  zIndex: useTransform(activeCardIndex, (active) => {
    const distance = Math.abs(active - i);
    return 100 - distance;
  }),
  y,
  scale,
  opacity,
  filter: blur
}}



  className="absolute top-0 left-1/2 -translate-x-1/2 w-full 
             h-[clamp(440px,72vh,700px)] rounded-3xl 
             white-text overflow-hidden transform-gpu"
>


                    {/* Card */}
                    <div className="relative h-full rounded-3xl bg-black/95 border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

<div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5  candy-border"></div>
                      {/* Left */}
                      <div className="flex flex-col justify-center">
                        <h3 className="white-text">{card.title}</h3>

                        <div className="flex flex-wrap mt-4">
                          {card.tags.map((t, idx) => (
                            <span key={idx} className="px-1 py-1 text-white">
                              <AnimatedButton text={t} href="/" index={idx} />
                            </span>
                          ))}
                        </div>

                        <p className="mt-4 sm:mt-6 opacity-90 body2 white-text">
                          {card.content}
                        </p>
                      </div>

                      {/* Image */}
                      <div className="w-full flex items-center justify-center">
                        <div className="relative w-full lg:h-[60vh] h-[30vh]">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={800}
                            height={600}
                            className="object-cover rounded-3xl w-full h-full"
                            priority={i === 0}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Click */}
                    <a
                      href={card.url}
                      className="absolute inset-0 z-50 block"
                      style={{ background: "transparent" }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Small tail space */}
      <div className="lg:h-[50vh] h-[60vh]" />

      <div className="flex justify-center mt-10">
        <Button href="/work" text="Explore Our Work" />
       </div>
    </div>
  );
}
