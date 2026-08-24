"use client";

import { Reveal } from "../../hooks/use-reveal";

const brands = [
  "SOEZI",
  "COLORBOX",
  "Parle Agro",
  "MASON HOME",
  "MY SUIT TAILOR",
  "VERITAAJ",
  "BROOKS",
  "VPADEL",
  "Learnathon",
  "be&a",
];

export function LogoMarquee() {
  return (
    <section className="border-y bg-card py-8 sm:py-8 lg:py-8">
      <Reveal>
        <p className="text-eyebrow px-5 text-center lg:px-8">Brands that trust our work</p>
      </Reveal>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 pr-12">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-lg font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-foreground sm:text-xl"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
