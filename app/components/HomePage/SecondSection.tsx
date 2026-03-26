"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Branding - thecha to your vada pav",
    desc: "Branding adds flavor and personality to your brand, giving it a strong identity that everything else builds on.",
    img: "/images/Branding.webp",
  },
  {
    id: 2,
    title: "UI/UX - The First Bite",
    desc: "The first bite defines the entire experience. UI/UX design ensures the user's first interaction with your digital presence is enjoyable, intuitive, and memorable.",
    img: "/images/UI-UX1.png",
  },
  {
    id: 3,
    title: "Web development - the aftertaste",
    desc: "The aftertaste is what lingers and leaves an impression. Web development ensures your website functions smoothly and leaves a lasting, reliable impression on your audience.",
    img: "/images/Website2.webp",
  },
  {
    id: 4,
    title: "Digital marketing - spreading the aroma",
    desc: "Just like the aroma of a Vada Pav spreads and attracts people, digital marketing spreads your message to the audience, making your brand visible and enticing.",
    img: "/images/SocialMedia.webp",
  },
];

export default function SecondSection() {
  const [active, setActive] = useState<number | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Motion values for cursor-follow image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Track cursor movement
  useEffect(() => {
    const moveImage = (e: MouseEvent) => {
      const maxX = window.innerWidth * 0.4; // limit to left 40%
      const clampedX = Math.min(e.clientX, maxX);

      mouseX.set(clampedX);
      mouseY.set(e.clientY);
    };

    if (active !== null) {
      window.addEventListener("mousemove", moveImage);
    }

    return () => {
      window.removeEventListener("mousemove", moveImage);
    };
  }, [active, mouseX, mouseY]);

  // Intersection fade-up animation
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    serviceRefs.current.forEach((ref) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeup");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="second-section"
      className="relative container w-full py-10 sm:py-[60px] lg:py-20"
    >
      {/* Heading */}
      <div className="flex items-center justify-center w-full py-30 lg:mb-20">
        <h1 className="text-center black-text" style={{ textTransform: "none" }}>
          <span className="text-highlight">Born in Bombay,</span> crafting
          digital experiences that connect and inspire.
        </h1>
      </div>

      {/* Services list */}
      <div className="mx-auto flex flex-col lg:w-[70%] space-y-16">
        {services.map((s, index) => (
          <div
            key={s.id}
            ref={(el) => {
              serviceRefs.current[index] = el;
            }}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="flex flex-col md:flex-row md:justify-between md:gap-12 cursor-pointer group items-start opacity-0 fade-up"
          >
            {/* Number */}
            <h2 className="order-1 text-highlight numbering text-left flex items-center justify-center">
              {s.id.toString().padStart(2, "0")}
            </h2>

            {/* Content */}
            <div className="flex flex-col order-2 space-y-4 text-left max-w-120">
              <h3 className="black-text">{s.title}</h3>

              {/* Mobile image */}
              <div className="md:hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  width={600}
                  height={400}
                  className="rounded-[15px] shadow-lg"
                />
              </div>

              <p className="black-text max-w-120 body2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating image (desktop only, follows cursor) */}
      {active !== null && (
        <motion.div
          className="hidden md:block pointer-events-none z-50"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Image
            src={services[active - 1].img}
            alt={services[active - 1].title}
            width={300}
            height={300}
            className="rounded-[15px] shadow-lg"
          />
        </motion.div>
      )}

      {/* Animations */}
      <style jsx global>{`
        .fade-up {
          transform: translateY(50px);
        }

        .animate-fadeup {
          animation: fadeUp 1s ease-out forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
