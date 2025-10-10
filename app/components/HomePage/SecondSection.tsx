"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: " Branding – thecha to your vada pav",
    desc: "Branding adds flavor and personality to your brand, giving it a strong identity that everything else builds on.",
    img: "/images/Branding.png",
  },
  {
    id: 2,
    title: "Digital marketing – spreading the aroma ",
    desc: "Just like the aroma of a Vada Pav spreads and attracts people, digital marketing spreads your message to the audience, making your brand visible and enticing.",
    img: "/images/Digital-Marketing.png",
  },
  {
    id: 3,
    title: "Web development – the aftertaste",
    desc: "The aftertaste is what lingers and leaves an impression.Web development ensures your website functions smoothly and leaves a lasting, reliable impression on your audience.",
    img: "/images/UI-UX.png",
  },
  {
    id: 4,
    title: "ui/ux – the firstbite - UI/UX The First Bite",
    desc: "The first bite defines the entire experience.UI/UX design ensures the user’s first interaction with your digital presence is enjoyable, intuitive, and memorable.",
    img: "/images/Website.png",
  },
];

export default function SecondSection() {
  const [active, setActive] = useState<number | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

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
      if (lastMouse.current.x === 0 && lastMouse.current.y === 0) {
        lastMouse.current.x = window.innerWidth / 2;
        lastMouse.current.y = window.innerHeight / 2;
      }

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
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        }
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
    <section id="second-section" className="relative w-full py-10 sm:py-[60px] lg:py-20">
      <div className="flex items-center justify-center lg:w-[80%] w-full  py-10 px-4 sm:px-6 md:px-8 lg:px-0 mx-auto">
        <h2 className="text-center black-text">
          <span className="text-highlight">Born in Bombay </span>, crafting
          digital experiences that connect and inspire.
        </h2>
      </div>

      <div className="mx-auto flex flex-col lg:w-[70%] space-y-16 px-4 sm:px-6 md:px-8 lg:px-0">
        {services.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="
              flex flex-col
              md:flex-row md:justify-between
              md:gap-12
              cursor-pointer group items-start
            "
          >
            {/* Number */}
            <h2 className="order-1 text-highlight numbering text-left flex items-center justify-center">
              {s.id.toString().padStart(2, "0")}
            </h2>

            {/* Title + Description + Mobile Image */}
            <div className="flex flex-col order-2 space-y-4 text-left max-w-120">
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
