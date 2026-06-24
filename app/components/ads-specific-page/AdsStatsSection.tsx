"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { StatsContent } from "@/app/[department]/departmentConfig";

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
          <h2 className="black-text">{content.headline}</h2>
        </div>

        {/* Right: 2×2 achievement stats */}
        <div
          ref={ref}
          className="grid grid-cols-2 gap-3 lg:gap-4 lg:w-[480px] shrink-0"
        >
          {content.achievementStats.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-[var(--color-primary)] p-4 sm:p-5 rounded-[18px] overflow-hidden min-h-[150px] sm:min-h-[160px]"
            >
              <div className="absolute right-0 top-0 h-full w-3 candy-border rounded-r-[18px]" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="flex items-end leading-none">
                  <span
                    className={`text-highlight font-['Miso'] leading-[0.85] ${
                      stat.isLongValue
                        ? "text-[52px] sm:text-[60px]"
                        : "text-[58px] sm:text-[68px]"
                    }`}
                  >
                    {inView && <CountUp end={stat.value} duration={3} />}
                  </span>
                  <span
                    className={`text-highlight font-['Miso'] leading-[0.85] ${
                      stat.isLongValue
                        ? "text-[38px] sm:text-[44px]"
                        : "text-[44px] sm:text-[52px]"
                    }`}
                  >
                    {stat.suffix}
                  </span>
                </div>
                <p className="white-text font-['Miso'] text-[26px] sm:text-[28px] leading-[1.1] mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
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
              <div className="font-['Poppins'] font-extrabold text-[40px] leading-none text-highlight">
                {card.value}
              </div>
              <p className="mt-3 text-[15.5px] leading-[1.55] text-[#46463f]">
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
        <Link
          href={content.ctaBanner.buttonHref}
          className="shrink-0 inline-flex items-center gap-2 bg-[var(--color-highlight)] text-[var(--color-primary)] font-['Poppins'] font-bold text-[15px] px-6 py-[15px] rounded-full whitespace-nowrap hover:brightness-105 transition-all"
        >
          {content.ctaBanner.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default AdsStatsSection;
