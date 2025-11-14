"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../Button";
import AnimatedButton from "../AnimatedButton";
gsap.registerPlugin(ScrollTrigger);
// ------- Demo data (4 cards) -------
const cardsData = [
  {
    title: "Supersox",
    tags: ["Social Media", "Meta Ads" ,"Shopihy"],
    content:
      "Supersox had already built a solid footprint in offline retail, but their online presence was still dusty. They needed a social media strategy that not only brought in traffic but consistently turned scrollers into shoppers.",
    image: "/images/sm/SS.jpg",
    url: "/work/social-media-marketing/supersox",
  },
   {
    title: "Mr Blox",
    tags: ["UI UX", "Shopihy", ],
    content:
      "Mr Blox is a toy brand for kids 3+, with a playful Panda mascot and a parent-friendly digital presence.",
    image: "/images/webdev/MrBloxnew.jpg",
    url: "/work/website-development/mrblox",
  },
  {
    title: "SCS Sports",
    tags: ["Meta Ads", "Social Media", "SEO"],
    content:
      "Our challenge was to take SCS Sports, a 37-year-old legacy brand with zero online sales, and translate its offline success into digital revenue, a mission that culminated in a game-changing 12x ROAS.",
    image: "/images/sm/SCS.jpg",
    url: "/work/social-media-marketing/scssports",
  },
 
  {
    title: "My Suit Tailor",
    tags: [" UI UX", "Shopify ", "SEO"],
    content:
      "We partnered with My Suit Tailor to craft a translating the art of bespoke tailoring into a seamless digital experience. Our elegant e-commerce platform empowers any man to become his own tailor.",
    image: "/images/webdev/MSTnew.jpg",
    url: "/work/website-development/mysuittailor",
  },
];


// 
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
      // initial state with better performance settings
      gsap.set(cards, {
        y: 120,
        opacity: 0,
        scale: 1,
        willChange: "transform, opacity, filter",
        force3D: true,
        transformPerspective: 1000,
      });
      gsap.set(cards[0], { y: 0, opacity: 1, zIndex: 100 });
      const BEHIND_1 = {
        scale: 0.97,
        opacity: 0.55,
        y: -30,
      };
      const BEHIND_2 = {
        scale: 0.92,
        opacity: 0.28,
        y: -60,
      };
      const firstCardDuration = 20;
      const otherCardsDuration = 100;
      const stepsPercent =
        firstCardDuration + (cards.length - 2) * otherCardsDuration;
      const extraBufferPercent = 60;
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut", duration: 0.8 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + (stepsPercent + extraBufferPercent) + "%",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          // markers: true,
        },
      });
      for (let i = 1; i < cards.length; i++) {
        const curr = cards[i];
        const prev = cards[i - 1];
        const prev2 = i - 2 >= 0 ? cards[i - 2] : null;
        const t = i === 1 ? 0.6 : 0.6 + (i - 1) * 1;
        tl.to(curr, { y: 0, opacity: 1, duration: 0.8 }, t);
        tl.set(curr, { zIndex: 100 + i }, t - 0.01);
        tl.to(prev, { ...BEHIND_1, duration: 0.8 }, t);
        if (prev2) tl.to(prev2, { ...BEHIND_2, duration: 0.8 }, t);
        if (i - 3 >= 0) {
          const older = cards.slice(0, i - 2);
          tl.to(older, { opacity: 0, duration: 0.4 }, t);
        }
      }
    }, section);
    return () => ctx.revert();
  }, []);
  return (
    <div className="py-0 sm:py-10 lg:py-20">
      {/* Pinned stack area */}
      <section
        ref={sectionRef}
        className="relative container w-full py-0 sm:py-10 lg:py-10"
      >
        {/* Title pinned at the top while cards stack below */}
        <div className="sticky top-0 z-30 pointer-events-none">
          <div className="flex items-center justify-center w-full">
            <h2 className="text-center black-text">Our Work</h2>
          </div>
        </div>
        {/* Stacking canvas below the title */}
        <div className="relative w-full pt-20 sm:pt-24 lg:pt-32 mt-10">
          {cardsData.map((card, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              style={{ zIndex: cardsData.length - i }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[clamp(440px,72vh,700px)] rounded-3xl white-text will-change-transform overflow-hidden transform-gpu"
            >
              <div
                aria-hidden
                className="absolute inset-0 translate-y-3 translate-x-3 rounded-3xl bg-white/5 border border-white/10 pointer-events-none"
                style={{ zIndex: 0 }}
              />
              <div
                className="relative h-full rounded-3xl bg-black/95 border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
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
                        className="px-1 py-1 [text-wrap:balance] text-white"
                      >
                        <AnimatedButton text={t} href="/" index={idx} />
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 sm:mt-6 opacity-90 body2 white-text">
                    {card.content}
                  </p>
                </div>
                {/* Right visual */}
                <div className="w-full min-h-0">
                  <div className="w-full h-full min-h-0 flex items-center justify-center py-6 sm:py-8 md:py-10">
                    <div className="relative w-full lg:h-[60vh] h-[30vh]">
                      <Image
  src={card.image}
  alt={card.title}
  width={800}
  height={600}
  className="object-cover rounded-3xl w-full h-full"
  quality={100}
  priority={i === 0}
/>

                    </div>
                  </div>
                </div>
              </div>
              {/* Click overlay */}
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
      </section>
      {/* Tail spacer so after unpin there's breathing room before next section */}
      <div aria-hidden className="h-[60vh]"></div>
        <div className="flex justify-center items-center lg:mt-0 mt-15">
          <Button href="/work" text="Explore Our Work " className="" />
        </div>
    </div>
  );
}