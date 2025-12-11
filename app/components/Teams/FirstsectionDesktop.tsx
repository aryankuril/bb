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

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const scaleX = containerRect.width / elementRect.width;
    const scaleY = containerRect.height / elementRect.height;
    const targetScale = Math.max(scaleX, scaleY);

    // Responsive scroll trigger values
    const isMobile = window.innerWidth < 768;
    const startValue = isMobile ? "top 20%" : "top 50%";
    const endValue = isMobile ? "top 10%" : "top 20%";

    const scrollTrigger = gsap.to(element, {
      scale: targetScale,
      zIndex: 10,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: container,
        start: startValue,
        end: endValue,
        scrub: 2.5,
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
    });

    return () => {
      scrollTrigger.scrollTrigger?.kill();
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="container  py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10">
      <h1 className="black-text text-center md:text-left">
        The Squad That Turns <span className="text-highlight">What If</span>’
        Into <br />‘<span className="text-highlight">What’s Next.</span>’
      </h1>

      {/* card */}

      <div className="mt-10 flex justify-center items-center">
        <div
          ref={containerRef}
          className="flex flex-col lg:gap-4 gap-1 justify-center items-center w-full h-[300px] lg:w-[1295px] lg:h-[650px]  rounded-[20px] overflow-hidden relative"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center lg:mt-20 mt-0">
            <div className="w-[32%] max-w-[562px] lg:w-[562px]  0">
              <Image
                src="/images/teams/1.png"
                alt="Big Image"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px]  object-cover w-full h-full"
              />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image
                src="/images/teams/2.png"
                alt="Small 1"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>
            <div className="w-[32%] max-w-[350px] lg:w-[350px] ">
              <Image
                src="/images/teams/3.png"
                alt="Small 2"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[32%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[200px] flex-shrink-0">
              <Image
                src="/images/teams/4.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div
              ref={secondImgRef}
              className="w-[32%] max-w-[562px] lg:w-[562px] lg:h-[370px] h-[200px] flex-shrink-0 relative"
              style={{
                transformOrigin: "center center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/teams/team5.webp"
                alt="Hands Zoom"
                fill
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>

            <div className="w-[30%] max-w-[350px] lg:w-[350px] lg:h-[370px] h-[200px] flex-shrink-0">
              <Image
                src="/images/teams/6.png"
                alt="Hands"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap lg:gap-4 gap-1 justify-center">
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image
                src="/images/teams/7.png"
                alt="Woman"
                width={250}
                height={250}
                className="lg:rounded-[30px] rounded-[10px] object-cover w-full h-full"
              />
            </div>
            <div className="w-[30%] max-w-[350px] lg:w-[350px] flex-shrink-0">
              <Image
                src="/images/teams/8.png"
                alt="Man"
                width={250}
                height={250}
                className="lg:rounded-[30px]  rounded-[10px]object-cover w-full h-full"
              />
            </div>
            <div className="w-[30%] max-w-[562px] lg:w-[562px]  flex-shrink-0">
              <Image
                src="/images/teams/9.png"
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