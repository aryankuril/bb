"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        hidden md:flex fixed bottom-8 right-8 z-50
        w-10 h-10 rounded-full bg-[#FAB31E] text-black
        items-center justify-center shadow-lg
         duration-300 cursor-pointer
      `}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
