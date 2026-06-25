"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WorkContent } from "./departmentConfig";

type Step = {
  number: string;
  title: string;
  image: string;
  category: string;
  link: string;
};

const allSteps: Step[] = [
  // Web Development
  { number: "01", title: "Supersox", image: "/images/webdev/SuperSoxnew.jpg", category: "Web Development", link: "/work/website-development/supersox" },
  { number: "02", title: "Blancora", image: "/images/webdev/Blancoranew.jpg", category: "Web Development", link: "/work/website-development/blancora" },
  { number: "03", title: "Mr Blox", image: "/images/webdev/MrBloxnew.jpg", category: "Web Development", link: "/work/website-development/mrblox" },
  { number: "04", title: "My Suit Tailor", image: "/images/webdev/MSTnew.jpg", category: "Web Development", link: "/work/website-development/mysuittailor" },
  { number: "05", title: "JK Diamonds Institute", image: "/images/webdev/Jk-Diamonds2.jpg", category: "Web Development", link: "/work/website-development/jkdiamondsinstitute" },
  { number: "06", title: "The Feline Foundation", image: "/images/webdev/FelineFoundation2.jpg", category: "Web Development", link: "/work/website-development/thefelinefoundation" },
  { number: "07", title: "SCS Sports", image: "/images/webdev/SCS2.jpg", category: "Web Development", link: "/work/website-development/scssports" },

  // Performance Marketing
  { number: "01", title: "JK Diamonds Institute", image: "/images/pm/Jk-diamondsnew.jpg", category: "Performance Marketing", link: "/work/performance-marketing/jkdiamondsinstitute" },
  { number: "02", title: "Dancing Leaf", image: "/images/pm/Dancingleafnew2.jpg", category: "Performance Marketing", link: "/work/performance-marketing/dancingleaf" },
  { number: "03", title: "Chatterbox Labels", image: "/images/pm/Chatterboxnew2.jpg", category: "Performance Marketing", link: "/work/performance-marketing/chatterboxlabels" },
  { number: "04", title: "SCS Sports", image: "/images/pm/SCSnew.jpg", category: "Performance Marketing", link: "/work/performance-marketing/scssports" },

  // Social Media
  { number: "01", title: "Supersox", image: "/images/sm/SS.jpg", category: "Social Media", link: "/work/social-media-marketing/supersox" },
  { number: "02", title: "Manba Finance", image: "/images/sm/Manba.jpg", category: "Social Media", link: "/work/social-media-marketing/manbafinance" },
  { number: "03", title: "Parvez Damania", image: "/images/sm/Damania.jpg", category: "Social Media", link: "/work/social-media-marketing/damania" },
  { number: "04", title: "SCS Sports", image: "/images/sm/SCS.jpg", category: "Social Media", link: "/work/social-media-marketing/scssports" },
  { number: "05", title: "Ric Rac", image: "/images/sm/Ricrac2.jpg", category: "Social Media", link: "/work/social-media-marketing/ricrackids" },

  // SEO
  { number: "01", title: "Manba Finance", image: "/images/seo-cs/manbaaa.png", category: "SEO", link: "/work/seo-services/manbafinance" },
  { number: "02", title: "SCS Sports", image: "/images/seo-cs/SCS1.png", category: "SEO", link: "/work/seo-services/scssports" },

  // Branding
  { number: "01", title: "Padel Park", image: "/images/Branding/Padel-Park2.jpg", category: "Branding", link: "/work/design-branding/padelpark" },
  { number: "02", title: "Bombay Artisan Co", image: "/images/Branding/BomBay-Artisan-Co2.jpg", category: "Branding", link: "/work/design-branding/bombayartisanco" },
  { number: "03", title: "Manba Finance", image: "/images/Branding/Manba-Bus2.jpg", category: "Branding", link: "/work/design-branding/manbafinance" },
  { number: "04", title: "Making India Play", image: "/images/Branding/Making-India-Play2.jpg", category: "Branding", link: "/work/design-branding/makingindiaplay" },
];

const categories = ["Web Development", "Performance Marketing", "Social Media", "SEO", "Branding"];

const AdsWorkSection = ({ content }: { content: WorkContent }) => {
  const [activeCategory, setActiveCategory] = useState(content.filterLabel);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = allSteps.filter((s) => s.category === activeCategory);
  const visible = showAll ? filtered : filtered.slice(0, 5);

  const pairs: Step[][] = [];
  for (let i = 0; i < visible.length; i += 2) {
    pairs.push(visible.slice(i, i + 2));
  }

  const handleCategoryClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);
    setShowAll(false);

    const container = scrollRef.current;
    const button = e.currentTarget;
    if (container) {
      const buttonRight = button.offsetLeft + button.offsetWidth;
      const visibleRight = container.scrollLeft + container.clientWidth;
      if (buttonRight > visibleRight - 50) {
        container.scrollTo({ left: buttonRight - container.clientWidth + 50, behavior: "smooth" });
      } else if (button.offsetLeft < container.scrollLeft + 50) {
        container.scrollTo({ left: button.offsetLeft - 50, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="our-work" className="container py-10 sm:py-15 lg:py-20">
      <h6 className="black-text mb-6 lg:mb-8">Our Work</h6>

      {/* Filter chips */}
      <div
        ref={scrollRef}
        className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto no-scrollbar mb-5 lg:mb-10 scroll-smooth"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={(e) => handleCategoryClick(cat, e)}
            className={`cursor-pointer shrink-0 px-4 py-1 mb-5 lg:mb-0 rounded-full border body3 transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-primary)]"
                : "bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="space-y-6">
        {pairs.map((pair, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pair.map((step, i) => {
              const isEvenRow = rowIdx % 2 === 0;
              const isFirstBig = isEvenRow ? i === 0 : i !== 0;
              const colSpan = isFirstBig ? "md:col-span-3" : "md:col-span-2";

              return (
                <Link
                  key={i}
                  href={step.link}
                  className={`col-span-1 ${colSpan} relative h-[220px] sm:h-[300px] md:h-[340px] rounded-[15px] overflow-hidden group`}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover bg-black z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-[2] flex items-end gap-2 sm:gap-4">
                    <span className="text-highlight casenumbering">{step.number}</span>
                    <h3 className="white-text leading-tight">{step.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Show more / less */}
      {filtered.length > 5 && (
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

export default AdsWorkSection;
