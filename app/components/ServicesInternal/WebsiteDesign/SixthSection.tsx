"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

const testimonials = [
  {
    brand: "J K Diamonds Institute",
    text: "The brand started seeing more orders every single day.",
    name: "~ Naman Ajmera",
    maintext: "“Better Understanding”",
  },
  {
    brand: "Selection Centre Sports (SCS Sports)",
    text: "Month-end stress disappeared because targets were hit early. Performance stayed consistent, and results improved.",
    name: "~ Keval Shah",
    maintext: "“Better Results”",
  },
  {
    brand: "DNM Sports",
    text: "Customers found the brand through our content and felt connected.",
    name: "~ Shaurya Modi",
    maintext: "“Clearer Brand Communication”",
  },
  {
    brand: "Dancing Leaf Tea",
    text: "Engagement increased and enquiries dropped less midway. The brand feels inviting.",
    name: "~ AW",
    maintext: "“Improved Enquiry Flow”",
  },
  {
    brand: "Manba Finance",
    text: "Fresh ideas brought new attention and interactions increased across platforms.",
    name: "~ Manish Shah",
    maintext: "“Creative Idea Execution”",
  },
  {
    brand: "CarronCothing",
    text: "Orders started increasing every day, showing clear growth.",
    name: "~ Rohit Chhedda",
    maintext: "“Growth in Orders'",
  },
  {
    brand: "Supersox",
    text: "Month-end stress disappeared, performance stayed consistent, and results improved.",
    name: "~ Harsh Saraf",
    maintext: "“Better Results”",
  },
  {
    brand: "FirstEdge",
    text: "Customers found the brand through our content and felt connected.",
    name: "~ Pranav Bimbhat",
    maintext: "“Clearer Brand Communication”",
  },
  {
    brand: "Aditya Agarwal",
    text: "Engagement increased and enquiries dropped less midway. The brand feels inviting.",
    name: "~ AW",
    maintext: "“Improved Enquiry Flow”",
  },
];

const SixthSection: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
      origin: "center",
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16, origin: "center" },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 12, origin: "center" },
      },
    },
    slideChanged(slider) {
      // Calculate current group (0,1,2) for 3 dots
      const perGroup = Math.ceil(testimonials.length / 3);
      const currentIdx = slider.track.details.rel;
      setCurrentGroup(Math.floor(currentIdx / perGroup));
    },
    animationEnded(slider) {
      // Apply blur only after animation completes
      const currentIdx = slider.track.details.rel;
      const slides = slider.slides;

      slides.forEach((slide, idx) => {
        const relIdx = slider.track.absToRel(idx);
        if (relIdx === currentIdx) {
          slide.classList.remove("blur-sm", "opacity-60");
        } else {
          slide.classList.add("blur-sm", "opacity-60");
        }
      });
    },
    created(slider) {
      // Set initial blur state on mount with a small delay
      setTimeout(() => {
        const currentIdx = slider.track.details.rel;
        const slides = slider.slides;

        slides.forEach((slide, idx) => {
          const relIdx = slider.track.absToRel(idx);
          if (relIdx === currentIdx) {
            slide.classList.remove("blur-sm", "opacity-60");
          } else {
            slide.classList.add("blur-sm", "opacity-60");
          }
        });
      }, 50);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="container py-10 sm:py-15 lg:py-20 relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="black-text lg:w-[950px] mx-auto">
          Trusted By <span className="text-highlight">200+ </span> Companies  
        </h2>
      </div>

      <div ref={sliderRef} className="keen-slider ">
        {testimonials.map((item, index) => {
          return (
            <div
              key={index}
              className="keen-slider__slide overflow-hidden relative transition-all duration-300 blur-sm opacity-60"
            >
              <div className="flex flex-col justify-between h-full  w-90% bg-black shadow-lg rounded-[20px] p-6 relative overflow-hidden">
                <div className="absolute -right-1 top-0 w-4 sm:w-4 md:w-5 h-full bg-[#FAB31E]"></div>
                <h3 className="white-text font-bold text-lg text-left z-10 relative">
                  {item.maintext}
                </h3>
                <p className="white-text mt-2 text-sm leading-relaxed z-10 relative">
                  {item.text}
                </p>
                <div className="flex flex-col text-left z-10 relative mt-2">
                  <p className="font-medium white-text">{item.name}</p>
                  <p className="text-sm white-text">{item.brand}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3-dot Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentGroup === dot ? "bg-yellow-400" : "bg-gray-400"
            }`}
            onClick={() => {
              // Move to the first slide of the group
              const perGroup = Math.ceil(testimonials.length / 3);
              instanceRef.current?.moveToIdx(dot * perGroup);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SixthSection;
