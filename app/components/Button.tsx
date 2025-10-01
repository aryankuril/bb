"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface ButtonProps {
  text: string;
  href?: string;          // ✅ Now optional
  onClick?: () => void;   // ✅ Support for actions
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, href, onClick }) => {
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
      className="relative z-10 px-4 py-2 h-12 flex items-center justify-center font-poppins text-[18px] font-normal uppercase leading-normal"
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
                hovered ? "-translate-y-7" : "translate-y-0"
              }`}
            >
              {char}
            </span>
            <span
              className={`block absolute left-0 top-0 transition-transform duration-400 ease-in-out ${
                hovered ? "translate-y-0" : "translate-y-7"
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
      className="relative inline-block cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background animation */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 bg-[#FAB31E] rounded-full transition-all duration-500 ease-in-out h-12`}
        style={{
          width: hovered ? textWidth : 48,
          left: -5,
        }}
      ></div>

      {/* Render Link OR Button based on props */}
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        <button onClick={onClick} className="relative z-10">
          {content}
        </button>
      )}
    </div>
  );
};

export default Button;
