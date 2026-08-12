"use client";

import { Reveal } from "../../hooks/use-reveal";

const steps = [
  ["Audit", "We review your profiles, content history and three competitors to find what's missing."],
  ["Strategy", "Positioning, content pillars, formats and a posting rhythm per platform."],
  ["Creative direction", "Moodboards, grid design and a visual language your feed sticks to."],
  ["Production", "Shoots, reels, motion and design produced in-house, batched monthly."],
  ["Publish & engage", "Scheduling, captions, hashtags and daily community management."],
  ["Report & scale", "Monthly readout, what we'll double down on, and where paid can amplify."],
];

export function Process() {
  return (
    <section id="process" className="container px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-eyebrow subtitle">How we work</p>
        <a className="mt-4 heading block max-w-5xl">
          Six steps from a scattered feed to a social presence with a point of view.
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
