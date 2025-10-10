"use client";
import React, { useState } from "react";

type Step = {
  number: string;
  title: string;
  image: string;
  category: string;
};

const allSteps: Step[] = [
  // 🟦 WEB DEVELOPMENT (5)
  {
    number: "01",
    title: "Discovery & Planning",
    image: "/images/section2-img1.png",
    category: "Web Development",
  },
  {
    number: "02",
    title: "UI/UX Design",
    image: "/images/section2-img2.png",
    category: "Web Development",
  },
  {
    number: "03",
    title: "Frontend Development",
    image: "/images/section2-img3.png",
    category: "Web Development",
  },
  {
    number: "04",
    title: "Backend Integration",
    image: "/images/section2-img4.png",
    category: "Web Development",
  },
  {
    number: "05",
    title: "Testing & Deployment",
    image: "/images/section2-img5.png",
    category: "Web Development",
  },

  // 🟩 PERFORMANCE MARKETING (4)
  {
    number: "01",
    title: "Campaign Strategy",
    image: "/images/section2-img6.png",
    category: "Performance Marketing",
  },
  {
    number: "02",
    title: "Ad Creative Development",
    image: "/images/section2-img2.png",
    category: "Performance Marketing",
  },
  {
    number: "03",
    title: "Optimization & Scaling",
    image: "/images/section2-img3.png",
    category: "Performance Marketing",
  },
  {
    number: "04",
    title: "Performance Reporting",
    image: "/images/section2-img4.png",
    category: "Performance Marketing",
  },

  // 🟥 SOCIAL MEDIA (2)
  {
    number: "01",
    title: "Content Strategy & Planning",
    image: "/images/section2-img1.png",
    category: "Social Media",
  },
  {
    number: "02",
    title: "Community Engagement",
    image: "/images/section2-img5.png",
    category: "Social Media",
  },

  // SEO
   {
    number: "01",
    title: "Content Strategy & Planning",
    image: "/images/section2-img1.png",
    category: "SEO",
  },
  {
    number: "02",
    title: "Community Engagement",
    image: "/images/section2-img5.png",
    category: "SEO",
  },
];

const categories = ["All", "Web Development", "Performance Marketing", "Social Media" ,"SEO"];

const SecondSection = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");

  let processSteps: Step[] =
    activeCategory === "All"
      ? allSteps
      : allSteps.filter((step) => step.category === activeCategory);

  // Ensure minimum 6 cards (for layout balance)
  if (processSteps.length < 6) {
    const repeat = [...processSteps];
    while (processSteps.length < 6) {
      processSteps = [...processSteps, ...repeat].slice(0, 6);
    }
  }

  return (
    <section id="second-section" className="container py-10 sm:py-15 lg:py-20">
      {/* Title */}
      <h2 className="black-text mr-4 lg:mb-5 mb-4">Services</h2>

      {/* Category Buttons */}
      <div className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto no-scrollbar mb-5 lg:mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer shrink-0 px-4 py-1 rounded-full border body3 transition-all duration-300
              ${
                activeCategory === cat
                  ? "bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-primary)]"
                  : "bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Layout */}
      <div className="space-y-6">
        {[
          [0, 1, [3, 2]],
          [2, 3, [2, 3]],
          [4, 5, [3, 2]],
        ].map(([i1, i2, span], idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div
              className={`col-span-1 md:col-span-${(span as number[])[0]} relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden`}
            >
              <img
                src={processSteps[i1 as number].image}
                alt={processSteps[i1 as number].title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <CardText
                number={processSteps[i1 as number].number}
                title={processSteps[i1 as number].title}
              />
            </div>
            <div
              className={`col-span-1 md:col-span-${(span as number[])[1]} relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden`}
            >
              <img
                src={processSteps[i2 as number].image}
                alt={processSteps[i2 as number].title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <CardText
                number={processSteps[i2 as number].number}
                title={processSteps[i2 as number].title}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ✅ Text Overlay Component
const CardText: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
    <span className="text-highlight numbering">{number}</span>
    <h3 className="white-text leading-tight">{title}</h3>
  </div>
);

export default SecondSection;
