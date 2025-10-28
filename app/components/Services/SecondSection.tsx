"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
interface Card {
  number?: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  shape: "square" | "rectangle" | "circle";
}
const cards: Card[] = [
  {
    number: "01",
    title: "Design & Branding",
    subtitle:
      "We translate your core purpose into an authentic experience that builds lifelong advocacy and market leadership.",
    image: "/images/branding-cs/barnd3.jpg",
    link: "/services/design-branding",
    shape: "rectangle",
  },
  {
    number: "02",
    title: "Web Development & UI UX",
    subtitle:
      "We build pixel-perfect websites and digital experiences that aren't just beautiful, but are engineered to convert.",
    image: "/images/servicespage/Development.png",
    link: "/services/website-development",
    shape: "square",
  },
  {
    number: "03",
    title: "SEO ",
    subtitle:
      "We put your brand at the top of Google, connecting you with customers who are already searching for you.",
    image: "/images/servicespage/SEO.png",
    link: "/services/seo-services",
    shape: "circle",
  },
  {
    number: "04",
    title: "GEO",
    subtitle:
      "We position your content for citation, connecting your brand directly with users who need a definitive, AI-validated answer.",
    image: "/images/geo-cs/geo-1.jpg",
    link: "/services/geo-services",
    shape: "rectangle",
  },
  {
    number: "05",
    title: "Social Media Management",
    subtitle:
      "We build and nurture your online community, turning followers into loyal fans through creative content and authentic engagement.",
    image: "/images/servicespage/Social-Media.png",
    link: "/services/social-media-marketing",
    shape: "square",
  },
  {
    number: "06",
    title: "Performance Marketing",
    subtitle:
      "We create data-driven ad campaigns that deliver measurable results, turning clicks into customers and spend into revenue.",
    image: "/images/servicespage/Performance.png",
    link: "/services/performance-marketing",
    shape: "circle",
  },
];
export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const isMobile =
  typeof window !== "undefined" && window.innerWidth <= 768;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);
  const segment = 1 / cards.length;
  return (
    <section
      id="second-section"
      className="container py-10 sm:py-15 lg:py-20 relative w-full"
    >
      {/* Sticky Title */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none z-0 px-2">
        <div
          style={{
            color: progress < 0.05 ? "#1D1D1D" : "#F1F1F1",
            transition: "color 0.3s linear",
          }}
          className="text-center single-title select-none"
        >
          Services
        </div>
      </div>
      {/* Scrollable Cards */}
      <div ref={containerRef} className="relative h-[800vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => {
            const start = i * segment;
            const end = start + segment;
            const visible = progress >= start && progress <= end;
            const localProgress = Math.min(
              Math.max((progress - start) / segment, 0),
              1
            );
            const y = 100 - localProgress * 200;
            const rotate =
              i % 2 === 0 ? (1 - localProgress) * 5 : (localProgress - 1) * 5;
            return (
              <Link key={i} href={card.link} scroll={true}>
                <motion.div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`absolute top-1/2 md:px-4 px-2 z-10
      ${i % 2 === 0 ? "md:left-0" : "md:right-0"} 
      max-md:left-1/2 max-md:-translate-x-1/2`}
                  style={{
                    cursor: "pointer",
                    willChange: visible ? "transform, opacity" : "auto",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitPerspective: 1000,
                    perspective: 1000,
                    translateY: "-50%",
                  }}
                  animate={{
                    y: `${y}%`,
                    rotate: rotate,
                    opacity: visible ? 1 : 0,
                  }}
                  transition={{
                    type: "tween",
                    ease: "linear",
                    duration: 0.3,
                    opacity: { duration: 0.3 },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const cardElement = cardRefs.current[i];
                    if (!cardElement) return;
                    // Animate card before navigating
                    gsap.to(cardElement, {
                      y: "100vh",
                      opacity: 0,
                      duration: 0.6,
                      ease: "power3.inOut",
                      onComplete: () => {
                        window.location.href = card.link;
                      },
                    });
                  }}
                >
                  <div
                    className="flex flex-col justify-end p-4 sm:p-6 border-[5px] border-[var(--color-primary)]"
                    style={{
    width: isMobile
      ? card.shape === "circle"
        ? "330px"
        : card.shape === "square"
        ? "330px"
        : "330px"
      : card.shape === "circle"
      ? "clamp(220px, 65vw, 480px)"
      : card.shape === "square"
      ? "clamp(220px, 75vw, 550px)"
      : "clamp(260px, 80vw, 650px)",

    height: isMobile
      ? card.shape === "circle"
        ? "350px"
        : card.shape === "square"
        ? "350px"
        : "350px"
      : card.shape === "circle"
      ? "clamp(220px, 65vw, 480px)"
      : card.shape === "square"
      ? "clamp(220px, 75vw, 480px)"
      : "clamp(260px, 60vh, 480px)",

    borderRadius: card.shape === "circle" ? "20%" : "20px",
    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), url(${card.image})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    WebkitTransform: "translate3d(0,0,0)",
    transform: "translate3d(0,0,0)",
  }}
                  >
                    <div className="text-highlight numbering">
                      {card.number}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-highlight gap-5">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base md:text-lg white-text">
                      {card.subtitle}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}