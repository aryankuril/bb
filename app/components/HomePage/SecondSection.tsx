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

  // NEW: remember the latest cursor position so we can place the image there instantly on enter
  const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!imgRef.current) return;

    const moveImage = (e: MouseEvent) => {
      // store latest mouse for precise entry placement
      lastMouse.current.x = e.clientX + 20;
      lastMouse.current.y = e.clientY + 20;

      // follow the cursor smoothly
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

      // IMPORTANT: place under the cursor *before* showing to avoid top-left scaling
      gsap.killTweensOf(imgRef.current);
      gsap.set(imgRef.current, {
        x: lastMouse.current.x,
        y: lastMouse.current.y,
        transformOrigin: "50% 50%",
        willChange: "transform,opacity",
        force3D: true,
      });

      // smooth zoom/fade in (no bounce)
      gsap.fromTo(
        imgRef.current,
        { scale: 0.95, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" }
      );
    } else {
      // gentle fade/scale out to avoid popping
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
    <section className="relative w-full  container py-10 sm:py-15 lg:py-20">
      <div className="flex items-center justify-center lg:w-[900px] w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 mx-auto">
        <h1 className="text-center text-[#1D1D1D] font-[Miso] font-normal capitalize text-[28px] leading-[32px] tracking-[-1px] sm:text-[36px] sm:leading-[40px] sm:tracking-[-1.5px] md:text-[48px] md:leading-[52px] md:tracking-[-2px] lg:text-[64px] lg:leading-[68px] lg:tracking-[-2.2px] xl:text-[80px] xl:leading-[82px] xl:tracking-[-2.4px]">
          <span className="text-[#FAB31E]">Born in Bombay </span>, crafting digital experiences that connect and inspire.
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col space-y-16  ">
        {services.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-8 cursor-pointer group items-start md:justify-items-end sm:justify-items-start"
          >
            {/* Number */}
            <h2 className="order-1 text-[#FAB31E] text-center font-[Miso] font-normal capitalize text-[80px] leading-[80px] tracking-[-2px] sm:text-[150px] sm:leading-[150px] md:text-[200px] md:leading-[200px] lg:text-[250px] lg:leading-[250px] xl:text-[300px] xl:leading-[300px] 2xl:text-[350px] 2xl:leading-[350px]">
              {s.id.toString().padStart(2, '0')}
            </h2>

            {/* Title + Description + Mobile Image */}
            <div className="flex flex-col order-2 mt-20">
              <h3 className="text-[#1D1D1D] font-[miso] font-normal capitalize mb-3 text-[30px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[50px] md:leading-[56px] lg:text-[60px] lg:leading-[64px] xl:text-[80px] xl:leading-[60px]">
                {s.title}</h3>

              {/* Mobile-only image (hidden on desktop) */}
              <div className="block md:hidden mb-4">
                <Image
                  src={s.img}
                  alt={s.title}
                  width={600}
                  height={400}
                  className="rounded-[30px] shadow-lg w-full"
                />
              </div>

              <p className="text-[#1D1D1D] font-[Poppins] font-normal capitalize max-w-xl text-[16px] leading-[20px] tracking-[-0.5px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[24px] lg:text-[22px] lg:leading-[28px] xl:text-[24px] xl:leading-[30px]">
                {s.desc}</p>
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
