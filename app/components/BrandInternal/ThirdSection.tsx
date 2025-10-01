"use client";
import React, { useEffect, useState } from "react";
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

// Exit animations: alternating left-bottom / right-bottom
const exitVariants = [
  { rotate: -15, x: -200, y: 200, scale: 0.9, opacity: 0, zIndex: 20 },
  { rotate: 15, x: 200, y: 200, scale: 0.9, opacity: 0, zIndex: 20 },
];

const ThirdSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="container py-16 min-h-[150vh]">
      <h1 className="text-[#000] font-[Miso] text-[80px] font-[400] leading-[82px] tracking-[-2.4px] capitalize text-center mb-10">
        Timeline for <span className="text-[#FAB31E]">j k diamonds</span>
      </h1>

      <div className="bg-black text-white rounded-[20px] relative overflow-hidden lg:grid lg:grid-cols-2">
        {/* Timeline text */}
        <div className="p-10 space-y-1 relative z-10">
          {timelineData.map((item, index) => {
            const controls = useAnimation();
            const [ref, inView] = useInView({ threshold: 0.7, triggerOnce: false });

            useEffect(() => {
              if (inView) {
                // Animate text: fade in from bottom
                controls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                });

                // Change image slightly after text animation starts
                setTimeout(() => {
                  setActiveIndex(index);
                }, 150); // small delay to sync text first
              } else {
                controls.start({ opacity: 0, y: 40 });
              }
            }, [inView, index]);

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={controls}
                className="space-y-2 text-white"
              >
               <h3 className=" w-[900px] /* full width */ text-[#FFF] /* color: #FFF */ font-[Miso] /* custom font-family (make sure it's loaded) */ text-[28px] sm:text-[34px] md:text-[40px] /* responsive font-size */ font-[700] /* font-weight: 700 (bold) */ leading-[60px] /* line-height: 60px */ tracking-[-1.2px] /* letter-spacing: -1.2px  ">
                  <span className="text-[#FAB31E] mr-4">●</span> {item.week}
                </h3>
                <p className="text-[#FFF] font-[400] text-[20px] leading-[40px] ml-8">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Sticky image container */}
        <div className="lg:sticky lg:top-20 flex items-center justify-end p-0 ">
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
  const target = e.currentTarget;
  target.onerror = null;
  target.src = "...";
}}

              />
            </AnimatePresence>
            {/* Yellow stripe */}
          </div>
        </div>
            <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E] rounded-tr-[20px] rounded-br-[20px]" />
      </div>
    </section>
  );
};

export default ThirdSection;
