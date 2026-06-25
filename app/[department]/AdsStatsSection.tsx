"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { StatsContent } from "./departmentConfig";
import Button from "../components/Button";

const AdsStatsSection = ({ content }: { content: StatsContent }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      {/* Top row: headline left, achievement stats right */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

        {/* Left: badge + headline */}
        <div className="lg:flex-1">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)] rounded-full px-4 py-[9px] mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-highlight)] shrink-0" />
            <span className="font-['Poppins'] font-bold text-[11px] tracking-[0.13em] uppercase text-[var(--color-highlight)]">
              {content.eyebrow}
            </span>
          </div>
          <h6 className="black-text">{content.headline}</h6>
        </div>

      
      </div>

      {/* Problem stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] mt-10">
        {content.statCards.map((card) => {
          const parts = card.boldWord
            ? card.description.split(new RegExp(`(${card.boldWord})`, "i"))
            : [card.description];

          return (
            <div
              key={card.value}
              className="bg-white border border-[rgba(10,10,10,.07)] rounded-[20px] p-7"
            >
              <div className="font-['Poppins'] font-extrabold text-[52px] leading-none text-highlight">
                {card.value}
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
            </div>
          );
        })}
      </div>

      {/* CTA banner */}
      <div className="mt-[18px] bg-[var(--color-primary)] rounded-[22px] p-6 sm:p-8 lg:p-9 flex flex-wrap gap-6 items-center justify-between">
        <p className="font-['Poppins'] font-semibold text-[18px] sm:text-[20px] lg:text-[22px] leading-[1.35] text-white max-w-[720px]">
          {content.ctaBanner.text}
        </p>
        <div>
      <Button
                href={content.ctaBanner.buttonHref}
        text={content.ctaBanner.buttonText}
        type="submit"

        className="white-text cursor-pointer"
      />
    </div>
       
      </div>
    </section>
  );
};

export default AdsStatsSection;
