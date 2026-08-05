 import { BarChart3, IndianRupee, Users, Zap } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import teamOffice from "@/app/components/ADS/src/assets/team-office.jpg";
import Image from "next/image";

const stats = [
  { icon: BarChart3, value: "1000+", label: "Projects delivered" },
  { icon: IndianRupee, value: "₹20Cr+", label: "Managed ad spend" },
  { icon: Users, value: "150+", label: "Happy clients" },
  { icon: Zap, value: "4X", label: "Average ROAS" },
];

export function WhyUs() {
  return (
    <section id="results" className="py-20 md:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow subtitle">Why Bombay Blokes</span>
          <h2 className="mt-4">
            We engineer revenue, not just reach.
          </h2>
          <p className="text-muted-foreground mt-4 subtitle">
            From Meta Ads and Google Ads to lead generation, conversion rate optimisation, audience
            targeting and ROAS-focused campaigns — we optimise every touchpoint to turn ad spend
            into measurable business growth, with complete transparency.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="card-soft h-full p-5">
                  <s.icon className="size-5 text-secondary" />
                  <div className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="text-muted-foreground mt-1 subtitle">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <a
            href="#audit"
            className="bg-ink text-background mt-8 inline-flex rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            Get free audit
          </a>
        </Reveal>

        <Reveal delay={120} className="relative">
         <Image
  src={teamOffice}
  alt="Bombay Blokes performance marketing team reviewing campaign dashboards in Mumbai"
  width={1200}
  height={900}
  className="border-border w-full rounded-3xl border object-cover shadow-lift"
/>
          <div className="card-soft absolute -bottom-6 -left-2 w-56 p-4 sm:left-6 animate-float motion-reduce:animate-none">
            <div className="text-muted-foreground text-xs">Live account · 30 days</div>
            <div className="font-display mt-1 subtitle">6.3X</div>
            <div className="text-muted-foreground text-xs">blended ROAS on Meta + Google</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
