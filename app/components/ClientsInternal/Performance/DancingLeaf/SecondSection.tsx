"use client";
import React, { useEffect, useRef } from "react";

const SecondSection = () => {
const achievements = [
  {
    number: "01",
    title: "Strategic Partnership",
    description:
      "Bombay Blokes partnered with Dancing Leaf from day one of their digital journey to guide their growth.",
    position: "left",
  },
  {
    number: "02",
    title: "Performance Engine Build",
    description:
      "We built their performance marketing engine from scratch, covering strategy, creative development, and media buying.",
    position: "right",
  },
  {
    number: "03",
    title: "Data-Driven Strategy",
    description:
      "Our team focused on understanding demand patterns, seasonality, and customer behaviour to inform campaign optimizations.",
    position: "left",
  },
  {
    number: "04",
    title: "ROAS-Focused Growth",
    description:
      "We kept the early ROAS healthy at a consistent 3x while strategically scaling their advertising budgets for growth.",
    position: "right",
  },
];



  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animatePath = (path: SVGPathElement | null) => {
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const segments = [0, length * 0.4, length * 0.7, length];

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

        path.style.transition = "stroke-dashoffset 0.8s ease-out";
        path.style.strokeDashoffset = `${length - segments[maxVisibleIndex]}`;
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);

      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    };

    const cleanupDesktop = animatePath(desktopPathRef.current);
    const cleanupMobile = animatePath(mobilePathRef.current);

    return () => {
      cleanupDesktop?.();
      cleanupMobile?.();
    };
  }, []);

  return (
    <section id="second-section" className="  relative container py-10 sm:py-15 lg:py-20">

      <div className="lg:px-30 px-2" >
      <div className="text-center mb-12">
<h2 className="black-text text-center">
  How we <span className="text-highlight">achieve</span> it
</h2>

      </div>

      {/* ✅ Desktop connection line */}
      <svg
        className="hidden lg:block absolute lg:left-[285px] top-[250px] w-[900px] h-[1667px] z-0 pointer-events-none"
        viewBox="0 0 709 1781"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={desktopPathRef}
          d="M68 8.3C68 8.3 59.3 -0.6 56 2.8C-248 313.9 847 310.4 692 598.4C541.9 877.3 59.8 887.0 61 1190.5C62.1 1492.9 692 1779 692 1779"
          stroke="black"
          strokeWidth={3}
          strokeDasharray={16}
          strokeDashoffset={16}
        />
      </svg>

      {/* ✅ Mobile connection line */}
      <svg
        className="block lg:hidden absolute left-[20px] top-[300px] w-[359px] h-[1200px] z-0 pointer-events-none"
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

      {/* Cards */}
      <div className="relative z-10">
        {achievements.map((achievement, index) => {
          const tilt = achievement.position === "left" ? "rotate-[14deg]" : "-rotate-[14deg]";
          return (
            <div
              key={index}
             ref={(el) => {
  cardRefs.current[index] = el;
  // ✅ no return
}}

              className={`flex items-center ${
                achievement.position === "right" ? "justify-end" : "justify-start"
              } mt-20 lg:mt-0`}
            >
              <div className={`relative transform overflow-hidden ${tilt}`}>
                <div className="relative lg:w-[450px] w-[250px] lg:h-[550px] h-[300px] bg-[var(--color-primary)] overflow-hidden rounded-[30px] lg:p-8 p-6 flex flex-col justify-center items-center shadow-lg">
                  <div className="absolute inset-y-0 right-0 w-[18px] bg-[var(--color-highlight)] rounded-r-[30px] overflow-hidden" />
                  <div className="absolute top-8 w-5 lg:w-12 lg:h-12 h-5 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 31 30" fill="none">
                      <circle cx="15.3" cy="15" r="15" fill="#FAB31E" />
                    </svg>
                  </div>
                  <div>
  {/* Number */}
  <div className="text-highlight numbering">
    {achievement.number}
  </div>

  {/* Title & Description */}
  <div className="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
    <h3 className="white-text text-left">
      {achievement.title}
    </h3>
    <p className="white-text
                  body2
                  max-w-[300px] sm:max-w-[400px] text-left">
      {achievement.description}
    </p>
  </div>
</div>

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
 