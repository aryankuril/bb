"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Button from "@/app/components/Button";

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
          Putting The Best Foot Forward: <span className="text-highlight">
           Rapid E-Commerce Launch
            </span> for SuperSox
  {/* Turning JK Diamonds&apos; Digital Touch points Into a{" "}
  <span className="text-highlight">Seamless Student</span> Experience{" "} */}
  {/* <span className="text-highlight">Attracts</span> and{" "}
  <span className="text-highlight">Retains Students</span> */}
</h1>
  <div className=" lg:mt-10 mt-5 pl-2">
                      <Button href="/estimates-calculator" text="Get Estimates " className="" />
                    </div>

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
 src="/images/webdev/SuperSoxnew.jpg"
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
  With a strong legacy in sock manufacturing, SuperSox wanted a stylish, user-friendly e-commerce store for their wide range—from Disney and Marvel collections to premium office wear. We built a fast, scalable Shopify platform to bring their vibrant catalog online.
</p>

      </div>
    </section>
  );
};

export default Firstsection;
