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
        <h1 className="max-w-full black-text">
  Building a Playful Digital Identity for <span className="text-highlight">Mr Blox: </span>
  A Toy Brand Focused on Boosting Kids’ Cognitive Skills
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
          className="relative overflow-hidden lg:rounded-4xl rounded-3xl w-full "
        >
          <Image
 src="/images/webdev/MrBloxnew.jpg"
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
 Mr Blox is a toy brand focused on improving cognitive skills in kids aged 3+ and above. Their identity centres around their friendly Panda mascot, which symbolises curiosity, learning, and fun. The brand needed a digital home that was instantly recognisable, parent-friendly, and true to the playful world of Mr Blox.
</p>

      </div>
    </section>
  );
};

export default Firstsection;
