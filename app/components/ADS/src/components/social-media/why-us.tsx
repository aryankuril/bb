"use client";

import { Reveal } from "../../hooks/use-reveal";
import team from "../../assets/team.jpg";
import { ArrowRight, Check } from "lucide-react";

const points = [
  "One team for strategy, content, design and community — no hand-offs, no tone drift.",
  "An in-house studio in Mumbai, so shoots happen on schedule and creative stays on brand.",
  "A visible content calendar and a monthly report written in plain language.",
  "Paid social used only to amplify what's already working organically.",
];

export function WhyUs() {
  return (
    <section className="border-y bg-card py-20 lg:py-28">
      <div className="mx-auto grid container gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src={team.src}
              alt="The Bombay Blokes social media team reviewing a content grid in their Mumbai studio"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full rounded-3xl object-cover"
            />
            <div className="absolute -bottom-6 left-4 rounded-2xl border bg-background p-4 shadow-lift sm:left-6 sm:p-5">
              <div className="font-display text-2xl font-semibold sm:text-3xl">120+</div>
              <p className="mt-1 subtitle text-muted-foreground">
                pieces of content shipped every month
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-eyebrow subtitle">Why Bombay Blokes</p>
              <a className=" heading mt-4 block">
            A social media agency that behaves like your in-house team.
          </a>
          <p className="mt-5 text-muted-foreground subtitle">
            Most brands don't have a content problem — they have a consistency problem. We take
            ownership of the whole social presence so the brand shows up the same way every single
            week.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3 subtitle leading-relaxed text-foreground/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#audit"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 subtitle font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
          >
            Get your free social audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
