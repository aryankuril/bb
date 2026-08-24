"use client";

import { Reveal } from "../../hooks/use-reveal";

const steps = [
  [
    "Audit",
    "We review your social presence, content history and competitors to understand what’s working, what’s missing and where there’s room to grow.",
  ],
  [
    "Strategy",
    "We define your positioning, content pillars, formats and platform strategy — built around your audience and goals.",
  ],
  [
    "Creative Direction",
    "We build the visual language, content formats and creative direction that make your brand recognisable.",
  ],
  [
    "Production",
    "We turn the strategy into content — from shoots and reels to motion and design, produced in-house.",
  ],
  [
    "Publish & Engage",
    "We manage calendars, publishing and community — keeping your content consistent and your audience engaged.",
  ],
  [
    "Report & Optimise",
    "We track what’s working, learn from the data and continuously refine the content, strategy and distribution.",
  ],
];

export function Process() {
  return (
    <section id="process" className="container py-8 sm:py-8 lg:py-8">
      <Reveal>
        <p className="text-eyebrow subtitle">How we work</p>
        <a className="mt-4 heading block max-w-5xl">
         From A Feed That Exists To A Feed That Matters.
        </a>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s[0]} delay={i * 50}>
            <div className="group h-full bg-card p-7 transition-colors duration-300 hover:bg-secondary sm:p-8">
              <span className="font-display text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-20" />
<h6 className="mt-4 text-black">{s[0]}</h6>
               <p className="mt-2 subtitle text-black">{s[1]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
