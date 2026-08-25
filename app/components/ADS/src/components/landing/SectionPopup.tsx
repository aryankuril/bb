"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = document.getElementById("section-3");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          setIsOpen(true);
          setHasShown(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasShown]);

  // Close when clicking outside the popup
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleCTA = () => {
    setIsOpen(false);

    setTimeout(() => {
      document.getElementById("audit")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className=" contianer fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="
          relative
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-7
          shadow-2xl
          sm:p-8
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-xl
            text-black/60
            transition
            hover:bg-black/5
            hover:text-black
          "
        >
          ×
        </button>

        {/* Content */}
        <div className="pr-6">
             <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ready to grow?
          </span>

                      <h6 className=" black-text lg:mt-5 mt-3">
    Let&apos;s build a strategy that works for your brand.
  </h6>

  <p className="black-text mt-3 subtitle">
    Get a clear view of what&apos;s working, what&apos;s missing and
            where your next growth opportunity is.
  </p>
         

        

          {/* CTA */}
          <button
            type="button"
            onClick={handleCTA}
                         className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:shadow-amber disabled:opacity-70"

          >
            Get Your Free Audit
          </button>
        </div>
      </div>
    </div>
  );
}