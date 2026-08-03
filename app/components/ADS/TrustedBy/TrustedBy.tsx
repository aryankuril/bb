"use client";

import Image from "next/image";
import { trustedBy } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { renderIcon } from "../icons";

export default function TrustedBy() {
  const firstRow = trustedBy.logos.slice(0, 10);
  const secondRow = trustedBy.logos.slice(10, 20);

  return (
    <section className="container py-12 sm:py-16 lg:py-20 overflow-hidden" aria-label="Trusted by">
      <Reveal>
        <SectionHeading {...trustedBy.heading} align="center" className="mb-10" />
      </Reveal>

      <div className="space-y-6 mb-12">
        <LogoMarquee logos={firstRow} reverse={false} />
        <LogoMarquee logos={secondRow} reverse />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {trustedBy.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08}>
            <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
                {renderIcon(stat.icon, "w-6 h-6")}
              </div>
              <div>
                <p className="body1 !text-2xl font-medium leading-none">{stat.value}</p>
                <p className="subtitle grey-text mt-1">{stat.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LogoMarquee({ logos, reverse }: { logos: string[]; reverse: boolean }) {
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fdfdfd] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fdfdfd] to-transparent" />
      <div className={`flex gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((logo, i) => (
          <div
            key={`${logo}-${i}`}
            className="flex h-[70px] w-[120px] shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white/70 px-4 backdrop-blur-sm"
          >
            <Image
              src={logo}
              alt=""
              width={100}
              height={50}
              className="max-h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
