"use client";
 
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const images = [
  "/images/section1-img1.png",
  "/images/section1-img2.png",
  "/images/section1-img3.png",
  "/images/section1-img4.png",
  "/images/section1-img1.png",
  "/images/section1-img2.png",
];
 
gsap.registerPlugin(ScrollTrigger);
 
export default function BombAISection() {
  const root = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
 
  const INITIAL_TEXT = "Click To Generate Your AI Images";
  const NEW_TEXT = "Future-ready content, crafted with AI at BB.";
  const [labelText, setLabelText] = useState(INITIAL_TEXT);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
 
      tl.from(".bomb-card", { y: 50, opacity: 10, duration: 0.8, ease: "power3.out" })
        .from(".bomb-strip", { x: 50, opacity: 10, duration: 0.5 }, "-=0.4")
        .from(".bomb-cta", { y: 20, opacity: 10, duration: 0.6 }, "-=0.2");
 
      const proxy = { count: INITIAL_TEXT.length };
      tl.to(proxy, {
        count: 0,
        duration: 0.9,
        ease: "none",
        onUpdate: () => {
          const n = Math.floor(proxy.count);
          setLabelText(INITIAL_TEXT.slice(0, n));
          if (labelRef.current) {
            gsap.to(labelRef.current, { opacity: n === 0 ? 0 : 0.6 + 0.4 * (n / INITIAL_TEXT.length), duration: 0.1 });
          }
        },
      });
 
      tl.add(() => {
        setLabelText(NEW_TEXT);
        if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 20 });
      });
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
 
      tl.add(() => {
        if (!cardRef.current) return;
        const target = cardRef.current.scrollHeight;
        gsap.to(cardRef.current, {
          height: target,
          duration: 0.8,
          ease: "power2.out",
        });
      }, "+=0.0");
 
      tl.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      }, "<");
    }, root);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      ref={root}
      className="relative isolate container py-10 sm:py-15 lg:py-20"
      aria-label="Bomb.AI section"
    >
      <div className="mx-auto w-full ">
        <div
          ref={cardRef}
          className="bomb-card relative z-10 rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden"
          style={{ backgroundColor: "#1D1D1D", height: 500 }}
        >
          <div
            className="bomb-strip absolute top-0 right-0 h-full w-3 sm:w-5 md:w-7 z-0 pointer-events-none"
            style={{ backgroundColor: "#FAB31E" }}
          />
 
          <div className="relative z-10 flex flex-col items-center justify-start h-full px-5 py-10 sm:py-14 md:py-16">
            <h1
               className="text-[#FAB31E] font-[miso]  capitalize text-[30px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[50px] md:leading-[56px] lg:text-[60px] lg:leading-[64px] xl:text-[60px] xl:leading-[80px]"
            >
              Bomb.AI
            </h1>
 
            <button
              type="button"
              className="bomb-cta mt-8 w-full max-w-[900px] rounded-full border text-left outline-none transition focus-visible:ring-4 active:scale-[0.99]"
              style={{
                borderColor: "#FAB31E",
                color: "#FDFDFD",
                background: "transparent",
              }}
              aria-label="Click to generate your AI images"
            >
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full border"
                  style={{ borderColor: "#FAB31E" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAB31E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10a7 7 0 0 1-14 0" />
                    <path d="M12 17v6" />
                  </svg>
                </span>
 
                <span
                  ref={labelRef}
                  className="flex-1 text-sm sm:text-base font-['Poppins']"
                  style={{ color: "#FAB31E" }}
                >
                  {labelText}
                </span>
 
                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border"
                    style={{ borderColor: "#FAB31E" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAB31E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
 
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border"
                    style={{ borderColor: "#FAB31E" }}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 31" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M5.97955 11.2258V19.7744C5.97955 20.5319 4.5918 20.5319 4.5918 19.7744V11.2258C4.5918 10.4684 5.97955 10.4684 5.97955 11.2258Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M8.75519 8.85276V22.1476C8.75519 22.905 7.36743 22.905 7.36743 22.1476V8.85276C7.36743 8.0953 8.75519 8.0953 8.75519 8.85276Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M11.5306 13.5251V17.4758C11.5306 18.2333 10.1428 18.2333 10.1428 17.4758V13.5251C10.1428 12.7677 11.5306 12.7677 11.5306 13.5251Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M14.3062 11.0744V19.9257C14.3062 20.6832 12.9185 20.6832 12.9185 19.9257V11.0744C12.9185 10.317 14.3062 10.317 14.3062 11.0744Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M17.0816 6.35618V24.6444C17.0816 25.4018 15.6938 25.4018 15.6938 24.6444V6.35618C15.6938 5.59872 17.0816 5.59872 17.0816 6.35618Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M19.857 8.85421V22.1464C19.857 22.9038 18.4692 22.9039 18.4692 22.1464V8.85423C18.4692 8.09678 19.857 8.09676 19.857 8.85421Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M22.6326 12.9885V18.0122C22.6326 18.7697 21.2449 18.7697 21.2449 18.0122V12.9885C21.2449 12.231 22.6326 12.231 22.6326 12.9885Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M25.4083 11.2263V19.7739C25.4083 20.5314 24.0205 20.5314 24.0205 19.7739V11.2263C24.0205 10.4688 25.4083 10.4688 25.4083 11.2263Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M28.1837 12.987V18.0135C28.1837 18.7709 26.7959 18.7709 26.7959 18.0135V12.987C26.7959 12.2296 28.1837 12.2296 28.1837 12.987Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M3.20416 12.987V18.0135C3.20416 18.7709 1.81641 18.7709 1.81641 18.0135V12.987C1.81641 12.2296 3.20416 12.2296 3.20416 12.987Z" fill="#FAB31E"/>
</svg>
                  </span>
                </div>
              </div>
            </button>
 
            <div
      ref={gridRef}
      className="mt-16 grid gap-4 w-full max-w-4xl grid-cols-2 sm:grid-cols-3"
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-gray-700/40"
        >
          <img
            src={src}
            alt={`Image ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
          </div>
        </div>
      </div>
    </section>
  );
}