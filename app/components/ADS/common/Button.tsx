"use client";

import Link from "next/link";

type ButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  text,
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const label = loading ? text : text;
  const isDisabled = disabled || loading;

  const classes = `animated-border-btn ${className}`.trim();

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel ?? text}>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      aria-label={ariaLabel ?? text}
      aria-busy={loading}
    >
      <span>{label}</span>
    </button>
  );
}
