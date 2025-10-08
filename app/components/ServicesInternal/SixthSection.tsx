"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: `“Had an amazing journey working with Bombay Blokes, never felt like I was working with an outside agency!”`,
    name: "~ Kaushik Shah",
  },
  {
    text: `“The team delivered outstanding results on time and exceeded our expectations!”`,
    name: "~ Anita Patel",
  },
  {
    text: `“Highly recommend their services, professional and friendly throughout.”`,
    name: "~ Ravi Kumar",
  },
  {
    text: `“A fantastic partner for all our creative needs. The quality of work is unparalleled.”`,
    name: "~ Retail Brand",
  },
];

const SixthSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 5000; // 5 seconds

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }, delay);

    return () => resetTimeout();
  }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Handle transition end (jump from clone back to real first)
  const handleTransitionEnd = () => {
    if (currentIndex === testimonials.length) {
      // we reached the clone
      setIsTransitioning(false); // disable transition for instant jump
      setCurrentIndex(0); // jump back to real first
    }
  };

  return (
    <div className="max-w-[960px] mx-auto py-10 sm:py-15 lg:py-20 font-poppins relative overflow-hidden">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {testimonials.map(({ text, name }, index) => (
          <div key={index} className="flex-shrink-0 w-full flex justify-center">
            <div className="w-[95%] px-4 py-6 sm:py-8 lg:py-10 relative flex flex-col items-center text-center">
              <div className="body1 mb-6 sm:mb-8 lg:mb-10 text-black">
                {text}
              </div>
              <p className="body3 black-text">{name}</p>
            </div>
          </div>
        ))}

        {/* Clone of the first slide */}
        <div className="flex-shrink-0 w-full flex justify-center">
          <div className="w-[95%] px-4 py-6 sm:py-8 lg:py-12 relative flex flex-col items-center text-center">
            <div className="body1 mb-6 sm:mb-8 lg:mb-10 text-black">
              {testimonials[0].text}
            </div>
            <p className="body3 black-text">{testimonials[0].name}</p>
          </div>
        </div>
      </div>

      {/* Dots navigation (optional) */}
      <div className="flex justify-center gap-3">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === (currentIndex % testimonials.length)
                ? "bg-yellow-400"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(idx);
            }}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SixthSection;
