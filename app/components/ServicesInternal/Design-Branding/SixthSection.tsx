"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

const testimonials = [
  {
    text: `A partner who understands business goals, deadlines, and the pulse of the audience.`,
    name: "~ Naman Ajmera",
    brand: "J K Diamonds Institute",
    maintext: "“Better Understanding”",
  },
  {
    text: `Ideas are fresh, relevant, and perfectly aligned with our audience.`,
    name: "~ Keval Shah",
    brand: "Selection Centre Sports (SCS Sports)",
    maintext: "“Good Ideas”",
  },
  {
    text: `From strategy to execution, their team understood our brand inside out.`,
    name: "~ Shaurya Modi",
    brand: "DNM Sports",
    maintext: "“Best Strategy”",
  },
  {
    text: `Data-driven campaigns that actually work. We finally see measurable results.`,
    name: "~ Ankit Garg",
    brand: "Dancing Leaf Tea",
    maintext: "“Measurable Results”",
  },
  {
    text: `Our digital presence is stronger than ever. Every campaign brings tangible results.`,
    name: "~ Mickey Mehta",
    brand: "Antar",
    maintext: "“Tangible Results”",
  },
    {
    brand: "CarronCothing",
    text: "Orders started increasing every day, showing clear growth.",
    name: "~ Rohit Chhedda",
    maintext: "Growth in Orders",
  },
  {
    brand: "Supersox",
    text: "Month-end stress disappeared, performance stayed consistent, and results improved.",
    name: "~ Harsh Saraf",
    maintext: "Better Results",
  },
  {
    brand: "FirstEdge",
    text: "Customers found the brand through our content and felt connected.",
    name: "~ Pranav Bimbhat",
    maintext: "Clearer Brand Communication",
  },
  {
    brand: "Aditya Agarwal",
    text: "Engagement increased and enquiries dropped less midway. The brand feels inviting.",
    name: "~ AW",
    maintext: "Improved Enquiry Flow",
  },
  {
    brand: "Manba Finance",
    text: "Fresh ideas brought new attention and interactions increased across platforms.",
    name: "~ Manish Shah",
    maintext: "Creative Idea Execution",
  },
];

const SixthSection: React.FC = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="container py-10 sm:py-15 lg:py-20">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="black-text lg:w-[950px] flex-[1_0_0] mx-auto">
          Trusted By 200+ <span className="text-highlight"> <br /> Companies</span>
        </h2>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide overflow-hidden relative"
          >
            <div className="flex flex-col justify-between h-full bg-black shadow-lg rounded-[20px] p-6 relative overflow-hidden">
              {/* Right Side Vertical Bar */}
              <div className="absolute -right-1 top-0 w-4 sm:w-4 md:w-5 h-full bg-[#FAB31E]"></div>

              {/* Main Text */}
              <h3 className="white-text font-bold text-lg text-left z-10 relative">{item.maintext}</h3>

              {/* Description */}
              <p className="white-text mt-2 text-sm leading-relaxed z-10 relative">{item.text}</p>

            {/* Founder Name and Brand together */}
<div className="flex flex-col text-left z-10 relative">
  <p className="font-medium white-text">{item.name}</p>
  <p className="text-sm white-text">{item.brand}</p>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixthSection;
