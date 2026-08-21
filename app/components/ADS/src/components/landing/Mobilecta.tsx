"use client";

import { useEffect, useState } from "react";

export default function Mobilecta() {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const section = document.getElementById("section-3");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCTA(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!showCTA) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 rounded-t-[25px] bg-black/55 px-4 py-2.5 backdrop-blur-sm lg:hidden">
      <span className="text-sm font-medium text-white">
        Ready to grow?
      </span>

      <a
        href="#audit"
        className="shrink-0 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-black"
      >
        Get free audit
      </a>
    </div>
  );
}