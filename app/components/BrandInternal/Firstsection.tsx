"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Firstsection = () => {
  const controls = useAnimation();
  const spacerControls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      });

      spacerControls.start({
        height: "5px",
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [controls, spacerControls, inView]);

  return (
    <section className="container py-5 md:py-16 lg:py-10 ">
      {/* Headline */}
      <div className="mb-8 md:mb-12">
        <h1 className="max-w-[1300px] font-miso text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[35px] sm:leading-tight md:leading-tight lg:leading-[90px] text-[#1D1D1D] tracking-tight sm:tracking-normal md:tracking-[-1px] capitalize">
          Turning JK Diamonds' Digital Touch points Into a{" "}
          <span className="text-[#FAB31E]">Seamless Experience</span> That{" "}
          <span className="text-[#FAB31E]">Attracts</span> and{" "}
          <span className="text-[#FAB31E]">Retains Students</span>
        </h1>
      </div>

      {/* Spacer */}
      <motion.div
        initial={{ height: "200px" }}
        animate={spacerControls}
        className="w-full"
      />

      {/* Image */}
      <div className="flex justify-center mb-8 md:mb-12">
        <motion.div
          ref={ref}
          initial={{ scale: 0.8, opacity: 0, y: 80 }}
          animate={controls}
          className="relative overflow-hidden lg:rounded-4xl rounded-3xl w-full max-w-[100%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[1400px] "
        >
          <img
            src="/images/plantscan.png"
            alt="JK Diamonds Institute"
            className="object-cover w-full h-auto rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Paragraph */}
      <div className="max-w-full md:max-w-[1250px] ">
        <p className="text-[#1D1D1D] font-poppins text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-tight sm:tracking-normal capitalize">
          At JK Diamonds, we blend timeless craftsmanship with modern expertise
          to redefine the art of diamond education. As a premier institute for
          diamond, gem, and jewelry courses, JK Diamonds empowers aspiring
          professionals and entrepreneurs with the knowledge, skills, and
          confidence to excel in the global gems and jewelry industry.
        </p>
      </div>
    </section>
  );
};

export default Firstsection;
