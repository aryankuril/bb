"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timelineData = [
  {
    week: "(Week 1): Platform Setup & Theme Selection",
    desc: "Established the core Shopify infrastructure and selected a premium, mobile-first theme aligned with the SuperSox brand aesthetic and functionality.",
    img: "/images/timeline1.png",
  },
  {
    week: "(Week 2–3): Customization, Brand Integration & Content Upload",
    desc: "Customized the theme to reflect the SuperSox identity — integrating logo, color palette, and navigation — followed by bulk uploading of products, images, and essential content pages.",
    img: "/images/timeline2.png",
  },
  {
    week: "(Week 4): Testing & Go-Live",
    desc: "Performed comprehensive user journey testing, ensuring a seamless browsing and checkout experience before successfully launching the SuperSox online store.",
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
    <section className="container py-10 sm:py-15 lg:py-20 min-h-[100vh]">
      <h1 className="text-[#000] font-[Miso] text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal leading-snug tracking-tight capitalize text-center mb-10 px-4">
        Timeline for <span className="text-[#FAB31E]">jSuper Sox</span>
      </h1>

      <div className="bg-black text-white rounded-[20px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Timeline text */}
        <div className="p-8 sm:p-10 space-y-6 relative z-10">
          {timelineData.map((item, index) => {
            const controls = useAnimation();
            const [ref, inView] = useInView({ threshold: 0.6, triggerOnce: false });

            useEffect(() => {
              if (inView) {
                controls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                });

                setTimeout(() => {
                  setActiveIndex(index);
                }, 150);
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
                <h3 className="lg:w-[780px] w-full text-[#FFF] font-[Miso] text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-snug tracking-tight">
                  <span className="text-[#FAB31E] mr-2">●</span> {item.week}
                </h3>
                <p className=" lg:w-[700px] w-full text-[#FFF] font-normal text-base sm:text-lg md:text-xl leading-relaxed ml-6 sm:ml-8 font-['Poppins']">
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
                className="rounded-l-[20px] rounded-r-none object-cover max-w-[450px] lg:h-[450px] h-auto  shadow-2xl lg:mr-20 absolute"
                //  className="rounded-xl lg:rounded-l-[20px] object-cover w-[90%] sm:w-[400px] md:w-[250px] h-auto max-h-[400px] lg:max-h-[450px] mr-20 shadow-2xl"
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

        {/* Yellow stripe */}
        <div className="absolute right-0 top-0 w-2 sm:w-4 md:w-6 h-full bg-[#FAB31E] rounded-tr-[20px] rounded-br-[20px]" />
      </div>
    </section>
  );
};

export default ThirdSection;
