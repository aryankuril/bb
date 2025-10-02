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
    <section ref={root} className="w-full" aria-labelledby="roi-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left: Counter */}
          <div className="md:col-span-2 flex justify-center md:justify-start items-center">
            <span
              ref={counterRef}
              className="tracking-tight font-normal"
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
              className="text-[#1D1D1D] tracking-tight font-semibold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Of Performance Marketing Budgets Don’t Deliver ROI.
            </h2>
            <p
              ref={subCopyRef}
              className="mt-4 text-base sm:text-lg leading-relaxed text-[#1D1D1D]/80"
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