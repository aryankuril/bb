"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ThirdSection = () => {
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
    <section className="container py-10 sm:py-15 lg:py-20 ">
      {/* Headline */}
<div className="flex justify-center items-center mb-8 md:mb-12 w-full">
  <h2 className="max-w-[1100px] text-center black-text">
    Watch How We Cook Up Digital Magic {" "}
    <span className="text-highlight">(No Secret Sauce Hidden)</span>
  </h2>
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
    </section>
  )
}

export default ThirdSection