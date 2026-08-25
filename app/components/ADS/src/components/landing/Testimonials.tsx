"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const testimonials = [
  {
    quote:
      "From day one, it felt like they were as invested in our success as we were. Great communication, great results, highly recommend.",
    name: "Super Sox",
    role: "Client",
  },

 {
  quote:
    "Had a great experience working with Bombay Blokes. The team was professional, supportive, and easy to work with throughout the process. Their understanding of our requirements and approach to marketing made the overall experience smooth and effective. Would definitely recommend working with them.",
  name: "Beco",
  role: "Client",
},

  {
    quote:
      "We've been working with this team for quite some time now, and they've always catered to all our needs on time. They're a solid team and they handle our marketing for us. Always cooperative and genuinely in tune with what's trending. Hoping to go a long way with them!",
    name: "Pavitra Gandhi",
    role: "Ekatra",
  },

  {
    quote:
      "It's been a pleasure being associated with Bombay Blokes. Their marketing work for our brand has been outstanding, and their creativity combined with prompt execution really sets them apart. We also share an easy, collaborative relationship with their team — communication has never been a hassle. Highly recommend working with them.",
    name: "Gaurav Bagaria",
    role: "Chatterbox Labels",
  },

  {
    quote:
      "As a brand owner, what I look for in an agency is honesty and results, not just promises. Bombay Blokes delivered both. They understood our business, communicated clearly, and the growth we've seen has been real and consistent.",
    name: "Pranav Bhimbat",
    role: "Firstedge",
  },
];

export function Testimonials() {

  const autoplay = useRef(
  Autoplay({
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })
);
const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    duration: 30,
  },
  [autoplay.current]
);
  const [selected, setSelected] = useState(0);

const scrollPrev = useCallback(() => {
  emblaApi?.scrollPrev();
  autoplay.current.reset();
}, [emblaApi]);

const scrollNext = useCallback(() => {
  emblaApi?.scrollNext();
  autoplay.current.reset();
}, [emblaApi]);

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
    <section className="py-6 sm:py-8 lg:py-8">
      <div className="container">
        <Reveal className="grid gap-6 sm:flex sm:items-end sm:justify-between">
          <div className="mx-auto text-center">
            <span className="eyebrow subtitle">Social proof</span>
                     <a className="mt-3 heading block">
What our clients say
</a>
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

        <div className="mt-10 overflow-hidden " ref={emblaRef}>
         <div className="flex lg:-ml-4 ml-0">
             {testimonials.map((t) => (
              <figure
                key={t.name}
className="card-soft min-w-0 mr-5 flex-[0_0_calc(100%-1px)] p-7 sm:flex-[0_0_calc(60%-20px)] lg:flex-[0_0_calc(38%-20px)]">
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
              onClick={() => {
  emblaApi?.scrollTo(i);
  autoplay.current.reset();
}}
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
