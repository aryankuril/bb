import { finalCTA } from "../data";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function CTA() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Final call to action">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-highlight)]/20 bg-gradient-to-br from-[#1d1d1d] via-[#2a2418] to-[#1d1d1d] p-8 sm:p-12 lg:p-16 shadow-[0_24px_64px_rgba(250,179,30,0.15)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,179,30,0.15),transparent_50%)]" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="subtitle uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                {finalCTA.eyebrow}
              </p>
              <h2 className="white-text">{finalCTA.title}</h2>
              <p className="body2 white-text/80">{finalCTA.subtitle}</p>

              <ul className="space-y-2 pt-2">
                {finalCTA.bullets.map((bullet) => (
                  <li key={bullet} className="subtitle white-text/70 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-highlight)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex lg:justify-end">
              <Button text={finalCTA.cta} href={finalCTA.ctaHref} ariaLabel={finalCTA.cta} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
