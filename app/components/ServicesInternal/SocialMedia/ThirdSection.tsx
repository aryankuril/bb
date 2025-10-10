"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

const WorkflowSection: React.FC = () => {
const workflowSteps = [
  {
    title: "01. Strategy First",
    description:
      "We map content and campaigns, that align with your brand goals.",
    tags: ["Strategy", "Campaigns", "Planning"],
  },
  {
    title: "02. Create & Captivate",
    description:
      "Scroll-stopping posts, reels, and stories designed to spark engagement.",
    tags: ["Content", "Creatives", "Engagement"],
  },
  {
    title: "03. Loyal Community Building",
    description:
      "We don’t just grow followers, we nurture a community that engages, advocates, and stays loyal to your brand.",
    tags: ["Community", "Loyalty", "Advocacy"],
  },
  {
    title: "04. Track Engagement",
    description:
      "From likes to clicks, we measure every interaction to refine strategies and boost results where it matters most.",
    tags: ["Analytics", "Engagement", "Insights"],
  },
];


  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ✅ Create transforms normally — Hooks at top level
  const xMobile = useTransform(scrollYProgress, [0, 1], ["33%", "-33%"]);
  const xDesktop = useTransform(scrollYProgress, [0, 1], ["15%", "-13%"]);
  const trainMobile = useTransform(scrollYProgress, [0, 1], ["0%", "140%"]);
  const trainDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "234%"]);

  // ✅ Choose transform dynamically (no hooks inside logic)
  const x = isMobile ? xMobile : xDesktop;
  const trainX = isMobile ? trainMobile : trainDesktop;

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] container py-0 sm:py-15 lg:py-20"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title */}
        <div className="text-center lg:mb-5 px-4">
          <h2 className="black-text">Branding workflow</h2>
        </div>

        {/* Train + Track */}
        <div className="relative w-full flex flex-col">
          <motion.div
            style={{ x: trainX }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="relative w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[20px] sm:h-[50px] z-20 lg:mt-0 mt-5"
          >
            <img
              src="/images/train.png"
              alt="train"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="w-full h-[3px] sm:h-[4px] bg-[var(--color-highlight)] z-10 rounded-full" />
        </div>

        {/* Cards */}
        <motion.div
          style={{ x }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="flex gap-4 sm:gap-8 md:gap-8 px-4 sm:px-10 md:px-20 mt-3"
        >
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className="bg-black rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 md:p-8 relative 
              w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] 
              h-[380px] sm:h-[450px] md:h-[500px] lg:h-[540px] flex-shrink-0"
            >
              <div className="absolute right-0 top-0 w-4 sm:w-6 md:w-7 h-full bg-[var(--color-highlight)] rounded-r-[20px] sm:rounded-r-[30px]" />

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="border-b border-[var(--color-highlight)] pb-4 sm:pb-6 md:pb-8">
                  <h3 className="white-text">{step.title}</h3>
                </div>
                <p className="white-text body2">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[var(--color-highlight)] black-text body3 px-3 capitalize sm:px-4 md:px-3 py-1 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowSection;
