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
    title: "Social media strategy",
    body: "Positioning, content pillars, tone of voice and a platform plan built from audience research — not guesswork.",
    tags: ["Audit", "Content pillars", "Channel plan"],
  },
  {
    icon: Camera,
    title: "Content & creative production",
    body: "Photo, reels, motion and design produced in-house in Mumbai, art-directed so every post looks like the same brand.",
    tags: ["Shoots", "Reels", "Design"],
  },
  {
    icon: CalendarCheck,
    title: "Social media management",
    body: "Calendars, scheduling, publishing and platform-native optimisation across Instagram, LinkedIn, YouTube and more.",
    tags: ["Calendar", "Publishing", "Reporting"],
  },
  {
    icon: MessagesSquare,
    title: "Community & engagement",
    body: "DMs, comments and conversation handled daily, so the people who discover you actually get a reply.",
    tags: ["Moderation", "Response SLA"],
  },
  {
    icon: Users,
    title: "Influencer & UGC",
    body: "Creator sourcing, briefs and rights management — a steady supply of authentic content that feels like your customers.",
    tags: ["Creators", "UGC library"],
  },
  {
    icon: Megaphone,
    title: "Paid social amplification",
    body: "Supporting layer only: we put budget behind the organic content already proving itself, so reach compounds.",
    tags: ["Boosting", "Retargeting"],
  },
];

export function Services() {
  return (
    <section id="services" className="container px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-eyebrow subtitle">What we do</p>
        <a className="mt-4 heading block max-w-5xl">
          Social media marketing services built around one outcome: a brand worth following.
        </a>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Everything from strategy to the last frame of the reel sits with one team — which is why
          the work stays consistent month after month.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">{s.body}</p>
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
