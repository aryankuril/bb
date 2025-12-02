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
          The Stats That <span className="text-highlight">Speak Louder</span> Than Words
        </h2>

        <div className="flex flex-col md:flex-row md:items-stretch justify-center gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Years of Creativity */}
    <div className="relative bg-[var(--color-primary)] white-text p-6 sm:p-8 rounded-[20px] shadow-lg 
    h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col justify-end">

  {/* Candy Border on the Right */}
  <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5 candy-border rounded-r-[20px]"></div>
  
  <span className="text-highlight numbering text-4xl sm:text-5xl">
    {inView && <CountUp end={2015} duration={3} separator="" />}+
  </span>

  <h3 className="white-text mt-2">
    Years Of Bold Digital Creativity
  </h3>
</div>


            {/* Projects Delivered */}
              <div className="relative bg-[var(--color-primary)] white-text p-6 sm:p-8 rounded-[20px] shadow-lg 
    h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col justify-end">

  {/* Candy Border on the Right */}
  <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5 candy-border rounded-r-[20px]"></div>
              <span className="text-highlight numbering">
                {inView && <CountUp end={150} duration={3} />}+
              </span>
              <h3 className="white-text">
                Projects Successfully Delivered
              </h3>
            </div>
          </div>

          {/* Client Retention */}
          <div className="relative justify-end bg-[var(--color-primary)] white-text p-6 sm:p-8 lg:p-10 rounded-[20px] shadow-lg
            h-auto sm:h-[500px] lg:h-[700px] w-full md:w-1/2 flex flex-col ">

                <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5 candy-border rounded-r-[20px]"></div>
              <div className=" flex align-bottom items-end">
            <span className="text-highlight stats-number">
              {inView && <CountUp end={98} duration={3} />}
              
            </span>
             <span className="text-highlight numbering">
               %
              </span>
              </div>
            <h3 className="white-text">
              Client Retention Rate
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
