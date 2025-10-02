"use client"
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 5000;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => resetTimeout();
  }, [currentIndex]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }
  return (
  <div className=" max-w-[960px] mx-auto mt-15 font-poppins relative ">
      {/* Carousel viewport */}
      <div className="overflow-hidden w-full">
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{
      transform: `translateX(-${currentIndex * 100}%)`,
    }}
  >
    {testimonials.map(({ text, name }, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-full flex justify-center"
      >
        <div className="w-[95%] px-4 py-6 sm:py-8 lg:py-12 relative flex flex-col items-center text-center">
          {/* Testimonial text */}
          <div className="text-[#1D1D1D] font-['Poppins'] 
                          text-[18px] sm:text-[22px] md:text-[28px] lg:text-[36px] 
                          font-normal leading-relaxed tracking-[-0.5px] sm:tracking-[-0.8px] lg:tracking-[-1.08px] 
                          capitalize mb-6 sm:mb-8 lg:mb-10">
            {text}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 justify-center">
            <div className="text-center">
              <p className="text-[#1D1D1D] text-center font-[Poppins] 
                             text-[14px] sm:text-[16px] md:text-[18px] 
                             font-normal leading-normal tracking-[-0.54px] capitalize">
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Navigation arrows */}
      {/* <button
        onClick={goToPrev}
        aria-label="Previous testimonial"
        className="absolute top-1/2 -translate-y-1/2 left-0 -ml-5 bg-yellow-400 hover:bg-yellow-300 transition-colors rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        ←
      </button>
      <button
        onClick={goToNext}
        aria-label="Next testimonial"
        className="absolute top-1/2 -translate-y-1/2 right-0 -mr-5 bg-yellow-400 hover:bg-yellow-300 transition-colors rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        →
      </button> */}

      {/* Dots navigation */}
      {/* <div className="flex justify-center gap-3 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentIndex ? "bg-yellow-400" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default SixthSection