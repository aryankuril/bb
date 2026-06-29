"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { FAQContent } from "./departmentConfig";
import Button from "../components/Button";

const AdsFAQSection = ({ content }: { content: FAQContent }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      <div className="flex flex-col  ">

        {/* Left: sticky heading + CTA */}
        <div className="flex flex-col items-center text-center mx-auto">
  <div className="inline-flex items-center gap-2 bg-black rounded-full px-4 py-[9px] lg:mb-5 mb-3">
    <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-highlight)] shrink-0" />
    <span className="font-['Poppins'] subtitle uppercase text-[var(--color-highlight)]">
      {content.eyebrow}
    </span>
  </div>

  <h6 className="black-text">
    {content.title}{" "}
    <span className="text-highlight">{content.highlightTitle}</span>
  </h6>

  <p className="subtitle text-black  lg:mt-4 mt-1">
    Can't find what you're looking for? We're happy to walk you through it directly.
  </p>


</div>

        {/* Right: accordion */}
<div className="flex-1 space-y-3 lg:mt-10 mt-5 lg:max-w-[1000px] lg:mx-auto">
            {content.faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-[16px] overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-[var(--color-highlight)] bg-[var(--color-primary)]"
                    : "border-[rgba(10,10,10,0.1)] bg-white hover:border-[rgba(10,10,10,0.25)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full cursor-pointer text-left px-6 py-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className={`font-outfit font-[500]  text-[18px]  lg:text-[25px] leading-[1.2] transition-colors ${
                    isOpen ? "text-white" : "text-[#0a0a0a]"
                  }`}>
                    {item.question}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[17px] leading-none transition-all ${
                    isOpen
                      ? "border-[var(--color-highlight)] text-[var(--color-highlight)]"
                      : "border-[rgba(10,10,10,0.3)] text-[#0a0a0a]"
                  }`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="subtitle text-[rgba(255,255,255,0.7)] px-6 pb-6 ">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}

            <div className="w-full flex justify-center lg:mt-10 mt-5">
    <button
      onClick={() => {
        document
          .getElementById("contact-form")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="py-[8px] px-[23px] rounded-[5px] cursor-pointer bg-[#F9B31B] border shadow-[2px_2px_0px_0px_#000000] text-black"
    >
      Talk to us
    </button>
  </div>
        </div>

      </div>
    </section>
  );
};

export default AdsFAQSection;
