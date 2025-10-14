"use client";

import Link from "next/link";
import React from "react";

type AnimatedButtonProps = {
  text: string;
  href?: string;
  className?: string;
  index?: number; // Pass index to control animation direction
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  href = "#",
  className = "",
  index = 0,
}) => {
  // Reverse spin for second button
  const spinClass = index === 1 ? "reverse-spin" : "";

  return (
    <Link href={href} className={`inline-block ${className}`}>
      <button className={`animated-border-btn ${spinClass}`}>
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default AnimatedButton;
