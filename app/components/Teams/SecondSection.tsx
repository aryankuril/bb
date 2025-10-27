"use client";
import React, { useEffect, useRef } from "react";

const SecondSection = () => {
  const achievements = [
    {
      number: "01",
      image: "/images/teams/team1.webp",
      description: "Modern & Premium Design that captivates every eye.",
      position: "left",
    },
    {
      number: "02",
      image: "/images/teams/team2.webp",
      description: "Responsive Layout – built to shine on every device.",
      position: "right",
    },
    {
      number: "03",
      image: "/images/teams/team3.webp",
      description: "Streamlined Navigation for smooth and effortless browsing.",
      position: "left",
    },
    {
      number: "04",
      image: "/images/teams/team5.webp",
      description: "Comprehensive Course Pages that engage and inspire learners.",
      position: "right",
    },
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

      const update = () => {
        let visibleIndex = 0;
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const winH = window.innerHeight;
          const visible =
            Math.max(0, Math.min(rect.bottom, winH) - Math.max(rect.top, 0)) /
            rect.height;

          if (visible >= 0.3) visibleIndex = idx;
        });

        path.style.transition = "stroke-dashoffset 0.5s ease-out";
        path.style.strokeDashoffset = `${length - segments[visibleIndex]}`;
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    };

    const cleanDesktop = animatePath(pathRef.current);
    const cleanMobile = animatePath(mobilePathRef.current);
    return () => {
      cleanDesktop?.();
      cleanMobile?.();
    };
  }, []);

  return (
    <section
      id="achievement-section"
      className="container py-10 sm:py-15 lg:py-20 relative mb-[150px] mt-30"
    >
      <div className="lg:px-30 px-5">
        <div className="text-center mb-12">
          <h2 className="black-text text-center">
            BB Team<span className="text-highlight"> BTS</span>
          </h2>
        </div>

        {/* ✅ Desktop SVG Path */}
        <svg
          className="hidden lg:block absolute left-[285.391px] top-[210px] w-[900px] h-[1667px] z-0 pointer-events-none"
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

        {/* ✅ Mobile SVG Path */}
        <svg
          className="block lg:hidden absolute left-[30px] top-[300px] w-[359px] h-[1000px] z-0 pointer-events-none"
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
        <div className="space-y-[80px] relative z-10">
          {achievements.map((achievement, index) => {
            const tiltClass =
              achievement.position === "left"
                ? "rotate-[8deg]"
                : "rotate-[-8deg]";

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`flex items-center ${
                  achievement.position === "right"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`relative transform ${tiltClass} rounded-[20px] overflow-hidden lg:w-[500px] w-[280px] bg-transparent`}
                >
                  {/* Orange dot */}
                 <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 lg:w-12 lg:h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 31 30"
    fill="none"
  >
    <circle cx="15.3" cy="15" r="15" fill="#FAB31E" />
  </svg>
</div>


                  {/* ✅ Fixed-size image box */}
                  <div className="w-full h-[280px] lg:h-[350px] rounded-b-[20px] ">
                    <img
                      src={achievement.image}
                      alt={achievement.description}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* ✅ Caption */}
                  <div className="px-4 py-4  rounded-b-[20px]">
                    {/* <p className="text-gray-800 font-medium">
                      {achievement.description}
                    </p> */}
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
