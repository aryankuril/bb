"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

const WorkflowSection: React.FC = () => {
const workflowSteps = [
  {
    title: "Ideation",
    description:
      "We brainstorm concepts aligned with your brand vision and user needs, setting the foundation for growth.",
    tags: ["Strategy", "Concept", "Vision"],
  },
  {
    title: "UI/UX",
    description:
      "Designing intuitive, user-friendly interfaces that ensure smooth navigation and engaging experiences.",
    tags: ["UI", "UX", "User Journey"],
  },
  {
    title: "Prototyping",
    description:
      "Creating clickable mockups to visualize the flow and gather feedback before full development.",
    tags: ["Wireframes", "Mockups", "Validation"],
  },
  {
    title: "Development",
    description:
      "Turning designs into responsive, functional, and high-performing websites built for scalability.",
    tags: ["Code", "Responsive", "Performance"],
  },
  {
    title: "Testing",
    description:
      "Rigorous quality checks across devices and browsers to ensure speed, security, and flawless usability.",
    tags: ["QA", "Speed", "Security"],
  },
  {
    title: "Development",
    description:
      "Turning designs into responsive, functional, and high-performing websites built for scalability.",
    tags: ["Code", "Responsive", "Performance"],
  },
  {
    title: "Testing",
    description:
      "Rigorous quality checks across devices and browsers to ensure speed, security, and flawless usability.",
    tags: ["QA", "Speed", "Security"],
  },
];


  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Different transforms for mobile vs desktop
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["40%", "-40%"] : ["29%", "-28%"]
  );

  const trainX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "140%"] : ["0%", "233%"]
  );

  return (
    <section ref={containerRef} className="relative h-[400vh] container  py-0 sm:py-15 lg:py-20 ">
      {/* Sticky wrapper keeps everything (title + train + cards) fixed */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Title stays fixed now */}
        <div className="text-center lg:mb-5 px-4">
          <h2 className="black-text">
            Branding workflow
          </h2>
        </div>

        {/* Train + Track */}
        <div className="relative w-full flex flex-col">
          <motion.div
            style={{ x: trainX }}
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

        {/* Horizontal cards */}
        <motion.div
          style={{ x }}
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
                  <h3 className="white-text">
                    {step.title}
                  </h3>
                </div>
                <p className=" white-text body2">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className=" bg-[var(--color-highlight)] black-text body3 px-3 capitalize sm:px-4 md:px-3 py-1 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
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
