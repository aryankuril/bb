import type { HeroContent as HeroContentType } from "../types";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { renderIcon } from "../icons";

type Props = {
  content: HeroContentType;
};

export default function HeroContent({ content }: Props) {
  return (
    <div className="space-y-6 lg:space-y-8">
      <Reveal>
        <p className="subtitle uppercase tracking-[0.2em] text-[var(--color-grey)]">
          {content.eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1>{content.title}</h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-3 max-w-xl">
          {content.description.map((paragraph, index) => (
            <p key={index} className="body2 grey-text">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <Button text={content.cta} href={content.ctaHref} ariaLabel={content.cta} />
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-2">
          {content.trustBadges.map((badge) => (
            <span
              key={badge}
              className="subtitle inline-flex items-center rounded-full border border-black/8 bg-white/60 px-3 py-1.5 backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-black/5 bg-white/50 p-4 backdrop-blur-sm"
            >
              <div className="mb-2 text-[var(--color-highlight)]">
                {renderIcon(stat.icon, "w-5 h-5")}
              </div>
              <p className="body1 !text-2xl sm:!text-3xl font-medium leading-none mb-1">
                {stat.value}
              </p>
              <p className="subtitle grey-text">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
