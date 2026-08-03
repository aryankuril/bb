import { whyBombayBlokes, pageContent } from "../data";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import StatsCard from "./StatsCard";
import type { WhyBombayBlokesContent } from "../types";

type Props = {
  pageKey?: keyof typeof pageContent;
};

export default function WhyBombayBlokes({ pageKey }: Props) {
  const content: WhyBombayBlokesContent = pageKey
    ? {
        ...whyBombayBlokes,
        eyebrow: pageContent[pageKey].eyebrow,
        title: pageContent[pageKey].title,
        body: pageContent[pageKey].body,
        cta: pageContent[pageKey].cta,
        stats: pageContent[pageKey].stats ?? whyBombayBlokes.stats,
      }
    : whyBombayBlokes;

  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Why Bombay Blokes">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <Reveal>
            <p className="subtitle uppercase tracking-[0.2em] text-[var(--color-grey)]">
              {content.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2>{content.title}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {content.body.map((paragraph, index) => (
                <p key={index} className="body2 grey-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Button text={content.cta} href={content.ctaHref} ariaLabel={content.cta} />
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {content.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <StatsCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
