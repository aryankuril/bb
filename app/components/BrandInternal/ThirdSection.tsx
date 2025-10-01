"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timelineData = [
  {
    week: "Week 1 to 3 — Discovery & Research",
    desc: "Clear Menu Structure And Sitemap For Easy Access To Courses, Programs, And Resources.",
    img: "/images/timeline1.png",
  },
  {
    week: "Week 3 to 6 — Strategy & Information Architecture",
    desc: "Clear Menu Structure And Sitemap For Easy Access To Courses, Programs, And Resources.",
    img: "/images/timeline2.png",
  },
  {
    week: "Week 6 to 9 — Development",
    desc: "Clear Menu Structure And Sitemap For Easy Access To Courses, Programs, And Resources.",
    img: "/images/timeline3.png",
  },
];

const exitVariants = [
  { rotate: -15, x: -200, y: 200, scale: 0.9, opacity: 0, zIndex: 20 },
  { rotate: 15, x: 200, y: 200, scale: 0.9, opacity: 0, zIndex: 20 },
];

const ThirdSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Create refs and animation controls for each timeline item
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useRef(timelineData.map(() => useAnimation())).current;

  // Hook to track which item is in view
  const inViews = timelineData.map((_, i) => useInView({ threshold: 0.7, triggerOnce: false }));

  useEffect(() => {
    inViews.forEach(([ref, inView], i) => {
      if (inView) {
        controls[i].start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
        setTimeout(() => setActiveIndex(i), 150);
      } else {
        controls[i].start({ opacity: 0, y: 40 });
      }
    });
  }, [inViews, controls]);

  return (
    <section className="container py-16 min-h-[150vh]">
      <h1 className="text-[#000] font-[Miso] text-[80px] font-[400] leading-[82px] tracking-[-2.4px] capitalize text-center mb-10">
        Timeline for <span className="text-[#FAB31E]">j k diamonds</span>
      </h1>

      <div className="bg-black text-white rounded-[20px] relative overflow-hidden lg:grid lg:grid-cols-2">
        {/* Timeline text */}
        <div className="p-10 space-y-1 relative z-10">
          {timelineData.map((item, index) => {
            const [ref, inView] = inViews[index];
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={controls[index]}
                className="space-y-2 text-white"
              >
                <h3 className="w-[900px] text-[#FFF] font-[Miso] text-[28px] sm:text-[34px] md:text-[40px] font-[700] leading-[60px] tracking-[-1.2px]">
                  <span className="text-[#FAB31E] mr-4">●</span> {item.week}
                </h3>
                <p className="text-[#FFF] font-[400] text-[20px] leading-[40px] ml-8">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Sticky image container */}
        <div className="lg:sticky lg:top-20 flex items-center justify-end p-0">
          <div className="relative w-full h-full flex items-center justify-end overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={timelineData[activeIndex].img}
                src={timelineData[activeIndex].img}
                alt="Timeline visual"
                className="rounded-l-[20px] rounded-r-none object-cover max-w-[450px] h-[450px] shadow-2xl mr-20 absolute"
                style={{ zIndex: 10 }}
                initial={{ opacity: 1, rotate: 0, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 1, rotate: 0, x: 0, y: 0, scale: 1 }}
                exit={exitVariants[activeIndex % 2]}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "...";
                }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Yellow stripe */}
        <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E] rounded-tr-[20px] rounded-br-[20px]" />
      </div>
    </section>
  );
};

export default ThirdSection;
