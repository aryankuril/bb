"use client";
import React, { useState } from "react";
import Link from "next/link";

type Step = {
  number: string;
  title: string;
  image: string;
  category: string;
  link: string; // ✅ Add link property
};

const allSteps: Step[] = [
  // 🟦 WEB DEVELOPMENT (5)
  { number: "01", title: "JK Diamonds", image: "/images/webdev/Jk-Diamonds.png", category: "Web Development", link: "/jkdiamonds" },
  { number: "02", title: "My Suit", image: "/images/webdev/MST.png", category: "Web Development", link: "/mysuit" },
  { number: "03", title: "SCS", image: "/images/webdev/SCS.png", category: "Web Development", link: "/scs" },
  { number: "04", title: "The Feline Foundation", image: "/images/webdev/Super-Sox.png", category: "Web Development", link: "/ff" },
  { number: "05", title: "Super Sox", image: "/images/webdev/Foundation.png", category: "Web Development", link: "/supersox" },

  // 🟩 PERFORMANCE MARKETING (4)
  { number: "01", title: "Chater Box", image: "/images/pm/chaterbox.webp", category: "Performance Marketing", link: "/chatterbox" },
  { number: "02", title: "Dancing Leaf", image: "/images/pm/Dancingleaf.webp", category: "Performance Marketing", link: "/dancingleaf" },
  { number: "03", title: "JK Diamonds", image: "/images/pm/jkdiamonds.webp", category: "Performance Marketing", link: "/jkdiamondsperformance" },
  { number: "04", title: "SCS", image: "/images/pm/SCS.webp", category: "Performance Marketing", link: "/scsperformance" },

  // 🟥 SOCIAL MEDIA (2)
  { number: "01", title: "Ric Rac", image: "/images/sm/Ric-Rac.png", category: "Social Media", link: "/ricrac" },
  { number: "02", title: "SCS", image: "/images/sm/SCS.png", category: "Social Media", link: "/scs" },
   { number: "03", title: "Super Sox", image: "/images/sm/Super-Sox.png", category: "Social Media", link: "/supersox-sm" },

  // 🟨 SEO (4)
  { number: "01", title: "Manba", image: "/images/seo-cs/Manba.png", category: "SEO", link: "/manba" },
  { number: "02", title: "Prosolv", image: "/images/seo-cs/Prosolv.png", category: "SEO", link: "/presolv" },
  { number: "03", title: "SCS", image: "/images/seo-cs/SCS.png", category: "SEO", link: "/scs-seo" },
];

const categories = ["All", "Web Development", "Performance Marketing", "Social Media", "SEO"];

const SecondSection = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [showAll, setShowAll] = useState(false);

  let processSteps =
    activeCategory === "All"
      ? allSteps
      : allSteps.filter((step) => step.category === activeCategory);

  const visibleSteps = showAll ? processSteps : processSteps.slice(0, 5);

  const pairs: Step[][] = [];
  for (let i = 0; i < visibleSteps.length; i += 2) {
    pairs.push(visibleSteps.slice(i, i + 2));
  }

  return (
    <section id="second-section" className="container py-10 sm:py-15 lg:py-20">
      <h2 className="black-text mr-4 lg:mb-5 mb-4">Services</h2>

      <div className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto no-scrollbar mb-5 lg:mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setShowAll(false);
            }}
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

      <div className="space-y-6">
        {pairs.map((pair, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pair.map((step, i) => {
              const isEvenRow = rowIdx % 2 === 0;
              const isFirstBig = isEvenRow ? i === 0 : i !== 0;
              const colSpan = isFirstBig ? 3 : 2;

              return (
                <Link key={i} href={step.link} className={`col-span-1 md:col-span-${colSpan} relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden`}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <CardText number={step.number} title={step.title} />
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {processSteps.length > 5 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 border border-[var(--color-primary)] cursor-pointer text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </section>
  );
};

const CardText: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
    <span className="text-highlight numbering">{number}</span>
    <h3 className="white-text leading-tight">{title}</h3>
  </div>
);

export default SecondSection;
