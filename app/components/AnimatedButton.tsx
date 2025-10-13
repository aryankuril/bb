"use client";

import Link from "next/link";
import React from "react";

type AnimatedButtonProps = {
  text: string;
  href?: string;
  className?: string;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  href = "#",
  className = "",
}) => {
  return (
    <Link href={href} className={`inline-block ${className}`}>
      <button className="animated-border-btn">
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default AnimatedButton;
