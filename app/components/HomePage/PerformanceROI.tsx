"use client";
 
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
gsap.registerPlugin(ScrollTrigger);
 
export default function PerformanceROI() {
  const root = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const subCopyRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
 
  useEffect(() => {
    if (!root.current) return;
 
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, subCopyRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
 
      if (!prefersReduced && counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 80,
          duration: 2,
          ease: "power3.out",
          snap: { val: 1 },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            once: true,
          },
        });
      } else if (counterRef.current) {
        counterRef.current.textContent = "80%";
      }
    }, root);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section ref={root} className="w-full container py-10 sm:py-15 lg:py-20" aria-labelledby="roi-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left: Counter */}
          <div className="md:col-span-2 flex justify-center md:justify-start items-center">
            <span
              ref={counterRef}
              className="tracking-tight font-normal font-miso"
              style={{
                color: "#FAB31E",
                fontSize: "clamp(5rem, 18vw, 14rem)",
                lineHeight: "0.9",
                fontWeight: 400,
              }}
            >
              0%
            </span>
          </div>
 
          {/* Right: Text */}
          <div className="md:col-span-3 flex flex-col justify-center text-center md:text-left">
            <h2
              id="roi-heading"
              ref={titleRef}
              className="text-[#1D1D1D] font-[miso]  capitalize mb-3 text-[30px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[50px] md:leading-[56px] lg:text-[60px] lg:leading-[64px] xl:text-[60px] xl:leading-[60px]"

            >
              Of Performance Marketing Budgets Don’t Deliver ROI.
            </h2>
            <p
              ref={subCopyRef}
              className="text-[#1D1D1D] font-[Poppins] font-normal capitalize max-w-xl text-[16px] leading-[20px] tracking-[-0.5px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] xl:text-[24px] xl:leading-[30px]"
            >
              Most ad spend is wasted on poor targeting, weak creatives, and
              missed optimization — only <span className="font-medium">20%</span> drives real growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}