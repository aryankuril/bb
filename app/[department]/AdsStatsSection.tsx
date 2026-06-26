"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { StatsContent } from "./departmentConfig";

import { motion} from "framer-motion";
import Button from "../components/Button";
import ContactButton from "../components/ContactButton";

const AdsStatsSection = ({ content }: { content: StatsContent }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      {/* Top row: headline left, achievement stats right */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

        {/* Left: badge + headline */}
        <div className="lg:flex-1">
          
<div className="w-full text-center mb-2">
 <h6 className="inline-block text-center font-black leading-tight text-black">
  We operate on{" "}
  <span className="text-highlight">
    results.
  </span>
</h6>

  <p className="mt-4 max-w-4xl mx-auto text-center text-[#666] subtitle">
    Stop guessing with your digital strategy. Our proven frameworks deliver measurable growth and scale.
  </p>
</div>

        
          
        </div>

      
      </div>

      {/* Problem stat cards */}
      <div
  className={`grid gap-[18px] mt-10 ${
    content.statCards.length === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-5"
  }`}
>
  {content.statCards.map((card, index) => {
    const parts = card.boldWord
      ? card.description.split(new RegExp(`(${card.boldWord})`, "i"))
      : [card.description];

    const isLastOdd =
      content.statCards.length % 2 !== 0 &&
      index === content.statCards.length - 1;

    return (
      <motion.div
        key={card.value}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          bg-white
          border
          border-[rgba(10,10,10,.07)]
          rounded-[20px]
          lg:p-6 p-4

          flex
          flex-col
         
          ${
            isLastOdd
              ? "col-span-2 lg:col-span-1"
              : ""
          }
        `}
      >
        <div className="font-['Poppins'] font-extrabold text-[40px] leading-none text-highlight">
          <CountUp
  start={0}
  end={parseInt(card.value.replace(/[^0-9,]/g, ""))}
  duration={2}
/>
          {card.value.replace(/[0-9,]/g, "")}
        </div>

        <p className="mt-3 subtitle text-[#46463f]">
          {parts.map((part, i) =>
            card.boldWord &&
            part.toLowerCase() === card.boldWord.toLowerCase() ? (
              <b key={i} className="text-[#0A0A0A] font-bold">
                {part}
              </b>
            ) : (
              part
            )
          )}
        </p>
      </motion.div>
    );
  })}
</div>

      {/* CTA banner */}
      {/* <div className="mt-[18px] bg-[var(--color-primary)] rounded-[22px] p-6 sm:p-8 lg:p-9 flex flex-wrap gap-6 items-center justify-between">
        <p className="font-['Poppins'] font-semibold text-[18px] sm:text-[22px] lg:text-[22px] leading-[1.35] text-white max-w-[720px]">
          {content.ctaBanner.text}
        </p>
        <div>
          
    <ContactButton
  href="#contact-form"
  text={content.ctaBanner.buttonText}
  className="white-text cursor-pointer"
/>
    </div>
       
      </div> */}
    </section>
  );
};

export default AdsStatsSection;
