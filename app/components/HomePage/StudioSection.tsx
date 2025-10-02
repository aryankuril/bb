"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LightCameraAction() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const panelTRRef = useRef<HTMLDivElement | null>(null); // top-right diagonal panel
  const panelBLRef = useRef<HTMLDivElement | null>(null); // bottom-left diagonal panel
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headline = headlineRef.current as HTMLElement;
      const words = Array.from(headline.querySelectorAll<HTMLElement>("[data-word]"));

      // Initial styles
      gsap.set(words, { color: "var(--color-primary)" });
      // frame/iris subtle hidden start
      gsap.set(frameRef.current, { opacity: 0, scale: 0.94 });

      // diagonal shutter panels: place them well off-center (percent-based) and rotated.
      if (panelTRRef.current) {
        gsap.set(panelTRRef.current, {
          xPercent: 70,
          yPercent: -70,
          rotation: 29,
          transformOrigin: "66% 17%",
        });
      }
      if (panelBLRef.current) {
        gsap.set(panelBLRef.current, {
          xPercent: -70,
          yPercent: 70,
          rotation: 29,
          transformOrigin: "20% -52%",
        });
      }

  // video (inside the pinned frame) starts hidden and very small so it can expand from the center
  gsap.set(videoRef.current, { opacity: 0, scale: 0.16, transformOrigin: "50% 50%" });

      // Master timeline (pinned)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=200%", // total scroll distance controlling the full sequence
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1) Highlight words one-by-one (driven by scroll, one after another)
      if (words.length) {
        // stagger the highlights in sequence — each occupies a portion of the scrubbed timeline
        tl.to(words[0], { color: "var(--color-highlight)", duration: 0.3 });
        if (words[1]) tl.to(words[1], { color: "var(--color-highlight)", duration: 0.3 });
        if (words[2]) tl.to(words[2], { color: "var(--color-highlight)", duration: 0.3 });
      }

      // 2) Bring in the frame, perform close → open iris animation
      // frame fades/zooms in (iris feel)
      tl.to(frameRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "+=0.12");

      // Diagonal shutter sweep: two oversized rotated panels move into center along a diagonal,
      // pause closed, then retract along the same diagonal.
  if (panelTRRef.current && panelBLRef.current) {
        // panels sweep in together
        tl.to(
          panelTRRef.current,
          { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power2.inOut" },
          "shutter"
        ).to(panelBLRef.current, { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power2.inOut" }, "shutter");

        // retract back along same diagonal — let the panels open a bit first, then slowly expand the video
        // label the retract for precise timing
        tl.to(panelTRRef.current, { xPercent: 70, yPercent: -70, duration: 0.9, ease: "power2.inOut" }, "retract")
          .to(panelBLRef.current, { xPercent: -70, yPercent: 70, duration: 0.9, ease: "power2.inOut" }, "retract");

  // start the video a bit later so the shutter panels open first, then slowly expand the video
  // longer duration + smooth easing for a gentle, cinematic zoom-out
  tl.to(videoRef.current, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, "retract+=0.7");
      }

  // 3) Hand-off: fade the frame away after the video has mostly expanded
  tl.to(frameRef.current, { opacity: 0, scale: 1.02, duration: 0.6, ease: "power2.out" }, "retract+=1.4");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full text-[var(--color-primary)]  container py-10 sm:py-15 lg:py-20">
      {/* Pinned sequence wrapper */}
      <section ref={rootRef} className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Centered container for headline + frame */}
          {/* 1) Headline */}
          <h1
            ref={headlineRef}
            className="select-none relative -z-10 lg:text-[80px] text-[20px] font-[miso]"
          >
            <span data-word className="inline-block">Light.</span>{" "}
            <span data-word className="inline-block">Camera.</span>{" "}
            <span data-word className="inline-block">Action</span>
          </h1>

          {/* Video container (outside frame) — so it doesn't get hidden when the frame fades) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <div ref={videoRef} className="relative w-100% lg:h-full h-50%  aspect-video overflow-hidden rounded-2xl">
              {/* Mux player embed (fills the frame) */}
              <iframe
                src="https://player.mux.com/ouJnmHfQxmoz1rHC3HtKLxy01GS5c9VcL9iuzeh00dLkw?metadata-video-title=video&video-title=video"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                title="Studio video"
              />
              <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E] pointer-events-none"></div>
            </div>
          </div>

          {/* 2) Shutter/Frame overlay */}
          <div
            ref={frameRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
            aria-hidden
          >
            {/* Outer rectangle frame */}
            <div className="relative w-full lg:h-full h-50%   aspect-video overflow-hidden border border-[var(--color-highlight)]/40 rounded-2xl">
              {/* ring/frame accent (fades with frame) */}
              <div className="absolute inset-0 ring-2 ring-[var(--color-highlight)]/80 rounded-2xl pointer-events-none" />

              {/* Diagonal shutter panels (oversized and rotated) */}
              <div
                ref={panelTRRef}
                className="absolute w-[130%] h-[100%] bg-[var(--color-highlight)]/95 rounded-2xl pointer-events-none top-[-20%] z-30"
              />
              <div
                ref={panelBLRef}
                className="absolute w-[130%] h-[100%] bg-[var(--color-highlight)]/95 rounded-2xl pointer-events-none  bottom-[-20%] z-30"
              />
              
            </div>
          </div>
    
      </section>

      {/* video is embedded inside the pinned frame; no separate section needed */}
    </div>
  );
}
