"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ThirdSection = () => {
  // observe when section enters view
  const { ref, inView } = useInView({
    triggerOnce: true, // animation runs only once
    threshold: 0.3, // start when 30% of section is visible
  });

  return (
    <section
      ref={ref}
      className="container py-10 sm:py-15 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <h2 className="black-text text-center mb-12">
         Quarterly <span className="text-highlight">Growth </span>In
        </h2>

        <div className="flex flex-col md:flex-row md:items-stretch justify-center gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Years of Creativity */}
            <div className="justify-end bg-[var(--color-primary)] white-text p-6 sm:p-8 rounded-[20px] shadow-lg
              border-r-[16px] sm:border-r-[20px] border-r-[var(--color-highlight)]
              h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col">
              <span className="text-highlight numbering">
                {inView && <CountUp end={106} duration={3} />}%
              </span>
              <h3 className="white-text">
                Orders
              </h3>
            </div>

            {/* Projects Delivered */}
            <div className="justify-end bg-[var(--color-primary)] white-text p-6 sm:p-8 rounded-[20px] shadow-lg
              border-r-[16px] sm:border-r-[20px] border-r-[var(--color-highlight)]
              h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col">
              <span className="text-highlight numbering">
                {inView && <CountUp end={101} duration={3} />}%
              </span>
              <h3 className="white-text">
               Sessions
              </h3>
            </div>
          </div>

          {/* Client Retention */}
          <div className="justify-end bg-[var(--color-primary)] white-text p-6 sm:p-8 lg:p-10 rounded-[20px] shadow-lg
            border-r-[16px] sm:border-r-[20px] border-r-[var(--color-highlight)]
            h-auto sm:h-[500px] lg:h-[700px] w-full md:w-1/2 flex flex-col ">
            <span className="text-highlight stats-number">
              {inView && <CountUp end={72} duration={3} />}%
            </span>
            <h3 className="white-text">
              Revenue
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
