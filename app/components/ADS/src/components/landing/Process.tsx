import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const steps = [
  { t: "Business analysis", d: "Auditing your current funnel bottlenecks and where spend leaks." },
  { t: "Competitor intel", d: "Reverse-engineering rival ad libraries, offers and landing pages." },
  { t: "Audience matrix", d: "Deep-dive demographic and intent targeting per service line." },
  { t: "Campaign setup", d: "Structuring Pixel, CAPI, conversion goals and tracking tags." },
  { t: "Creative testing", d: "Deploying hook-driven, organic-style ads in weekly sprints." },
  { t: "Optimisation", d: "Daily bid adjustment based on live ROAS and lead quality." },
  { t: "Scaling", d: "Unlocking vertical scaling constraints once CPA holds." },
];

export function Process() {
  return (
    <section id="process" className="bg-ink text-background border-y py-10 sm:py-15 lg:py-20">
      <div className="container">
        <Reveal className="max-w-4xl">
          <span className="eyebrow subtitle">Client journey</span>
          <h2 className="mt-4 ">
            Mumbai’s growth-focused performance marketing agency in seven steps.
          </h2>
          <p className="mt-5 subtitle text-background/70">
            Trusted by ambitious brands to drive customer acquisition, revenue growth and industry
            leading marketing performance.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-background/15 border
        border-[var(--color-highlight)]/40 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={(i % 4) * 80} className="bg-ink">
              <div className="group h-full p-6 transition-colors duration-300 hover:bg-background/5">
                <span className="font-display subtitle text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-4 text-white">{s.t}</h4>
                <p className="mt-2 subtitle text-background/65">{s.d}</p>
                <div className="mt-6 h-0.5 w-8 bg-secondary transition-all duration-300 group-hover:w-16" />
              </div>
            </Reveal>
          ))}   
          <li className="bg-ink">
            <a
              href="#audit"
              className="flex h-full flex-col justify-between p-6 transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              <span className="font-display text-sm font-extrabold">→</span>
              <span className="mt-8 text-lg font-bold">Start with a free audit</span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
