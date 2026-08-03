import type { FormContent } from "../types";
import LeadForm from "../common/LeadForm";
import Reveal from "../common/Reveal";

type Props = {
  content: FormContent;
};

export default function HeroForm({ content }: Props) {
  return (
    <Reveal delay={0.15} className="lg:sticky lg:top-24">
      <aside
        className="rounded-3xl border border-white/40 bg-white/55 p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
        aria-label={content.title}
      >
        <div className="mb-6 space-y-2">
          <h3 className="text-[var(--color-primary)]">{content.title}</h3>
          <p className="subtitle grey-text">{content.subtitle}</p>
        </div>
        <LeadForm content={content} variant="hero" />
      </aside>
    </Reveal>
  );
}
