"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const services = [
  {
    number: "2016",
    title: "Humble Office Beginning",
    desc: "Started from a small office in Opera House with 0 employees just us 2 partners trying to make a mark",
    img: "/images/Branding.jpg",
  },
  {
    number: "2018",
    title: "Growing Client Roster",
    desc: "Team Size of a full cricket team - Active client roster had gone up to 15",
    img: "/images/DigitalMarketing.png",
  },
  {
    number: "2019",
    title: "Bigger Office Expansion",
    desc: "Moved to a bigger office space, new clients added Parle Agro Ambassador Hotels, Jade Designs",
    img: "/images/UI-UX.webp",
  },
  {
    number: "2022",
    title: "Expanded Capabilities Team",
    desc: "Our biggest office yet - added UI / UX as core capabilities - team size 30",
    img: "/images/Website.webp",
  },
  {
    number: "2023",
    title: "BB Studios Launch",
    desc: "Started BB Studios - full scale production house to meet the market demand of high quality visuals",
    img: "/images/UI-UX.webp",
  },
  {
    number: "2025",
    title: "High-Profile Clientele",
    desc: "JioHotstar becomes a client, team size 40 - hoping to add you as the next big name to our roster",
    img: "/images/Website.webp",
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
      {/* Section Heading */}
      <div className="flex items-center justify-center lg:w-[80%] w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 mx-auto">
        <h2 className="text-center black-text">
          <span className="text-highlight">Born in Bombay </span>, crafting digital experiences that connect and inspire.
        </h2>
      </div>

      {/* Services List */}
      <div className="mx-auto flex flex-col lg:w-[70%] space-y-16 px-4 sm:px-6 md:px-8 lg:px-0">
        {services.map((s, index) => (
          <div
            key={index}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className="flex flex-col md:flex-row md:justify-between md:gap-12 cursor-pointer group items-start"
          >
            {/* Custom Number */}
            <h2 className="order-1 text-highlight numbering text-left flex items-center justify-center">
              {s.number}
            </h2>

            {/* Title + Description + Mobile Image */}
            <div className="flex flex-col order-2 space-y-4 text-left max-w-120">
              <h3 className="black-text">{s.title}</h3>

              {/* Mobile-only image */}
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

      {/* Floating Image (Desktop only) */}
      {active !== null && (
        <div
          ref={imgRef}
          className="hidden md:block fixed -top-40 -left-50 pointer-events-none z-50"
        >
          <Image
            src={services[active].img}
            alt={services[active].title}
            width={300}
            height={300}
            className="rounded-[30px] shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
