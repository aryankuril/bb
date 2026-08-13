"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const reels = [
  {
    video: "/video/reel(1).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DZuRfSsvEof/?igsh=bWlqMXpucjBmbWsy",
  },
  {
    video: "/video/reel(2).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DYFcA2qv3CV/?igsh=MXA5NWZjcGV5Zmdvdw%3D%3D",
  },
  {
    video: "/video/reel(3).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DYAQRZsMA7z/?igsh=ODh0b3p1dGJ1N282",
  },
  {
    video: "/video/reel(4).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DXKQ-ZPjCi3/?igsh=Z3Z3NDA0a2xwYzFv",
  },
  {
    video: "/video/reel(5).MP4",
    reelUrl:
      "https://www.instagram.com/reel/Db7ys70sYA-/?igsh=enF4bGc2ZTN3bm45",
  },
  {
    video: "/video/reel(6).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DaiVrops7bs/?igsh=MWs2dDRqeXowaGZ1aw%3D%3D",
  },
  {
    video: "/video/reel(7).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DYT6QN_PWEj/?igsh=cmswaWM0a3R5ODh6",
  },
  {
    video: "/video/reel(8).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DZatpOdshm1/?igsh=eXhpdW0wa2I3dGM2",
  },
  {
    video: "/video/reel(9).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DaVRKrlskrn/?igsh=MWp1N2g0bHZ4cWJiMw%3D%3D",
  },
  {
    video: "/video/reel(10).MP4",
    reelUrl:
      "https://www.instagram.com/reel/DY17VFbPGKc/?igsh=azRiZGs4cHNlY3gw",
  },
];

export function CreativeWall() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const slideWidthRef = useRef(276);
  const setWidthRef = useRef(0);

  const isPausedRef = useRef(false);

  const maxIndex = reels.length - 3;

  const measureSlider = () => {
    const track = trackRef.current;

    if (!track) return;

    const firstSlide = track.children[0] as HTMLElement;

    if (!firstSlide) return;

    const slideWidth = firstSlide.getBoundingClientRect().width;

    slideWidthRef.current = slideWidth;

    setWidthRef.current = slideWidth * reels.length;
  };

  const updatePosition = () => {
    const track = trackRef.current;

    if (!track) return;

    track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  };

  const startContinuousSlider = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current) {
        /*
         * Speed of the continuous slider.
         * Lower = slower
         * Higher = faster
         */
        const speed = 0.035;

        offsetRef.current += delta * speed;

        /*
         * When the first set of reels has completely
         * passed, jump back by exactly one full set.
         *
         * Because the reels are duplicated, this
         * reset is completely invisible.
         */
        if (
          setWidthRef.current > 0 &&
          offsetRef.current >= setWidthRef.current
        ) {
          offsetRef.current -= setWidthRef.current;
        }

        updatePosition();

        /*
         * Keep the dots roughly synced with the
         * reel currently passing through the slider.
         */
        if (slideWidthRef.current > 0) {
          const index =
            Math.floor(
              offsetRef.current / slideWidthRef.current
            ) % reels.length;

          setCurrentIndex(Math.min(index, maxIndex));
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const stopContinuousSlider = () => {
    isPausedRef.current = true;
  };

  const resumeContinuousSlider = () => {
    isPausedRef.current = false;
  };

  const nextSlide = () => {
    measureSlider();

    offsetRef.current += slideWidthRef.current;

    if (offsetRef.current >= setWidthRef.current) {
      offsetRef.current -= setWidthRef.current;
    }

    updatePosition();

    setCurrentIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    measureSlider();

    offsetRef.current -= slideWidthRef.current;

    if (offsetRef.current < 0) {
      offsetRef.current += setWidthRef.current;
    }

    updatePosition();

    setCurrentIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  useEffect(() => {
    measureSlider();

    const handleResize = () => {
      measureSlider();
      updatePosition();
    };

    window.addEventListener("resize", handleResize);

    startContinuousSlider();

    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      id="work"
      className="overflow-hidden border-y bg-card py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading */}
        <div className="">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-eyebrow subtitle">The work</p>

              <a className="mt-4 heading block max-w-5xl">
                Scroll the feed, not the pitch deck.
              </a>

              <p className="mt-5 max-w-xl text-muted-foreground subtitle">
                A slice of the content we plan, shoot and publish every week
                for brands across beauty, fashion, food, home and fitness.
              </p>
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous reel"
                onClick={previousSlide}
                className="grid h-11 w-11 place-items-center rounded-full border bg-background transition-all duration-300 hover:bg-secondary active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Next reel"
                onClick={nextSlide}
                className="grid h-11 w-11 place-items-center rounded-full border bg-background transition-all duration-300 hover:bg-secondary active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Reel Slider */}
        <div
          ref={sliderRef}
          className="relative mt-10 overflow-hidden"
          onMouseEnter={stopContinuousSlider}
          onMouseLeave={resumeContinuousSlider}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform"
          >
            {[...reels, ...reels].map((reel, index) => (
              <div
                key={`${index}-${reel.reelUrl}`}
                className="
                  w-[72%]
                  shrink-0
                  px-1
                  sm:w-[48%]
                  sm:px-1
                  lg:w-[276px]
                  lg:px-2
                "
              >
                
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-black shadow-sm">
                    <video
                      src={reel.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-7 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map(
            (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => {
                  measureSlider();

                  offsetRef.current =
                    index * slideWidthRef.current;

                  updatePosition();

                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === index
                    ? "w-7 bg-foreground"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}