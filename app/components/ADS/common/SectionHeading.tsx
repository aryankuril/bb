import type { SectionHeading as SectionHeadingType } from "../types";

type Props = SectionHeadingType & {
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <p className="subtitle uppercase tracking-[0.2em] text-[var(--color-grey)] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-4">{title}</h2>
      {subtitle && <p className="body2 grey-text">{subtitle}</p>}
    </div>
  );
}
