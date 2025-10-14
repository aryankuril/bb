"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface ButtonProps {
  text: string;
  href?: string; // optional link
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void; // click handler
  className?: string;
  disabled?: boolean; // disabled state
  isSubmitting?: boolean; // ✅ new prop for your logic
  type?: "button" | "submit" | "reset"; // ✅ added type prop
}

const Button: React.FC<ButtonProps> = ({
  text,
  href,
  onClick,
  className = "",
  disabled = false,
  isSubmitting = false,
  type = "button", // default
}) => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth + 32);
    }
  }, [text, isSubmitting]);

  const displayText = isSubmitting ? "Sending..." : text;

  const chars = (displayText ?? "").split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  const content = (
    <div
      className={`relative z-10 px-5 py-3 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-300 ${
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
        className={`block transition-transform duration-400 ease-in-out ${
          hovered && !disabled && !isSubmitting ? "-translate-y-6" : "translate-y-0"
        }`}
      >
        {char}
      </span>
      <span
        className={`block absolute left-0 top-0 transition-transform duration-400 ease-in-out ${
          hovered && !disabled && !isSubmitting ? "translate-y-0" : "translate-y-6"
        }`}
      >
        {char}
      </span>
    </span>
  ))}
  {/*  */}

  {/* ✅ Centered '+' icon */}
  <span className="text-[18px] font-normal select-none flex items-center justify-center translate-y-[1px]">
    +
  </span>
</span>

    </div>
  );

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => !disabled && !isSubmitting && setHovered(true)}
      onMouseLeave={() => !disabled && !isSubmitting && setHovered(false)}
    >
      {/* Background animation */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 bg-[var(--color-highlight)] rounded-full transition-all duration-500 ease-in-out h-12`}
        style={{
          width: hovered && !disabled && !isSubmitting ? textWidth : 48,
          left: -1,
          opacity: disabled || isSubmitting ? 0.5 : 1,
        }}
      ></div>

      {/* Render Link or Button */}
      {href ? (
        <Link
          href={disabled || isSubmitting ? "#" : href}
          className={disabled || isSubmitting ? "pointer-events-none" : ""}
        >
          {content}
        </Link>
      ) : (
        <button
          type={type} 
          onClick={!disabled && !isSubmitting ? onClick : undefined}
          disabled={disabled || isSubmitting}
          className="relative z-10"
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default Button;
