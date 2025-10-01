"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const Firstsection: React.FC = () => {
  const secondImgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(secondImgRef, { amount: 0.3 });
  const controls = useAnimation();

useEffect(() => {
  const handleZoom = () => {
    const isMobile = window.innerWidth < 768;

    if (inView) {
      controls.start({
        // adjust these numbers as needed
        scale: isMobile ? 3.2 : 2.4,   // 🔥 reasonable desktop scale
        transition: { duration: 1, ease: "easeInOut" },
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }
  };

  handleZoom();
  window.addEventListener("resize", handleZoom);
  return () => window.removeEventListener("resize", handleZoom);
}, [inView, controls]);



  return (
    <section className="container py-10 px-4 md:px-0">
      <h2 className="text-[30px] md:text-[80px] leading-[30px] md:leading-[80px] font-[400]
                     tracking-[-1.2px] md:tracking-[-2.4px] text-[#1D1D1D]
                     capitalize font-[Miso] text-center md:text-left">
        The Squad That Turns{" "}
        <span className="text-[#FAB31E]">What If</span>’ Into <br />
        ‘<span className="text-[#FAB31E]">What’s Next.</span>’
      </h2>

      <div className="mt-10 flex justify-center items-center">
        <div className="flex flex-col lg:gap-4 gap-1 justify-center items-center w-full h-[250px] lg:w-[1295px] lg:h-[650px] lg:rounded-[30px] rounded-[20px]  overflow-hidden bg-amber-50">
          
          {/* Row 1 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center lg:mt-20 mt-0">
            <div className="w-[32%] max-w-[562px] lg:w-[562px]  0">
              <Image src="/images/section2-img1.png" alt="Big Image" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px]  object-cover w-full h-full" />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image src="/images/section2-img2.png" alt="Small 1" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image src="/images/section2-img3.png" alt="Small 2" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[120px] flex-shrink-0">
              <Image src="/images/section2-img4.png" alt="Hands" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>

            <motion.div
              ref={secondImgRef}
              animate={controls}
              initial={{ scale: 1 }}
              className="w-[32%] max-w-[562px] lg:w-[562px]  lg:h-[370px] h-[120px] flex-shrink-0 relative"
                // className="w-[30%] max-w-[250px] h-[250px] flex-shrink-0 relative"
            >
              <Image src="/images/section1-img1.png" alt="Hands Zoom" fill
                     className="lg:rounded-[30px]  rounded-[10px] object-cover  w-full h-full" />
            </motion.div>

            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[120px] flex-shrink-0">
              <Image src="/images/section2-img4.png" alt="Hands" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image src="/images/section2-img1.png" alt="Woman" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image src="/images/section2-img2.png" alt="Man" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px]object-cover w-full h-full" />
            </div>
            <div className="w-[30%] max-w-[562px] lg:w-[562px]  flex-shrink-0">
              <Image src="/images/section2-img3.png" alt="Hands" width={250} height={250}
                     className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Firstsection;
