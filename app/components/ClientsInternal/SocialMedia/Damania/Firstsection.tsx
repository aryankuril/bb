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
    <section className=" container py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10 ">
      {/* Headline */}
      <div className="mb-8 md:mb-12">
      <h1 className="max-w-full black-text ">
  Parvez’s aviation legacy, now online. <span className="text-highlight mt-2">
    A compelling digital brand.
  </span>
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
          className="relative overflow-hidden lg:rounded-4xl rounded-3xl w-full  "
        >
          <Image
 src="/images/sm/Damania.jpg"
  alt="JK Diamonds Institute"
  width={1400}
  height={800}
className="object-fit w-full h-auto rounded-2xl"
/>
        </motion.div>
      </div>

      {/* Paragraph */}
      <div className="max-w-full md:max-w-[1250px] ">
       <p className="body2 black-text">
Parvez has lived one of India’s most iconic aviation journeys, but his digital presence didn’t reflect it yet.
Our goal was simple: turn his legacy, experience, and stories into a compelling online brand.
</p>


      </div>
    </section>
  );
};

export default Firstsection;
