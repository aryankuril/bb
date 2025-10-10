"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

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
    <section className="lg:mt-0 -mt-10 container py-0 sm:py-15 lg:py-30 ">
      {/* Headline */}
      <div className="mb-8 md:mb-12">
        <h1 className="max-w-[1000px] black-text">
        The Formula for Profitable Scaling: A Chatterbox Labels Case Study
  {/* Turning JK Diamonds&apos; Digital Touch points Into a{" "}
  <span className="text-highlight">Seamless Student</span> Experience{" "} */}
  {/* <span className="text-highlight">Attracts</span> and{" "}
  <span className="text-highlight">Retains Students</span> */}
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
          <Image
 src="/images/performance/chatterbox.webp"
  alt="JK Diamonds Institute"
  width={1400}
  height={800}
  className="object-cover w-full h-auto rounded-2xl"
/>
        </motion.div>
      </div>

      {/* Paragraph */}
      <div className="max-w-full md:max-w-[1250px] ">
        <p className="body2 black-text">
          The brand was stuck at ~₹12L in monthly sales, even in peak months. ROAS hovered around 2.5x but dropped sharply with any scaling efforts.
        </p>
      </div>
    </section>
  );
};

export default Firstsection;
