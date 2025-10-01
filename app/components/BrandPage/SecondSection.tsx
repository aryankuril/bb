"use client";
import React, { useState } from "react";

type Step = {
  number: string;
  title: string;
  image: string;
  category: string;
};

const allSteps: Step[] = [
  { number: "01", title: "Discovery & Research", image: "/images/section2-img1.png", category: "Branding" },
  { number: "02", title: "Strategy",             image: "/images/section2-img2.png", category: "Branding" },
  { number: "03", title: "Identity Creation",    image: "/images/section2-img3.png", category: "Creative" },
  { number: "04", title: "Experience Design",    image: "/images/section2-img4.png", category: "Creative" },
  { number: "05", title: "Activation",           image: "/images/section2-img5.png", category: "Strategy" },
  { number: "06", title: "Growth & Optimization",image: "/images/section2-img6.png", category: "Product" },
  { number: "07", title: "Brand Expansion",      image: "/images/section2-img1.png", category: "Branding" },
  { number: "08", title: "Creative Direction",   image: "/images/section2-img2.png", category: "Creative" },
  { number: "09", title: "Market Planning",      image: "/images/section2-img3.png", category: "Strategy" },
  { number: "10", title: "Product Launch",       image: "/images/section2-img4.png", category: "Product" },
];

const categories = ["All", "Branding", "Creative", "Strategy", "Product"];

const SecondSection = () => {
  const [activeCategory, setActiveCategory] = useState("Branding");

  let processSteps: Step[] =
    activeCategory === "All"
      ? allSteps
      : allSteps.filter((step) => step.category === activeCategory);

  // Ensure minimum 6 cards
  if (processSteps.length < 6) {
    const repeat = [...processSteps];
    while (processSteps.length < 6) {
      processSteps = [...processSteps, ...repeat].slice(0, 6);
    }
  }

  return (
    <section className="container py-12 sm:py-16 md:py-24">
      {/* Title */}
      <h1 className="text-black font-[Miso] font-bold leading-[1.2]
        text-[30px] sm:text-[30px] md:text-[40px] lg:text-[60px] xl:text-[80px] mr-4">
        Category
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto no-scrollbar mb-5 lg:mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer shrink-0 px-4 py-1 rounded-full border text-sm sm:text-base font-[Poppins] capitalize transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Layout */}
      <div className="space-y-6">
        {[
          [0, 1, [3, 2]], // row spans for easier reading
          [2, 3, [2, 3]],
          [4, 5, [3, 2]],
        ].map(([i1, i2, span], idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className={`col-span-1 md:col-span-${(span as number[])[0]} relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden`}>
              <img src={processSteps[i1 as number].image} alt={processSteps[i1 as number].title}
                className="absolute inset-0 w-full h-full object-cover z-0" />
              <CardText number={processSteps[i1 as number].number} title={processSteps[i1 as number].title} />
            </div>
            <div className={`col-span-1 md:col-span-${(span as number[])[1]} relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden`}>
              <img src={processSteps[i2 as number].image} alt={processSteps[i2 as number].title}
                className="absolute inset-0 w-full h-full object-cover z-0" />
              <CardText number={processSteps[i2 as number].number} title={processSteps[i2 as number].title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ✅ Typed props
const CardText: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
    <span className="miso-font text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[1] font-normal capitalize">
      {number}
    </span>
    <h3 className="miso-font text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[1.2] font-normal capitalize">
      {title}
    </h3>
  </div>
);

export default SecondSection;
