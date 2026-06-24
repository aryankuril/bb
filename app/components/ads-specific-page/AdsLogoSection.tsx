import React from "react";
import LogoSlider from "../Services/LogoSlider";
import type { LogoContent } from "@/app/[department]/departmentConfig";

const AdsLogoSection = ({ content }: { content: LogoContent }) => {
  return (
    <section className="pt-10 sm:pt-14 lg:pt-18 pb-10 sm:pb-15 lg:pb-20 overflow-hidden">
      {/* Header: badge + heading left, subtitle right */}
      <div className="container mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)] rounded-full px-4 py-[9px] mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-highlight)] shrink-0" />
            <span className="font-['Poppins'] font-bold text-[11px] tracking-[0.13em] uppercase text-[var(--color-highlight)]">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="black-text">
            {content.title}{" "}
            <span className="text-highlight">{content.highlightTitle}</span>
          </h2>
        </div>
        <p className="body2 lg:max-w-[380px] lg:pb-1 text-[#46463f]">
          {content.subtitle}
        </p>
      </div>

      {/* Slider with fade edges */}
      <div
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <LogoSlider />
      </div>
    </section>
  );
};

export default AdsLogoSection;
