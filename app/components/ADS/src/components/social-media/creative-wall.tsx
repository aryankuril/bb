"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "../../hooks/use-reveal";
import { ArrowLeft, ArrowRight, Heart, Play } from "lucide-react";
import c1 from "../../assets/creative-1.jpg";
import c2 from "../../assets/creative-2.jpg";
import c3 from "../../assets/creative-3.jpg";
import c4 from "../../assets/creative-4.jpg";
import c5 from "../../assets/creative-5.jpg";
import c6 from "../../assets/creative-6.jpg";

const creatives = [
  {
    src: c1,
    brand: "Lumé Skincare",
    type: "Static · Carousel",
    metric: "12.4% engagement",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_1_HERE",
  },
  {
    src: c2,
    brand: "Saanjh Label",
    type: "Reel · Brand film",
    metric: "1.2M views",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_2_HERE",
  },
  {
    src: c3,
    brand: "Bandra Roasters",
    type: "Reel · Menu drop",
    metric: "18k saves",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_3_HERE",
  },
  {
    src: c4,
    brand: "Mason Home",
    type: "Static · Product grid",
    metric: "3.1x reach lift",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_4_HERE",
  },
  {
    src: c5,
    brand: "Aurea Jewels",
    type: "UGC · Creator edit",
    metric: "9.8% CTR to site",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_5_HERE",
  },
  {
    src: c6,
    brand: "Forge Athletic",
    type: "Reel · Community",
    metric: "42k new followers",
    reelUrl: "PASTE_INSTAGRAM_REEL_LINK_6_HERE",
  },
];

export function CreativeWall() {
  const scroller = useRef<HTMLDivElement>(null);
  const autoSlide = useRef<NodeJS.Timeout | null>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;

    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.8, 640),
      behavior: "smooth",
    });
  };

  const startAutoSlide = () => {
    if (autoSlide.current) {
      clearInterval(autoSlide.current);
    }

    autoSlide.current = setInterval(() => {
      const el = scroller.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        el.scrollBy({
          left: Math.min(el.clientWidth * 0.8, 640),
          behavior: "smooth",
        });
      }
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (autoSlide.current) {
      clearInterval(autoSlide.current);
      autoSlide.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  return (
    <section
      id="work"
      className="overflow-hidden border-y bg-card py-20 lg:py-28"
    >
      <div className="container px-5 lg:px-8">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-eyebrow">The work</p>

              <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.08] font-semibold sm:text-5xl">
                Scroll the feed, not the pitch deck.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                A slice of the content we plan, shoot and publish every week
                for brands across beauty, fashion, food, home and fitness.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                aria-label="Scroll left"
                onClick={() => {
                  stopAutoSlide();
                  scrollBy(-1);
                  startAutoSlide();
                }}
                className="grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                aria-label="Scroll right"
                onClick={() => {
                  stopAutoSlide();
                  scrollBy(1);
                  startAutoSlide();
                }}
                className="grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-secondary"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        onTouchStart={stopAutoSlide}
        onTouchEnd={startAutoSlide}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:px-8"
      >
        {creatives.map((c, i) => (
          <a
            key={c.brand}
            href={c.reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-[68vw] shrink-0 snap-start overflow-hidden rounded-3xl border bg-background sm:w-[300px]"
          >
            <figure>
              <img
                src={c.src.src}
                alt={`${c.brand} social media creative — ${c.type}`}
                loading="lazy"
                width={720}
                height={1080}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                {i % 2 === 0 ? (
                  <Heart className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </span>

              <figcaption className="p-4">
                <div className="font-display text-base font-semibold">
                  {c.brand}
                </div>

                <div className="mt-0.5 text-xs text-muted-foreground">
                  {c.type}
                </div>

                <div className="mt-3 inline-flex rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                  {c.metric}
                </div>
              </figcaption>
            </figure>
          </a>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-7xl px-5 text-xs text-muted-foreground lg:px-8">
        Drag or swipe to explore →
      </p>
    </section>
  );
}
