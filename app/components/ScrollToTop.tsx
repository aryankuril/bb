"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkSection = (): HTMLElement | null =>
      document.querySelector("#second-section");
    let secondSection: HTMLElement | null = checkSection();

    // Wait for DOM (Next.js hydration delay)
    const interval = setInterval(() => {
      secondSection = checkSection();
      if (secondSection) {
        clearInterval(interval);

        const handleScroll = () => {
          if (!secondSection) return; // ✅ type-safety check
          const rect = secondSection.getBoundingClientRect();
          const isPastSecondSection =
            rect.top <= window.innerHeight * 0.8; // show after 30% viewport
          setVisible(isPastSecondSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // run once on load

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#FAB31E] text-black flex items-center justify-center shadow-lg cursor-pointer transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <img
        src="/images/ScrollToTop.svg"
        alt="ScrollToTop"
        className="w-5 h-5"
      />
    </button>
  );
}
