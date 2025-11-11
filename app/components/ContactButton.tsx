"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface ButtonProps {
  text: string;
  href?: string; // optional link
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void; // click handler
  className?: string;
  disabled?: boolean; // disabled state
  isSubmitting?: boolean; // form submission state
  type?: "button" | "submit" | "reset";
}

const ContactButton: React.FC<ButtonProps> = ({
  text,
  href,
  onClick,
  className = "",
  disabled = false,
  isSubmitting = false,
  type = "button",
}) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  // Measure button text width for background animation
  useEffect(() => {
    if (textRef.current) setTextWidth(textRef.current.offsetWidth + 32);
  }, [text, isSubmitting]);

  // ✅ Automatically reset hover when the button becomes disabled/submitting
  useEffect(() => {
    if (disabled || isSubmitting) {
      setHovered(false);
      setActive(false);
    }
  }, [disabled, isSubmitting]);

  const displayText = isSubmitting ? "Sending..." : text;
  const chars = (displayText ?? "").split("").map((char) => (char === " " ? "\u00A0" : char));

  // ✅ Reset hover immediately before click disables it
  const handleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isSubmitting) return;
    setHovered(false);
    setActive(true);
    setTimeout(() => setActive(false), 160);
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => !disabled && !isSubmitting && setHovered(true);
  const handleMouseLeave = () => !disabled && !isSubmitting && setHovered(false);

  const content = (
    <div
      className={`relative z-10 px-5 py-3 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-300 body3 ${
        disabled || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span ref={textRef} className="flex items-center justify-center">
        {chars.map((char, idx) => (
          <span
            key={idx}
            className="relative block overflow-hidden h-6 w-auto"
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            <span
              className={`block transform transition-transform duration-300 ease-in-out ${
                hovered && !disabled && !isSubmitting ? "-translate-y-6" : "translate-y-0"
              }`}
            >
              {char}
            </span>
            <span
              className={`block absolute left-0 top-0 transform transition-transform duration-300 ease-in-out ${
                hovered && !disabled && !isSubmitting ? "translate-y-0" : "translate-y-6"
              }`}
              aria-hidden
            >
              {char}
            </span>
          </span>
        ))}

        {/* '+' symbol */}
        <span className="text-[18px] font-normal select-none flex items-center justify-center translate-y-[1px] ml-1">
          +
        </span>
      </span>
    </div>
  );

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background bubble */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out h-12 bg-[var(--color-highlight)] pointer-events-none`}
        style={{
          width: hovered && !disabled && !isSubmitting ? textWidth : 48,
          left: -1,
          opacity: disabled || isSubmitting ? 0.5 : 1,
          transform: active ? "scale(0.96)" : "scale(1)",
        }}
      />

      {/* Render Link or Button */}
      {href ? (
        <Link
          href={disabled || isSubmitting ? "#" : href}
          className={disabled || isSubmitting ? "pointer-events-none relative z-10" : "relative z-10"}
        >
          {content}
        </Link>
      ) : (
        <button
          type={type}
          onClick={handleClick}
          disabled={disabled || isSubmitting}
          className="relative z-10"
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default ContactButton;
