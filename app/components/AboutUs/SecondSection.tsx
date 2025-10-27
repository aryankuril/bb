"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const services = [
  {
    id: "2016",
    title: "Humble Office Beginning",
    desc: "We started with just the two of us in a small office at Opera House, aiming to make our mark",
    img: "/images/Branding.jpg",
  },
  {
    id: "2018",
    title: "Growing Client Roster",
    desc: "Team Size of a full cricket team - Active client roster had gone up to 15",
    img: "/images/DigitalMarketing.png",
  },
  {
    id: "2019",
    title: "Bigger Office Expansion",
    desc: "Moved to a bigger office space, new clients added Parle Agro Ambassador Hotels, Jade Designs",
    img: "/images/UI-UX.webp",
  },
  {
    id: "2022",
    title: "Expanded Capabilities Team",
    desc: "Our Biggest office to date, now with UI/UX as a core capability and a growing team of 30.",
    img: "/images/Website.webp",
  },
  {
    id: "2023",
    title: "BB Studios Launch",
    desc: "Started BB Studios - full scale production house to meet the market demand of high quality visuals",
    img: "/images/UI-UX.webp",
  },
  {
    id: "2025",
    title: "High-Profile Clientele",
    desc: "JioHotstar becomes a client, team size 40 - hoping to add you as the next big name to our roster",
    img: "/images/Website.webp",
  },
];

export default function SecondSection() {
  const [active, setActive] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastMouse = useRef<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // Handle floating image movement
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
        { scale: 0.5, autoAlpha: 0 },
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
        scale: 0.5,
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

  // Animate cards on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    serviceRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: index * 0.15, ease: "power3.out" }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // Find active service object
  const activeService = services.find((s) => s.id === active);

  return (
    <section id="second-section" className="relative container w-full py-10 sm:py-[60px] lg:py-20">
      {/* Section Heading */}
      <div className="flex items-center justify-center w-full mx-auto lg:mb-50 lg:py-0 py-10">
        <h1 className="text-center black-text">
          Our Evolution: Designing the Future of Brands 
          <span className="text-highlight"> Since 2015</span>
        </h1>
      </div>

      {/* Services List */}
      <div className="mx-auto flex flex-col lg:w-[70%] space-y-16 px-4 sm:px-6 md:px-8 lg:px-0">
        {services.map((s, index) => (
          <div
            key={s.id}
            ref={(el) => {
  serviceRefs.current[index] = el;
}}

            // onMouseEnter={() => setActive(s.id)}
            // onMouseLeave={() => setActive(null)}
            className="flex flex-col md:flex-row md:justify-between md:gap-12 group items-start opacity-0"
          >
            {/* Number */}
            <h2 className="order-1 text-highlight numbering text-left flex items-center justify-center">
              {s.id.toString().padStart(2, "0")}
            </h2>

            {/* Title + Description + Mobile Image */}
            <div className="flex flex-col order-2 space-y-4 text-left max-w-120">
              <h3 className="black-text">{s.title}</h3>

              {/* Mobile Image */}
              <div className="block md:hidden w-full">
                {/* <Image
                  src={s.img}
                  alt={s.title}
                  width={600}
                  height={400}
                  className="rounded-[15px] shadow-lg w-full h-[300px] object-contain"
                /> */}
              </div>

              <p className="black-text max-w-120 body2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image (desktop only) */}
      {activeService && (
        <div
          ref={imgRef}
          className="hidden md:block fixed -top-40 -left-50 pointer-events-none z-50 w-[300px] h-[300px]"
        >
          {/* <Image
            src={activeService.img}
            alt={activeService.title}
            width={300}
            height={300}
            className="rounded-[15px]  shadow-lg w-full h-full object-contain"
          /> */}
        </div>
      )}
    </section>
  );
}
