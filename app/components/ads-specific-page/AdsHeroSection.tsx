"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import type { HeroContent } from "@/app/[department]/departmentConfig";

const AdsHeroSection = ({ content }: { content: HeroContent }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % content.images.length);
    }, 1700);

    return () => clearInterval(interval);
  }, [content.images.length]);

  return (
    <section className="w-full container py-0 sm:py-15 lg:py-20 lg:mt-10 -mt-10 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="flex-1 text-left space-y-4">
        <h1 className="w-full max-w-[700px] mx-auto md:mx-0 lg:mt-10">
          {content.headline}{" "}
          <span className="text-highlight">{content.highlightText}</span>
        </h1>

        <p className="body2 w-full max-w-[600px] mt-4 break-words">
          {content.description}
        </p>

        <div className="mt-6 lg:mt-10 z-50">
          <Button
            href={content.ctaHref}
            text={content.ctaText}
            className="lg:mt-10"
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[600px] relative">
        <div className="aspect-[4/3] relative rounded-[15px] overflow-hidden">
          {content.images.map((img, idx) => (
            <Image
              width={1000}
              height={1000}
              key={img}
              src={img}
              alt={`${content.headline} slide ${idx + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                idx === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="hidden sm:block font-['Poppins'] absolute top-4 lg:-left-25 left-4 z-30 bg-[#FAB31E] rounded-[20px_20px_0px_20px] px-3 sm:px-5 py-1 sm:py-2 shadow-md">
          <span className="text-black text-xs sm:text-sm leading-[20px] sm:leading-[30px] tracking-[-0.36px] whitespace-nowrap">
            {content.badgeText}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AdsHeroSection;
