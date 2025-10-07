"use client";
 
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MuxPlayer from "@mux/mux-player-react";
 
export default function LightCameraAction() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const panelTRRef = useRef<HTMLDivElement | null>(null);
  const panelBLRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const muxRef = useRef<any | null>(null);
 
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
 
    // Optional: temporarily filter noisy mux/hls error logs coming from
    // getErrorFromHlsErrorData() which is emitted by the mux/hls internals.
    // We scope this wrapper to this component and restore the original
    // console.error on cleanup.
    const _origConsoleError = console.error;
    console.error = (...args: any[]) => {
      try {
        const first = args[0];
        if (typeof first === "string" && first.includes("getErrorFromHlsErrorData()")) {
          // swallow this specific noisy message — keep other error logs
          return;
        }
      } catch (e) {
        // Fall back to original if anything goes wrong
        return _origConsoleError(...args);
      }
      _origConsoleError(...args);
    };
 
  let mm: ReturnType<typeof gsap.matchMedia> | null = null;
 
    const ctx = gsap.context(() => {
      const headline = headlineRef.current as HTMLElement;
      const words = Array.from(
        headline.querySelectorAll<HTMLElement>("[data-word]")
      );
 
      // Initial styles
      gsap.set(words, { color: "#1D1D1D" });
      gsap.set(frameRef.current, { opacity: 0, scale: 0.94 });
 
      // ✅ Responsive shutter panel config
      mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (mctx: gsap.Context) => {
          const isMobile = !!mctx.conditions?.isMobile;
 
          if (panelTRRef.current) {
            gsap.set(panelTRRef.current, {
              xPercent: 70,
              yPercent: -70,
              rotation: isMobile ? 62 : 29,
              transformOrigin: isMobile ? "57% 59%" : "66% 17%",
            });
          }
          if (panelBLRef.current) {
            gsap.set(panelBLRef.current, {
              xPercent: -70,
              yPercent: 70,
              rotation: isMobile ? 62 : 29,
              transformOrigin: isMobile ? "17% -11%" : "20% -52%",
            });
          }
        }
      );
 
      gsap.set(videoRef.current, {
        opacity: 0,
        scale: 0.16,
        transformOrigin: "50% 50%",
      });
 
      // ...existing code...
 
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
 
      if (words.length) {
        tl.to(words[0], { color: "#FAB31E", duration: 0.3 });
        if (words[1])
          tl.to(words[1], { color: "#FAB31E", duration: 0.3 });
        if (words[2])
          tl.to(words[2], { color: "#FAB31E", duration: 0.3 });
      }
 
      tl.to(
        frameRef.current,
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "+=0.12"
      );
 
      if (panelTRRef.current && panelBLRef.current) {
        tl.to(
          panelTRRef.current,
          { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power2.inOut" },
          "shutter"
        ).to(
          panelBLRef.current,
          { xPercent: 0, yPercent: 0, duration: 0.9, ease: "power2.inOut" },
          "shutter"
        );
 
        tl.to(
          panelTRRef.current,
          { xPercent: 70, yPercent: -70, duration: 0.9, ease: "power2.inOut" },
          "retract"
        ).to(
          panelBLRef.current,
          { xPercent: -70, yPercent: 70, duration: 0.9, ease: "power2.inOut" },
          "retract"
        );
 
        tl.to(
          videoRef.current,
          { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" },
          "retract+=0.7"
        );
      }
 
      tl.to(
        frameRef.current,
        { opacity: 0, scale: 1.02, duration: 0.6, ease: "power2.out" },
        "retract+=1.4"
      );
    }, rootRef);
 
    return () => {
      ctx.revert();
      mm?.revert();
    };
  }, []);
 
  return (
    <div className="w-full black-text  container py-10 sm:py-15 lg:py-20">
      <section
        ref={rootRef}
        className="relative w-full min-h-[100svh] flex items-center justify-center "
      >
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="select-none relative -z-10 text-center flex flex-col md:flex-row gap-2"
        >
          <span data-word className="inline-block">Light.</span>{" "}
          <span data-word className="inline-block">Camera.</span>{" "}
          <span data-word className="inline-block">Action</span>
        </h2>
        
 
        {/* Video container with Mux Player */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
          <div
            ref={videoRef}
            className="
              relative 
              w-[86vw] max-w-[520px] aspect-[9/16]
              md:w/full md:max-w-full md:aspect-video
              overflow-hidden rounded-2xl
            "
          >
            <MuxPlayer
              playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
              metadata={{
                video_id: "video-id-54321",
                video_title: "Test video title",
                viewer_user_id: "user-id-007",
              }}
              autoPlay
              loop
              muted
              playsInline
              streamType="on-demand"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
                objectFit: "cover",
              }}
              ref={(el) => {
                // store mux player element for later inspection or custom handling
                muxRef.current = el;
                // attach a basic error handler if the player exposes one
                try {
                  if (el && typeof el.addEventListener === 'function') {
                    el.addEventListener('error', (ev: Event) => {
                      // ev may be a CustomEvent from mux/hls; log for debugging
                      // You can replace this with a user-facing UI or telemetry call
                      // eslint-disable-next-line no-console
                      console.error('MuxPlayer error event:', ev);
                    });
                  }
                } catch (e) {
                  // ignore attach failures in older environments
                }
              }}
            />
 
            {/* yellow accent line */}
            <div className="absolute -right-1 top-0 w-3 sm:w-5 md:w-7 h-full bg-[#FAB31E] rounded-tr-2xl rounded-br-2xl"></div>
          </div>
        </div>
 
        {/* Frame + diagonal shutter panels */}
        <div
          ref={frameRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
          aria-hidden
        >
          <div
            className="
              relative 
              w-[90vw] max-w-[560px] aspect-[9/16]
              md:w/full md:max-w-full md:aspect-video
              overflow-hidden rounded-2xl
 
            "
          >
            <div
              ref={panelTRRef}
              className="absolute w-[210%] md:w-[140%] h-[100%] bg-[#FAB31E]/95 rounded-2xl pointer-events-none top-[-20%] z-30"
            />
            <div
              ref={panelBLRef}
              className="absolute w-[210%] md:w-[140%] h-[100%] bg-[#FAB31E]/95 rounded-2xl pointer-events-none bottom-[-20%] z-30"
            />
          </div>
        </div>
      </section>
    </div>
  );
}