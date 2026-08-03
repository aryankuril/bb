import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
};

export default function Card({
  children,
  className = "",
  hover = true,
  glass = false,
}: CardProps) {
  const base = glass
    ? "rounded-2xl border border-white/30 bg-white/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
    : "rounded-2xl border border-black/[0.06] bg-white/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.04)]";

  const hoverClass = hover
    ? "transition-all duration-300 hover:shadow-[0_12px_40px_rgba(250,179,30,0.12)] hover:-translate-y-1 hover:border-[var(--color-highlight)]/30"
    : "";

  return (
    <div className={`${base} ${hoverClass} ${className}`.trim()}>{children}</div>
  );
}
