"use client";
import React from "react";
import CountUp from "react-countup";

const ThirdSection = () => {
  return (
  <section className="py-12 container">
  <div className="mx-auto max-w-[1400px]">
    {/* Heading */}
    <h2 className="text-[#000] text-center font-[Miso] 
      text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px]
      leading-[42px] sm:leading-[56px] md:leading-[72px] lg:leading-[82px]
      tracking-[-1px] md:tracking-[-2px] capitalize mb-12">
      The Stats That <span className="text-[#FAB31E]">Speak Louder</span> Than Words
    </h2>

    <div className="flex flex-col md:flex-row md:items-stretch justify-center gap-6">
      {/* Left Column */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        {/* Years of Creativity */}
        <div className="justify-end bg-black text-white p-6 sm:p-8 rounded-[20px] shadow-lg
          border-r-[16px] sm:border-r-[20px] border-r-[#FAB31E]
          h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col">
          <span className="text-[#FAB31E] font-[Miso]
            text-[48px] sm:text-[80px] md:text-[100px] lg:text-[120px]
            leading-[60px] sm:leading-[90px] md:leading-[110px] lg:leading-[120px]
            tracking-[-1px] md:tracking-[-1.2px] capitalize">
            <CountUp end={2015} duration={3} />+
          </span>
          <p className="text-white font-[Miso]
            text-[20px] sm:text-[32px] md:text-[40px] lg:text-[60px]
            leading-[28px] sm:leading-[40px] md:leading-[50px] lg:leading-[60px]
            tracking-[-0.6px] capitalize">
            Years Of Bold Digital Creativity
          </p>
        </div>

        {/* Projects Delivered */}
        <div className="justify-end bg-black text-white p-6 sm:p-8 rounded-[20px] shadow-lg
          border-r-[16px] sm:border-r-[20px] border-r-[#FAB31E]
          h-auto sm:h-[280px] lg:h-[337px] w-full flex flex-col">
          <span className="text-[#FAB31E] font-[Miso]
            text-[48px] sm:text-[80px] md:text-[100px] lg:text-[120px]
            leading-[60px] sm:leading-[90px] md:leading-[110px] lg:leading-[120px]
            tracking-[-1px] md:tracking-[-1.2px] capitalize">
            <CountUp end={150} duration={3} />+
          </span>
          <p className="text-white font-[Miso]
            text-[20px] sm:text-[32px] md:text-[40px] lg:text-[60px]
            leading-[28px] sm:leading-[40px] md:leading-[50px] lg:leading-[60px]
            tracking-[-0.6px] capitalize">
            Projects Successfully Delivered
          </p>
        </div>
      </div>

      {/* Client Retention */}
      <div className="justify-end bg-black text-white p-6 sm:p-8 lg:p-10 rounded-[20px] shadow-lg
        border-r-[16px] sm:border-r-[20px] border-r-[#FAB31E]
        h-auto sm:h-[500px] lg:h-[700px] w-full md:w-1/2 flex flex-col">
        <span className="text-[#FAB31E] font-[Miso]
          text-[80px] sm:text-[150px] md:text-[220px] lg:text-[300px]
          leading-[90px] sm:leading-[160px] md:leading-[230px] lg:leading-[300px]
          tracking-[-1.5px] md:tracking-[-3px] capitalize">
          <CountUp end={98} duration={3} />%
        </span>
        <p className="text-white font-[Miso]
          text-[28px] sm:text-[50px] md:text-[80px] lg:text-[120px]
          leading-[36px] sm:leading-[60px] md:leading-[90px] lg:leading-[100px]
          tracking-[-0.6px] capitalize">
          Client Retention Rate
        </p>
      </div>
    </div>
  </div>
</section>

  );
};

export default ThirdSection;
