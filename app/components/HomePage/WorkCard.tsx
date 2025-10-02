"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ------- Demo data (8 cards) -------
const cardsData = [
  {
    title: "EdTech Mobile App",
    tags: ["Mobile App", "Engagement", "UI/UX"],
    content:
      "Crafting Digital Experiences Where Beauty Meets ROI, Turning Heads And Unlocking Revenue Potential With Every Click.",
    image: "/images/section1-img1.png",
  },
  {
    title: "Healthcare Dashboard",
    tags: ["Dashboard", "Analytics", "UI/UX"],
    content:
      "Delivering precision-driven solutions that simplify complex workflows and enhance decision-making.",
    image: "/images/section1-img2.png",
  },
  {
    title: "E-commerce Platform",
    tags: ["E-commerce", "Performance", "UX"],
    content:
      "Boosting sales through seamless checkout flows and engaging shopping experiences.",
    image: "/images/section1-img3.png",
  },
  {
    title: "SaaS Admin Panel",
    tags: ["SaaS", "Admin", "UX"],
    content:
      "Scaling product dashboards that reduce friction and accelerate decision cycles for teams.",
    image: "/images/section1-img4.png",
  },
  {
    title: "Fintech Mobile Experience",
    tags: ["Fintech", "Security", "UI"],
    content:
      "Secure, clear interfaces that build trust and improve conversion for financial products.",
    image: "/images/section1-img1.png",
  },
  {
    title: "Travel Booking Flow",
    tags: ["Travel", "UX", "Performance"],
    content:
      "Streamlined flows that reduce abandonment and increase bookings across devices.",
    image: "/images/section1-img2.png",
  },
  {
    title: "Onboarding Experience",
    tags: ["Onboarding", "Activation", "UX"],
    content:
      "Delightful onboarding that levies progressive profiling and boosts activation.",
    image: "/images/section1-img3.png",
  },
  {
    title: "Marketing Microsite",
    tags: ["Brand", "Marketing", "Design"],
    content:
      "Visually rich microsites built for conversion and campaign storytelling.",
    image: "/images/section1-img4.png",
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
      // immediately behind (lighter) & two-behind (even lighter)
      const BEHIND_1 = { scale: 0.96, opacity: 0.38, y: -40 };
      const BEHIND_2 = { scale: 0.90, opacity: 0.20, y: -80 };

      gsap.set(cards, { x: 0 });

      // Start: everything below; first visible
      gsap.set(cards, {
        y: 240,
        opacity: 0,
        scale: 1,
        willChange: "transform,opacity",
        force3D: true,
      });
      gsap.set(cards[0], { y: 0, opacity: 1, zIndex: 100 });

      const totalVH = cards.length * 240;
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.05 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalVH}vh`,
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });

      // Step through – show current, keep exactly two behind lighter, hide older
      for (let i = 1; i < cards.length; i++) {
        const curr = cards[i];
        const prev = cards[i - 1];
        const prev2 = i - 2 >= 0 ? cards[i - 2] : null;

        // Bring current up from bottom
        tl.to(curr, { y: 0, opacity: 1 }, i);

        // Keep two behind visible & lighter than the top
        tl.to(prev, { ...BEHIND_1 }, i);
        if (prev2) tl.to(prev2, { ...BEHIND_2 }, i);

        // Hide anything older than two-behind (ensures "only last 3 visible")
        if (i - 3 >= 0) {
          const older = cards.slice(0, i - 2);
          tl.to(older, { opacity: 0, duration: 0.6 }, i);
        }

        // Stacking order
        tl.set(curr, { zIndex: 100 + i }, i);
      }

      // Final: enforce top + two lighter behind
      const last = cards.length - 1;
      if (last >= 2) {
        tl.addLabel("final", last + 0.001);
        tl.to(cards[last - 1], { ...BEHIND_1, duration: 0.01 }, "final");
        tl.to(cards[last - 2], { ...BEHIND_2, duration: 0.01 }, "final");
        if (last - 2 > 0) tl.set(cards.slice(0, last - 2), { opacity: 0 }, "final");
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full  container py-10 sm:py-15 lg:py-20">

      {/* <div className="flex items-center justify-center lg:w-[900px] w-full px-4 sm:px-6 md:px-8 lg:px-0 mx-auto">
  <h2 className="text-center text-[#1D1D1D] font-[Miso] font-normal capitalize text-[28px] leading-[32px] tracking-[-1px] sm:text-[36px] sm:leading-[40px] sm:tracking-[-1.5px] md:text-[48px] md:leading-[52px] md:tracking-[-2px] lg:text-[64px] lg:leading-[68px] lg:tracking-[-2.2px] xl:text-[80px] xl:leading-[82px] xl:tracking-[-2.4px]">
     our best works
  </h2>
</div> */}
      {/* Sticky viewport area */}
      <div className="sticky  h-[100svh] flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          {cardsData.map((card, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              style={{ zIndex: cardsData.length - i }}
              className="
                absolute left-1/2 -translate-x-1/2
                w-[94%]
                /* Equal height on all screens using clamp */
                h-[clamp(420px,76vh,600px)]
                rounded-3xl
                text-white
                will-change-transform overflow-hidden
              "
            >
              {/* secondary grey card behind (lighter) */}
              <div
                aria-hidden
                className="absolute inset-0 translate-y-3 translate-x-3 rounded-3xl bg-white/5 border border-white/10 pointer-events-none"
                style={{ zIndex: 0 }}
              />

              {/* main card */}
              <div
                className="
                  relative h-full rounded-3xl bg-black/95 border border-white/8
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  p-6 sm:p-8 md:p-10
                  grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8
                "
                style={{ zIndex: 1 }}
              >
                {/* yellow accent line (uses --color-highlight) */}
               <div className="absolute -right-1 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E]"></div>


                {/* Left content */}
                <div className="flex flex-col justify-center min-h-0">
                  <h3 className="font-[miso] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    {card.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                    {card.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-['Poppins']  sm:text-sm px-3 py-1 rounded-full border border-white/30/ [text-wrap:balance]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed opacity-90 font-['Poppins'] ">
                    {card.content}
                  </p>
                </div>

                {/* Right visual keeps equal height with card */}
                <div className="w-full h-full">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='100%25' height='100%25' fill='%23151515'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='24'%3EImage%20placeholder%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
