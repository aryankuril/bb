"use client";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: `“A partner who understands business goals, deadlines, and the pulse of the audience.”`,
    name: "~ Naman Ajmera",
    brand: "J K Diamonds Institute",
  },
  {
    text: `“Ideas are fresh, relevant, and perfectly aligned with our audience.”`,
    name: "~ Keval Shah",
    brand: "Selection Centre Sports (SCS)",
  },
  {
    text: `“From strategy to execution, their team understood our brand inside out.”`,
    name: "~ Shaurya Modi",
    brand: "DNM Sports",
  },
  {
    text: `“Data-driven campaigns that actually work. We finally see measurable results.”`,
    name: "~ Ankit Garg",
    brand: "Dancing Leaf Tea",
  },
  {
    text: `“Our digital presence is stronger than ever. Every campaign brings tangible results.”`,
    name: "~ Mickey Mehta",
    brand: "Antar", 
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
      // reached the clone — jump back without flash
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(0);
        // re-enable transition *after* the instant jump
        setTimeout(() => setIsTransitioning(true), 50);
      }, 20);
    }
  };

  return (
    <div className="max-w-[960px] mx-auto py-10 sm:py-15 lg:py-20 font-poppins relative overflow-hidden">
      <div
        className={`flex ${
          isTransitioning
            ? "transition-transform duration-700 ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {testimonials.map(({ text, name, brand }, index) => (
          <div key={index} className="flex-shrink-0 w-full flex justify-center">
            <div className="w-[95%] px-4 py-6 sm:py-8 lg:py-10 relative flex flex-col items-center text-center">
              <div className="body1 mb-6 sm:mb-8 lg:mb-10 text-black">
                {text}
              </div>
              <p className="body2 black-text">{brand}</p>
              <p className="body3 black-text font-semibold">{name}</p>
            </div>
          </div>
        ))}

        {/* Clone of the first slide */}
        <div className="flex-shrink-0 w-full flex justify-center">
          <div className="w-[95%] px-4 py-6 sm:py-8 lg:py-12 relative flex flex-col items-center text-center">
            <div className="body1 mb-6 sm:mb-8 lg:mb-10 text-black">
              {testimonials[0].text}
            </div>
            <p className="body3 black-text font-semibold">
              {testimonials[0].name}
            <p className="body3 text-gray-500 mt-1">{testimonials[0].brand}</p>
            </p>
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-3 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex % testimonials.length
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
