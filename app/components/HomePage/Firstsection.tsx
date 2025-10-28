"use client";
import React, { useRef, useState, useEffect } from "react";

const Firstsection = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video1mRef = useRef<HTMLVideoElement>(null);
  const video2mRef = useRef<HTMLVideoElement>(null);

  const [showSecond, setShowSecond] = useState(false);
  const [showSecondMobile, setShowSecondMobile] = useState(false);

  // Desktop: when first video ends, show second
  useEffect(() => {
    const v1 = video1Ref.current;
    if (v1) {
      v1.addEventListener("ended", () => {
        setShowSecond(true);
        video2Ref.current?.play();
      });
    }
    return () => {
      v1?.removeEventListener("ended", () => {});
    };
  }, []);

  // Mobile: when first video ends, show second
  useEffect(() => {
    const v1m = video1mRef.current;
    if (v1m) {
      v1m.addEventListener("ended", () => {
        setShowSecondMobile(true);
        video2mRef.current?.play();
      });
    }
    return () => {
      v1m?.removeEventListener("ended", () => {});
    };
  }, []);

  return (
    <section className="lg:mt-0 -mt-20 relative isolate w-full overflow-hidden">
      {/* Wrapper */}
      <div className="relative w-full h-full aspect-[9/16] md:h-[850px]">
        {/* ========== DESKTOP ========== */}
        {!showSecond && (
          <video
            ref={video1Ref}
            src="/video/home1-Trim.mp4"
            autoPlay
            muted
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-fit"
          />
        )}
        {showSecond && (
          <video
            ref={video2Ref}
            src="/video/home2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* ========== MOBILE ========== */}
        {!showSecondMobile && (
          <video
            ref={video1mRef}
            src="/video/home1-m.mp4"
            autoPlay
            muted
            playsInline
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
          />
        )}
        {showSecondMobile && (
          <video
            ref={video2mRef}
            src="/video/home2-m.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
};

export default Firstsection;
