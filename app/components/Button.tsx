"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface ButtonProps {
  text: string;
  href?: string;           // optional link
  onClick?: () => void;    // click handler
  className?: string;
  disabled?: boolean;      // ✅ new: supports disabled state
}

const Button: React.FC<ButtonProps> = ({ text, href, onClick, className = "", disabled = false }) => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth + 32);
    }
  }, [text]);

  const chars = (text ?? "").split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  const content = (
    <div
      className={`relative z-10 px-4 py-2 h-12 flex items-center justify-center uppercase body3 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span ref={textRef} className="flex">
        {chars.map((char, idx) => (
          <span
            key={idx}
            className="relative block overflow-hidden h-7 w-auto"
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            <span
              className={`block transition-transform duration-400 ease-in-out ${
                hovered && !disabled ? "-translate-y-7" : "translate-y-0"
              }`}
            >
              {char}
            </span>
            <span
              className={`block absolute left-0 top-0 transition-transform duration-400 ease-in-out ${
                hovered && !disabled ? "translate-y-0" : "translate-y-7"
              }`}
            >
              {char}
            </span>
          </span>
        ))}
        <span className="text-[18px] font-normal select-none"> +</span>
      </span>
    </div>
  );

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      {/* Background animation */}
      <div
        className={`body3 absolute top-1/2 -translate-y-1/2 bg-[var(--color-highlight)] rounded-full transition-all duration-500 ease-in-out h-12`}
        style={{
          width: hovered && !disabled ? textWidth : 48,
          left: -5,
          opacity: disabled ? 0.5 : 1,
        }}
      ></div>

      {/* Render Link or Button */}
      {href ? (
        <Link
          href={disabled ? "#" : href}
          className={disabled ? "pointer-events-none" : ""}
        >
          {content}
        </Link>
      ) : (
        <button
          onClick={!disabled ? onClick : undefined}
          disabled={disabled}
          className="relative z-10 body3"
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default Button;
