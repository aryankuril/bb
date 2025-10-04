"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: "Branding",
    desc: "Most Ad Spend Is Wasted On Poor Targeting, Weak Creatives, And Missed Optimization, Only 20% Drives Real Growth.",
    img: "/images/section1-img1.png",
  },
  {
    id: 2,
    title: "Digital Marketing",
    desc: "Most Ad Spend Is Wasted On Poor Targeting, Weak Creatives, And Missed Optimization, Only 20% Drives Real Growth.",
    img: "/images/section1-img2.png",
  },
  {
    id: 3,
    title: "UI/UX",
    desc: "Most Ad Spend Is Wasted On Poor Targeting, Weak Creatives, And Missed Optimization, Only 20% Drives Real Growth.",
    img: "/images/section1-img3.png",
  },
  {
    id: 4,
    title: "Website Development",
    desc: "Most Ad Spend Is Wasted On Poor Targeting, Weak Creatives, And Missed Optimization, Only 20% Drives Real Growth.",
    img: "/images/section1-img4.png",
  },
];

export default function SecondSection() {
  const [active, setActive] = useState<number | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!imgRef.current) return;

    const moveImage = (e: MouseEvent) => {
      lastMouse.current.x = e.clientX + 20;
      lastMouse.current.y = e.clientY + 20;

      gsap.to(imgRef.current, {
        x: lastMouse.current.x,
        y: lastMouse.current.y,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    if (active !== null) {
      window.addEventListener("mousemove", moveImage);

      gsap.killTweensOf(imgRef.current);
      gsap.set(imgRef.current, {
        x: lastMouse.current.x,
        y: lastMouse.current.y,
        transformOrigin: "50% 50%",
        willChange: "transform,opacity",
        force3D: true,
      });

      gsap.fromTo(
        imgRef.current,
        { scale: 0.95, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" }
      );
    } else {
      gsap.to(imgRef.current, {
        scale: 0.97,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.inOut",
        clearProps: "willChange",
        overwrite: "auto",
      });

      window.removeEventListener("mousemove", moveImage);
    }

    return () => {
      window.removeEventListener("mousemove", moveImage);
    };
  }, [active]);

  return (
    <section className="relative w-full py-10 sm:py-[60px] lg:py-20">
      <div className="flex items-center justify-center w-[80%]  py-10 px-4 sm:px-6 md:px-8 lg:px-0 mx-auto">
        <h2 className="text-center black-text">
          <span className="text-highlight">Born in Bombay </span>, crafting digital experiences that connect and inspire.
        </h2>
      </div>

      <div className="mx-auto flex flex-col lg:w-[70%] space-y-16 px-4 sm:px-6 md:px-8 lg:px-0">
        {services.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => setActive(s.id)} 
            onMouseLeave={() => setActive(null)}
            className="
              grid grid-cols-1
              md:grid-cols-[120px_1fr]
              md:gap-0 
              cursor-pointer group items-center
              md:justify-items-end
            "
          >
            {/* Number */}
            <h2 className="order-1 text-highlight numbering">
              {s.id.toString().padStart(2, "0")}
            </h2>

            {/* Title + Description + Mobile Image */}
            <div className="flex flex-col order-2 space-y-4 md:space-y-0">
              <h3 className="black-text">{s.title}</h3>

              {/* Mobile-only image (hidden on desktop) */}
              <div className="block md:hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  width={600}
                  height={400}
                  className="rounded-[30px] shadow-lg w-full"
                />
              </div>

              <p className="black-text max-w-120 body2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image (desktop only) */}
      {active !== null && (
        <div
          ref={imgRef}
          className="hidden md:block fixed -top-40 -left-50 pointer-events-none z-50"
        >
          <Image
            src={services[active - 1].img}
            alt={services[active - 1].title}
            width={300}
            height={300}
            className="rounded-[30px] shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
