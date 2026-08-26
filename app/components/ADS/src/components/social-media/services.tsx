"use client";

import { Reveal } from "../../hooks/use-reveal";
import {
  Compass,
  Camera,
  CalendarCheck,
  MessagesSquare,
  Users,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Social Media Strategy",
    body: "Positioning, content pillars, tone of voice and platform strategy built around your audience, category and goals.",
    tags: ["Audit", "Content Strategy", "Channel Plan"],
  },
  {
    icon: Camera,
    title: "Content & Creative Production",
    body: "From concepts to shoots, reels and design — everything created in-house to give your brand a distinct visual language.",
    tags: ["Concepts", "Production", "Reels", "Design"],
  },
  {
    icon: CalendarCheck,
    title: "Social Media Management",
    body: "Content calendars, publishing, optimisation and reporting — keeping your social presence consistent and your content moving.",
    tags: ["Calendars", "Publishing", "Reporting"],
  },
  {
    icon: MessagesSquare,
    title: "Community & Engagement",
    body: "We manage the conversations around your brand — from comments and DMs to everyday community interactions.",
    tags: ["Community Management", "Moderation", "Response SLA"],
  },
  {
    icon: Users,
    title: "Influencer & UGC",
    body: "From creator discovery and briefs to content and rights — building a steady stream of creator-led content for your brand.",
    tags: ["Creator Sourcing", "UGC", "Rights Management"],
  },
  {
    icon: Megaphone,
    title: "Paid Social Amplification",
    body: "Putting paid behind content that already works — extending its reach, finding new audiences and driving stronger results.",
    tags: ["Boosting", "Retargeting", "Audience Growth"],
  },
];

export function Services() {
  return (
    <section className="container py-8 sm:py-8 lg:py-8">
     <Reveal className="mx-auto text-center">
  <p className="text-eyebrow subtitle">
    What we do
  </p>

  <a className="mx-auto mt-4 block max-w-7xl heading">
    Social Media Services Built Around One Outcome: A Brand Worth Following.
  </a>

  <p className="mx-auto mt-5 max-w-2xl subtitle black-text">
    Everything from strategy to the last frame of the reel sits with one team
    keeping your brand consistent, recognisable and moving month after month.
  </p>
</Reveal>

      <div id="results" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <article className="group h-full rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-accent">
                  <s.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h6 className="mt-6 text-black">{s.title}</h6>
              <p className=" mt-2.5 subtitle black-text">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium"
                    >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
