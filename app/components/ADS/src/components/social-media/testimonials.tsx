"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../../hooks/use-reveal";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

const quotes = [
  {
    text: "Working with Bombay Blokes has been seamless from day one. Their understanding of content and their ability to execute consistently has completely changed how our brand shows up on social.",
    name: "Kaushik Shah",
    role: "Founder, D2C beauty brand",
  },
  {
    text: "They took over strategy, shoots and community management and gave us back our week. The feed finally has a personality and our DMs are full of real buyers.",
    name: "Alex Kriplani",
    role: "Marketing Head, home & living",
  },
  {
    text: "From social media marketing to creative direction, they consistently deliver work we're proud to publish. Genuinely one of the best social media agencies in Mumbai.",
    name: "Tilika Vispute",
    role: "Co-founder, fashion label",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  const go = (d: number) =>
    setI((p) => (p + d + quotes.length) % quotes.length);

  useEffect(() => {
    const interval = setInterval(() => {
      go(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const q = quotes[i]!;

  return (
    <section className="border-y bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-eyebrow">Client words</p>
          <Quote className="mx-auto mt-6 h-8 w-8 text-accent" />
          <h6
            key={i}
            className="animate-fade-in mt-6 font-display text-2xl leading-[1.25] font-medium sm:text-[2.1rem]"
          >
            “{q.text}”
          </h6>
          <div className="mt-8 flex items-center justify-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-4 font-semibold subtitle">{q.name}</p>
          <p className="text-sm text-muted-foreground subtitle">{q.role}</p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {quotes.map((_, d) => (
                <button
                  key={d}
                  aria-label={`Go to testimonial ${d + 1}`}
                  onClick={() => setI(d)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    d === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}