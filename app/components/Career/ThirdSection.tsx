// "use client";
// import React, { useEffect, useRef, useState } from "react";

// /* -------------------- Card Component -------------------- */
// interface CardProps {
//   imgSrc: string;
//   videoSrc: string;
//   tag?: string;
//   isActive?: boolean;
//   desktopMode?: boolean;
// }

// const Card: React.FC<CardProps> = ({
//   imgSrc,
//   videoSrc,
//   tag,
//   isActive = false,
//   desktopMode = false,
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [canPlaySound, setCanPlaySound] = useState(false);
//   const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
//     null
//   );

//   // allow sound after first user interaction
//   useEffect(() => {
//     const handleUserClick = () => setCanPlaySound(true);
//     window.addEventListener("click", handleUserClick, { once: true });
//     return () => window.removeEventListener("click", handleUserClick);
//   }, []);

//   // Desktop hover play/pause
//   const handleMouseEnter = () => {
//     if (!desktopMode || !videoRef.current) return;
//     videoRef.current.muted = !canPlaySound;
//     videoRef.current.play().catch(() => {});
//   };
//   const handleMouseLeave = () => {
//     if (!desktopMode || !videoRef.current) return;
//     videoRef.current.pause();
//     videoRef.current.currentTime = 0;
//     videoRef.current.muted = true;
//     setCursorPos(null); // hide tag when leaving
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!desktopMode) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     setCursorPos({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   // Mobile autoplay logic
//   useEffect(() => {
//     if (desktopMode || !videoRef.current) return;

//     if (isActive) {
//       videoRef.current.play().catch(() => {});
//       videoRef.current.muted = !canPlaySound ? true : false;
//     } else {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//   }, [isActive, desktopMode, canPlaySound]);

//   return (
//     <div
//       className="group w-[260px] md:w-[350px] relative rounded-2xl overflow-hidden
//                  transform transition-all duration-500
//                  md:hover:z-50 md:hover:-translate-y-2 md:hover:scale-105"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={handleMouseMove}
//     >
//       <img
//         src={imgSrc}
//         alt="Card"
//         className={`w-full h-full object-cover absolute top-0 left-0 z-0
//           transition-opacity duration-500
//           ${desktopMode ? "md:group-hover:opacity-0" : ""}
//           ${!desktopMode && isActive ? "opacity-0" : "opacity-100"}`}
//       />
//       <video
//         ref={videoRef}
//         loop
//         playsInline
//         className="w-full h-full object-cover z-0"
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>

//       {/* Hover Tag following cursor */}
// {/* {desktopMode && tag && cursorPos && (
//   <div
//     className="absolute pointer-events-none bg-[#FAB31E] text-black font-medium 
//                py-2 px-4 rounded-full text-sm shadow-md whitespace-nowrap
//                transition-all duration-75 z-50"   // 👈 added z-20
//     style={{
//       left: cursorPos.x + 15,
//       top: cursorPos.y + 15,
//     }}
//   >
//     {tag}
//   </div>
// )} */}

//     </div>
//   );
// };

// /* -------------------- Mobile Slider -------------------- */
// const MobileSlider: React.FC<{ cards: { img: string; video: string }[] }> = ({
//   cards,
// }) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [sectionInView, setSectionInView] = useState(false);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Observe section visibility
//   useEffect(() => {
//     const sec = sectionRef.current;
//     if (!sec) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setSectionInView(entry.isIntersecting),
//       { threshold: 0.4 }
//     );
//     obs.observe(sec);
//     return () => obs.disconnect();
//   }, []);

//   // Find center card on scroll
//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const onScroll = () => {
//       if (!sectionInView) {
//         setActiveIndex(null);
//         return;
//       }
//       const sliderRect = slider.getBoundingClientRect();
//       const centerX = sliderRect.left + sliderRect.width / 2;

//       let closest = -1;
//       let minDist = Infinity;

//       slider.querySelectorAll<HTMLElement>(".card-item").forEach((el, idx) => {
//         const rect = el.getBoundingClientRect();
//         const cardCenter = rect.left + rect.width / 2;
//         const dist = Math.abs(cardCenter - centerX);
//         if (dist < minDist) {
//           minDist = dist;
//           closest = idx;
//         }
//       });
//       setActiveIndex(closest);
//     };

//     slider.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => slider.removeEventListener("scroll", onScroll);
//   }, [sectionInView]);

//   // Pagination click scroll
//   const handlePaginationClick = (index: number) => {
//     const slider = sliderRef.current;
//     if (!slider) return;
//     const card = slider.children[index] as HTMLElement;
//     const cardLeft = card.offsetLeft;
//     const cardWidth = card.offsetWidth;
//     const sliderWidth = slider.offsetWidth;
//     const scrollTo = cardLeft - sliderWidth / 2 + cardWidth / 2;

//     slider.scrollTo({
//       left: scrollTo,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div ref={sectionRef} className="md:hidden">
//       {/* Pagination buttons */}
//       <div className="flex justify-center mb-4">
//         {cards.map((card, index) => (
//           <React.Fragment key={index}>
//             <button
//               onClick={() => handlePaginationClick(index)}
//               className={`w-12 h-12 rounded-full overflow-hidden border-2
//                 ${activeIndex === index ? "border-[var(--color-highlight)]" : "border-gray-300"}`}
//             >
//               <img
//                 src={card.img}
//                 alt={`Card ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//             {index !== cards.length - 1 && (
//               <div className="w-5 h-[2px] bg-black self-center mx-2" />
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Slider */}
//       <div
//         ref={sliderRef}
//         className="overflow-x-auto flex space-x-20 snap-x snap-mandatory px-6 scrollbar-none"
//       >
//         {cards.map((card, i) => (
//           <div key={i} className="card-item flex-shrink-0 w-[70%] snap-center">
//             <Card
//               imgSrc={card.img}
//               videoSrc={card.video}
//               isActive={sectionInView && activeIndex === i}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const ThirdSection :React.FC = () => {
//   const cards = [
//     { img: "/images/man1.png", video: "/video/cardvideo-1.mp4", tag: "More About Cabin" },
//     { img: "/images/man2.png", video: "/video/cardvideo-1.mp4", tag: "More About Crew" },
//     { img: "/images/man3.png", video: "/video/cardvideo-1.mp4", tag: "More About Journey" },
//     { img: "/images/man4.png", video: "/video/cardvideo-1.mp4", tag: "More About Vision" },
//   ];
//   return (
//     <section className="container py-10 sm:py-15 lg:py-20 mx-auto">
//       <div className="text-center">
//         <h2 className="black-text mb-8">
//           Our Story, In <span className="text-highlight">Our Words</span>
//         </h2>

//         {/* Desktop */}
//         <div className="hidden md:flex justify-center -space-x-10">
//           {cards.map((c, i) => (
//             <div
//               key={i}
//               className={`md:transform ${i % 2 === 0 ? "md:-rotate-5" : "md:rotate-5"}`}
//             >
//               <Card imgSrc={c.img} videoSrc={c.video} tag={c.tag} desktopMode />
//             </div>
//           ))}
//         </div>

//         {/* Mobile with pagination */}
//         <MobileSlider cards={cards} />
//       </div>
//     </section>
//   )
// }

// export default ThirdSection








"use client";

import React from "react";
import { motion, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import Button from "../Button";

const cards = [
  { img: "/images/rubber1.webp", label: "Young Passionate Crowd", rotate: 10 },
  { img: "/images/rubber2.webp", label: "Jugged Masters", rotate: -10 },
  { img: "/images/rubber3.webp", label: "Goldi-Cricket Champs", rotate: 10 },
  { img: "/images/rubber4.webp", label: "Creative Experts", rotate: 10 },
];

const RubberSection = () => {
  const throwInVariant: Variants = {
    hidden: { x: 600, y: 0, rotate: 45, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  // ✅ Safe width check for Next.js SSR
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000;

  return (
    <section className="container w-full lg:h-[100vh] h-full relative py-10 sm:py-15 lg:py-20 overflow-x-hidden overflow-y-hidden">
      <h2 className="mb-3 text-center">
        <span className="text-highlight">Our culture </span> - Ideate, innovate, create
      </h2>

      {/* ✅ Responsive Cards Container */}
      <motion.div
        className="mt-16 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:gap-0 gap-0 px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        {cards.map((card, idx) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotate = useTransform(x, [-200, 200], [-25 + card.rotate, 25 + card.rotate]);

          const resetPosition = () => {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
            animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
            animate(rotate, card.rotate, { type: "spring", stiffness: 300, damping: 20 });
          };

          return (
            <motion.div
              key={idx}
              variants={throwInVariant}
              className={`relative w-[250px] sm:w-[260px] md:w-[280px] lg:w-[350px] h-[250px] sm:h-[260px] md:h-[280px] lg:h-[330px] flex-shrink-0 cursor-grab rounded-xl
                ${idx !== 0 ? "sm:-ml-12 md:-ml-14 lg:-ml-10" : ""}`}
            >
              <motion.div
                style={{ x, y, rotate }}
                drag
                dragConstraints={{
                  left: -windowWidth / 2,
                  right: windowWidth / 2,
                  top: -100,
                  bottom: 100,
                }}
                dragElastic={0.4}
                whileDrag={{ scale: 1.05 }}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 15, power: 0.2 }}
                onDragEnd={resetPosition}
                className="w-full h-full rounded-xl"
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full rounded-xl object-cover pointer-events-none"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center py-10 z-40">
        <Button href="/join-our-team" text="Join Our Team" className="text-black font-semibold" />
      </div>
    </section>
  );
};

export default RubberSection;
