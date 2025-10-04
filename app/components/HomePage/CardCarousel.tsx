"use client";
 
import { useLayoutEffect, useRef } from "react";
 
type CardItem = {
  id: number;
  src: string;
  alt?: string;
  hoverText?: string;
};

const CardCarousel = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const unsRef = useRef<HTMLSpanElement | null>(null);
  const brandsRef = useRef<HTMLSpanElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
 
  // 🔧 Replace with your real images
  const cards: CardItem[] = [
    { id: 1, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600", hoverText: "View Case Study" },
    { id: 2, src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600", hoverText: "Explore Work" },
    { id: 3, src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600", hoverText: "See Details" },
    { id: 4, src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600", hoverText: "Open Project" },
    { id: 5, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600", hoverText: "Learn More" },
    { id: 6, src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1600", hoverText: "Discover" },
  ];
 
  useLayoutEffect(() => {
    let ctx: { revert: () => void } | null = null;
 
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
 
      const SCROLL_PER_CARD = 500;
 
      const build = () => {
        // compute visible count by breakpoint (1 on mobile, 3 on >= md)
        const visible =
          typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
            ? 3
            : 1;
 
        const totalCards = trackRef.current
          ? trackRef.current.querySelectorAll<HTMLDivElement>("[data-card]").length
          : 0;
 
        const hiddenCards = Math.max(0, totalCards - visible);
        const END_DISTANCE = hiddenCards * SCROLL_PER_CARD;
 
        ctx = gsap.context(() => {
          const $cards = trackRef.current!.querySelectorAll<HTMLDivElement>("[data-card]");
 
          let totalShiftPx = 0;
          if ($cards.length >= 2 && hiddenCards > 0) {
            const first = $cards[0];
            const second = $cards[1];
            const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
            totalShiftPx = -step * hiddenCards;
          }
 
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current!,
              start: "top top",
              end: `+=${END_DISTANCE + 400}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              // markers: true,
            },
          });
 
          // Title color pop
          tl.to([unsRef.current, brandsRef.current], {
            color: "#1D1D1D",
            duration: 0.4,
            ease: "power2.out",
          });
 
          // Cards fade+slide in from right
          tl.fromTo(
            cardsWrapRef.current,
            { xPercent: 20, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "+=0.05"
          );
 
          // Continuous LEFT slide on scroll
          if (hiddenCards > 0 && totalShiftPx !== 0) {
            tl.to(trackRef.current, {
              x: totalShiftPx,
              duration: (END_DISTANCE / (END_DISTANCE + 400)) * 1.2,
              ease: "none",
            });
          }
        }, rootRef);
      };
 
      // initial build
      build();
 
      // Rebuild on resize so visible count & spacing stay perfect
      const onResize = () => {
        if (ctx) ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        build();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
 
      // cleanup
      return () => {
        window.removeEventListener("resize", onResize);
        if (ctx) ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    })();
 
  }, []);
 
  return (
    <section
      ref={rootRef}
      className=" container py-10 sm:py-15 lg:py-20 relative isolate w-full min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Title */}
      <h1
        className="
          text-center 
          pointer-events-none
        "
      >
        <span ref={unsRef} className="text-highlight">UNSKIPPABLE</span>{" "}
        <span ref={brandsRef} className="black-text">BRANDS</span>
      </h1>
 
      {/* Cards */}
      <div
        ref={cardsWrapRef}
        className="
          absolute inset-0 z-10 grid place-items-center
          overflow-hidden opacity-0
        "
      >
        <div
          ref={trackRef}
          className="
            flex items-center
            gap-4 sm:gap-6 md:gap-8 lg:gap-10
            will-change-transform
            px-4 sm:px-6 md:px-10
          "
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              data-card
              className="
                group relative shrink-0
                w-[88vw] sm:w-[88vw] md:w-[calc(100vw/3-2.5rem)]
                aspect-[3/5]
                h-[68svh] lg:h-[70svh]
                rounded-[28px] shadow-2xl overflow-hidden bg-[var(--color-secondary)]
              "
            >
              {/* Image */}
              <img
                src={card.src}
                alt={card.alt ?? `Card ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
 
              {/* Subtle bottom gradient (optional) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
 
              {/* Hover overlay */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  bg-[rgba(29,29,29,0.50)]
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                "
              >
                <span className="white-text body1 text-center px-4">
                  {card.hoverText ?? "Open"}
                </span> 
              </div>
 
              {/* Click target (optional) */}
              <button
                aria-label={card.hoverText ?? `Open Card ${i + 1}`}
                className="absolute inset-0"
                onClick={() => {
                  // handle click / route / lightbox
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardCarousel