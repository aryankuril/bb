"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../AnimatedButton";
gsap.registerPlugin(ScrollTrigger);

// ------- Demo data (4 cards) -------
const cardsData = [
  {
    title: "Ric Rac",
    tags: ["Adobe illustrator", "AI"],
    content:
      "Our challenge was launching RicRac Kids from absolute zero—a new brand with no digital footprint, no awareness, and the critical need to build trust from scratch.",
    image: "/images/SocialMedia/ricrac.webp",
    url: "/ricrac",
  },
  {
    title: "SCS",
    tags: ["Meta Ads"],
    content:
      "Our challenge was to take SCS Sports, a 37-year-old legacy brand with zero online sales, and translate its offline success into digital revenue—a mission that culminated in a game-changing 12x ROAS.",
    image: "/images/SocialMedia/scs.webp",
    url: "/scs-sm",
  },
  {
    title: "J K Diamonds Institute",
    tags: ["UI UX", "Framer", "Zoho CRM"],
    content:
      "We partnered with JK Diamonds Institute to create a seamless digital experience that reflects their prestigious brand for prospective students.",
    image: "/images/webdev/Jk-Diamonds.png",
    url: "/jkdiamonds",
  },
  {
    title: "My Suit Tailor",
    tags: [" UI UX", "Shopify "],
    content:
      "We partnered with My Suit Tailor to craft a translating the art of bespoke tailoring into a seamless digital experience. Our elegant e-commerce platform empowers any man to become his own tailor.",
    image: "/images/webdev/MST.png",
    url: "/mysuit",
  },
];

export default function StackingCards() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const BEHIND_1 = {
        scale: 0.96,
        opacity: 0.38,
        y: -40,
        filter: "blur(4px) brightness(0.6)",
      };
      const BEHIND_2 = {
        scale: 0.9,
        opacity: 0.2,
        y: -80,
        filter: "blur(8px) brightness(0.4)",
      };

      gsap.set(cards, { x: 0 });

      gsap.set(cards, {
        y: 240,
        opacity: 0,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        willChange: "transform,opacity",
        force3D: true,
      });
      gsap.set(cards[0], {
        y: 0,
        opacity: 1,
        zIndex: 100,
        filter: "blur(0px) brightness(1)",
      });

      const totalVH = cards.length * 600;
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.5 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalVH}vh`,
          scrub: 3,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        const curr = cards[i];
        const prev = cards[i - 1];
        const prev2 = i - 2 >= 0 ? cards[i - 2] : null;

        const startTime = i * 2;

        tl.to(
          curr,
          { y: 0, opacity: 1, filter: "blur(0px) brightness(1)", duration: 2 },
          startTime
        );
        tl.to(prev, { ...BEHIND_1, duration: 2 }, startTime);
        if (prev2) tl.to(prev2, { ...BEHIND_2, duration: 2 }, startTime);

        if (i - 3 >= 0) {
          const older = cards.slice(0, i - 2);
          tl.to(older, { opacity: 0, duration: 1 }, startTime);
        }

        tl.set(curr, { zIndex: 100 + i }, startTime);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-0 sm:py-10 lg:py-20">
      <div className="flex container items-center justify-center w-full mx-auto ">
        <h2 className="text-center black-text ">our best works</h2>
      </div>
      <section
        ref={sectionRef}
        className="relative container w-full py-0 sm:py-10 lg:py-10"
      >
        <div className="sticky h-[100svh] flex items-center justify-center -mt-20">
          <div className="relative w-full flex items-center justify-center">
            {cardsData.map((card, i) => (
              <div
                key={i}
                ref={setCardRef(i)} // <-- ref remains on the original card DIV
                style={{ zIndex: cardsData.length - i }}
                className="
                absolute left-1/2 -translate-x-1/2
                w-full
                h-[clamp(420px,76vh,600px)]
                rounded-3xl
                white-text
                will-change-transform overflow-hidden
              "
              >
                <div
                  aria-hidden
                  className="absolute inset-0 translate-y-3 translate-x-3 rounded-3xl bg-white/5 border border-white/10 pointer-events-none"
                  style={{ zIndex: 0 }}
                />

                <div
                  className="
                  relative h-full rounded-3xl bg-black/95 border border-white/8
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  p-6 sm:p-8 md:p-10
                  grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8
                "
                  style={{ zIndex: 1 }}
                >
                  <div className="absolute -right-1 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E]"></div>

                  {/* Left content */}
                  <div className="flex flex-col justify-center min-h-0">
                    <h3 className="white-text">{card.title}</h3>

                    <div className="flex flex-wrap mt-4">
  {card.tags.map((t, idx) => (
    <span
      key={idx}
      className="body4 px-1 py-1 [text-wrap:balance] text-white"
    >
      <AnimatedButton text={t} href="/" index={idx} />
    </span>
  ))}
</div>


                    <p className="mt-4 sm:mt-6 opacity-90 body2 white-text">
                      {card.content}
                    </p>
                  </div>

                  {/* Right visual – no cropping, equal top/bottom padding */}
                  <div className="w-full  min-h-0 ">
                    <div className="w-full h-full min-h-0 flex items-center  justify-center py-6 sm:py-8 md:py-10">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="block lg:h-[60vh] h-[30vh] object-cover rounded-3xl"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='100%25' height='100%25' fill='%23151515'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='24'%3EImage%20placeholder%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ------- TRANSPARENT CLICK OVERLAY (non-invasive) ------- */}
                {/* This overlay sits on top and makes the whole card clickable without changing layout or animations */}
                <a
                  href={card.url}
                  aria-label={`Open ${card.title}`}
                  className="absolute inset-0 z-50 block"
                  style={{ pointerEvents: "auto", background: "transparent" }}
                  tabIndex={0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button href="/ourwork" text="Explore Our Work " className="" />
        </div>
      </section>
    </div>
  );
}
