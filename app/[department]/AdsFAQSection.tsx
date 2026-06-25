"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { FAQContent } from "./departmentConfig";
import Button from "../components/Button";

const AdsFAQSection = ({ content }: { content: FAQContent }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Left: sticky heading + CTA */}
        <div className="lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)] rounded-full px-4 py-[9px] mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-highlight)] shrink-0" />
            <span className="font-['Poppins'] font-bold text-[11px] tracking-[0.13em] uppercase text-[var(--color-highlight)]">
              {content.eyebrow}
            </span>
          </div>
          <h6 className="black-text mb-4">
            {content.title}{" "}
            <span className="text-highlight">{content.highlightTitle}</span>
          </h6>
          <p className=" subtitle text-[#46463f] mb-8">
            Can't find what you're looking for? We're happy to walk you through it directly.
          </p>

           <Button
                href="/contactus"
        text="Talk to us"
        type="submit"

        className="black-text cursor-pointer"
      />
         
        </div>

        {/* Right: accordion */}
        <div className="flex-1 space-y-3">
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
                  <span className={`font-['Poppins'] font-semibold text-[16px] sm:text-[17px] leading-[1.4] transition-colors ${
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
        </div>

      </div>
    </section>
  );
};

export default AdsFAQSection;
