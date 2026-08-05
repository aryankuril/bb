"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const testimonials = [
  {
    quote:
      "Working with Bombay Blokes has been seamless from day one. Their understanding of digital marketing and ability to execute consistently has helped us achieve our business objectives.",
    name: "Kaushik Shah",
    role: "Founder, Retail brand",
  },
  {
    quote:
      "From website development to e-commerce solutions, the team demonstrated exceptional expertise and professionalism. They are a partner that genuinely cares about business growth.",
    name: "Alex Kriplani",
    role: "Director, D2C ecommerce",
  },
  {
    quote:
      "Bombay Blokes truly offers some of the best digital services in the industry. From social media marketing to web development, they consistently deliver outstanding results.",
    name: "Tilika Vispute",
    role: "Marketing Head",
  },
  {
    quote:
      "Our cost per lead dropped in the first month and, more importantly, the leads were people who actually picked up the phone. That is the difference.",
    name: "Rohan Mehta",
    role: "Sales Lead, Real estate",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <Reveal className="grid gap-6 sm:flex sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow subtitle">Social proof</span>
            <h2 className="mt-4 ">What our clients say</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={scrollPrev}
              className="border-border grid size-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={scrollNext}
              className="border-border grid size-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="card-soft min-w-0 flex-[0_0_100%] p-7 sm:flex-[0_0_60%] lg:flex-[0_0_38%]"
              >
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-secondary" />
                  <div className="flex items-center gap-1 subtitle font-bold">
                    5.0
                    <Star className="size-4 fill-secondary text-secondary" />
                  </div>
                </div>
                <blockquote className="mt-5 subtitle">“{t.quote}”</blockquote>
                <figcaption className="border-border mt-6 border-t pt-5">
                  <div className="font-bold subtitle">{t.name}</div>
                  <div className="text-muted-foreground subtitle">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-8 bg-secondary" : "bg-border w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
