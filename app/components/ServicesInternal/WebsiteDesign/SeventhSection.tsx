"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SeventhSection = () => {
  return (
    <section className="container py-10 sm:py-15 lg:py-20">
      <div className="bg-[var(--color-primary)] rounded-[24px] relative overflow-hidden px-8 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">
        <div className="absolute right-0 top-0 h-full w-3 sm:w-5 candy-border rounded-r-[24px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: CTA content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.1)] rounded-full px-4 py-[9px] mb-6">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-highlight)] shrink-0" />
              <span className="font-['Poppins'] font-bold text-[11px] tracking-[0.13em] uppercase text-[var(--color-highlight)]">
                Let's get started
              </span>
            </div>

            <h2 className="white-text mb-5 max-w-[560px]">
              Connect. Collaborate. <span className="text-highlight">Grow.</span>
            </h2>

            <p className="font-['Poppins'] text-[15.5px] leading-[1.65] text-[rgba(255,255,255,0.6)] max-w-[480px] mb-8">
              Tell us about your project. We'll tell you exactly how we'd approach it — no fluff, no lock-in.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contactus"
                className="inline-flex items-center gap-2 bg-[var(--color-highlight)] text-[var(--color-primary)] font-['Poppins'] font-bold text-[14.5px] px-7 py-[14px] rounded-full hover:brightness-105 transition-all"
              >
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-['Poppins'] text-[13.5px]">
              <span className="text-[rgba(255,255,255,0.45)]">Or reach us directly</span>
              <a href="mailto:hello@bombayblokes.com" className="text-[var(--color-highlight)] hover:underline">hello@bombayblokes.com</a>
              <span className="text-[rgba(255,255,255,0.3)]">·</span>
              <a href="tel:+919987558189" className="text-[var(--color-highlight)] hover:underline">9987558189</a>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="shrink-0 lg:w-[260px] flex items-center justify-center">
            <Image
              width={400}
              height={400}
              alt=""
              src="/images/BB-web-chai-2.gif"
              className="w-[200px] sm:w-[240px] lg:w-[260px] h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeventhSection;
