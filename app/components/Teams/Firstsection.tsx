"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Firstsection: React.FC = () => {
  const secondImgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!secondImgRef.current || !containerRef.current) return;

    const element = secondImgRef.current;
    const container = containerRef.current;

    let hasAnimated = false;

    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage >= 2 && !hasAnimated) {
        hasAnimated = true;

        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const scaleX = containerRect.width / elementRect.width;
        const scaleY = containerRect.height / elementRect.height;
        const scale = Math.max(scaleX, scaleY);

        gsap.to(element, {
          scale: scale,
          duration: 1.2,
          ease: "power2.inOut",
          zIndex: 10,
        });
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="container -lg:mt-10 -mt-10  py-0 sm:py-15 lg:py-30">
      <h1 className="black-text text-center md:text-left">
        The Squad That Turns <span className="text-highlight">What If</span>’
        Into <br />‘<span className="text-highlight">What’s Next.</span>’
      </h1>

      {/* card */}

      <div className="mt-10 flex justify-center items-center">
        <div
          ref={containerRef}
          className="flex flex-col lg:gap-4 gap-1 justify-center items-center w-full h-[250px] lg:w-[1295px] lg:h-[650px] lg:rounded-[30px] rounded-[20px] overflow-hidden bg-amber-50 relative"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center lg:mt-20 mt-0">
            <div className="w-[32%] max-w-[562px] lg:w-[562px]  0">
              <Image
                src="/images/section2-img1.png"
                alt="Big Image"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px]  object-cover w-full h-full"
              />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image
                src="/images/section2-img2.png"
                alt="Small 1"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image
                src="/images/section2-img3.png"
                alt="Small 2"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[120px] flex-shrink-0">
              <Image
                src="/images/section2-img4.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div
              ref={secondImgRef}
              className="w-[32%] max-w-[562px] lg:w-[562px] lg:h-[370px] h-[120px] flex-shrink-0 relative"
              style={{
                transformOrigin: "center center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/section1-img1.png"
                alt="Hands Zoom"
                fill
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[120px] flex-shrink-0">
              <Image
                src="/images/section2-img4.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image
                src="/images/section2-img1.png"
                alt="Woman"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image
                src="/images/section2-img2.png"
                alt="Man"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px]object-cover w-full h-full"
              />
            </div>
            <div className="w-[30%] max-w-[562px] lg:w-[562px]  flex-shrink-0">
              <Image
                src="/images/section2-img3.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Firstsection;
