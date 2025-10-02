
"use client";
import React, { useEffect, useRef } from "react";

const SecondSection = () => {
  const achievements = [
    { number: "01", image: "/images/card1.png", description: "Modern & Premium Design", position: "left" },
    { number: "02", image: "/images/card2.png", description: "Responsive Layout", position: "right" },
    { number: "03", image: "/images/card3.png", description: "Streamlined Navigation", position: "left" },
    { number: "04", image: "/images/card4.png", description: "Comprehensive Course Pages", position: "right" },
   
  ];

  const pathRef = useRef<SVGPathElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
   const mobilePathRef = useRef<SVGPathElement | null>(null);

useEffect(() => {
  const animatePath = (path: SVGPathElement | null) => {
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const segments = [0, length * 0.33, length * 0.66, length];
    let currentIndex = 0;

    const update = () => {
      let maxVisibleIndex = 0;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const winH = window.innerHeight;

        const visible =
          Math.max(0, Math.min(rect.bottom, winH) - Math.max(rect.top, 0)) /
          rect.height;

        if (visible >= 0.3 && idx > maxVisibleIndex) {
          maxVisibleIndex = idx;
        }
      });

      if (maxVisibleIndex > currentIndex) {
        currentIndex = maxVisibleIndex;
        path.style.transition = "stroke-dashoffset 0.8s ease-out";
        path.style.strokeDashoffset = `${length - segments[currentIndex]}`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  };

  // Animate both desktop and mobile paths
  const cleanDesktop = animatePath(pathRef.current);
  const cleanMobile = animatePath(mobilePathRef.current);

  return () => {
    cleanDesktop?.();
    cleanMobile?.();
  };
}, []);


  return (
    <section id="achievement-section" className="container py-10 sm:py-15 lg:py-20 relative mb-[150px] mt-30">
      <div className=" lg:px-30 px-5">
      <div className="text-center mb-12">
        <h2   className="
    font-miso
    text-[32px] leading-[38px] tracking-[-0.5px]      /* 📱 base (mobile) */
    sm:text-[40px] sm:leading-[44px] sm:tracking-[-1px] /* small tablets */
    md:text-[56px] md:leading-[60px] md:tracking-[-1.5px] /* tablets */
    lg:text-[72px] lg:leading-[76px] lg:tracking-[-2px]   /* laptops */
    xl:text-[80px] xl:leading-[82px] xl:tracking-[-2.4px] /* large desktops */
    text-black text-center
  ">
           BB Team<span className="text-[#FAB31E]"> BTS</span> 
        </h2>
      </div>

      {/* ✅ Single SVG Path */}
      <svg
        className="hidden lg:block absolute left-[285.391px] top-[180px] w-[900px] h-[1667px] z-0 pointer-events-none"
        viewBox="0 0 709 1781"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M68.0001 8.38959C68.0001 8.38959 59.3355 -0.610245 56.0002 2.80407C-248 313.997 847 310.407 692 598.461C541.926 877.357 59.8581 887.009 61.0001 1190.53C62.1382 1492.98 692 1779 692 1779"
          stroke="black"
          strokeWidth="3"
          strokeDasharray="8 8"
          style={{ strokeDasharray: 10000, strokeDashoffset: 10000 }}
        />
      </svg>


      {/* ✅ Mobile connection line */}
      <svg
        className="block lg:hidden absolute left-[30px] top-[300px] w-[359px] h-[700px] z-0 pointer-events-none"
        viewBox="0 0 359 2190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={mobilePathRef}
          d="M159.6 2C159.6 2 345.6 142.1 356.6 344.5C365.1 500.6 302.6 613.7 202.1 731.1C113.1 835.0 129.6 787.6 30.1 1031.1C-118.2 1394.3 369.5 1603.6 353.1 1915.1C344.2 2083.5 202.1 2188 202.1 2188"
          stroke="black"
          strokeWidth={3}
          strokeDasharray="6 6"
        />
      </svg>

      {/* ✅ Achievements Cards */}
      <div className="space-y-[-50px] relative z-10">
        {achievements.map((achievement, index) => {
  // Increase tilt: left cards rotate more negative, right cards more positive
  const tiltClass = achievement.position === "left" ? "rotate-[8deg]" : "rotate-[-8deg]";
          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}

              className={`flex items-center ${achievement.position === "right" ? "justify-end" : "justify-start"} mb-0`}
            >
 <div className={`relative transform ${tiltClass} rounded-[20px] overflow-hidden lg:w-[500px] w-[200px] bg-transparent`}>
  {/* Orange dot at the top center */}
  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
    <div className="lg:w-8 w-4 lg:h-8 h-4 bg-[#FAB31E] rounded-full border-4 border-white"></div>
  </div>

  {/* Image */}
  <img
    src="/images/section1-img3.png"
    alt="Team"
    className="w-full h-auto object-cover bg-transparent"
  />

  {/* Caption / Description */}
  <div className="px-1 py-4 bg-none">
    <p className="lg:text-[18px] text-[10px] text-[#000] font-medium font-['Poppins']">
      We’re A Mixed Crew Of Strategists, Designers, Coders And Dreamers Who Turn Brands
    </p>
  </div>
</div>





            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default SecondSection;
