import { ArrowUpRight, Globe, LineChart, Search, Share2, Sparkles } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const services = [
  {
    icon: LineChart,
    title: "Performance Marketing",
    keyword: "performance marketing services",
    copy: "Full-funnel Google and Meta campaigns built around cost per qualified lead and ROAS — not impressions. Performance marketing for ecommerce, D2C and high-ticket lead gen.",
    points: ["Precision targeting", "Real-time bidding", "Daily ROAS optimisation"],
  },
  {
    icon: Search,
    title: "Google Ads Management",
    keyword: "google ads expert",
    copy: "A dedicated Google Ads expert structures Search, Shopping and Performance Max by service line — starting on Max Clicks for volume, migrating to Max Conversions once signal is strong.",
    points: ["Search + PMax", "Conversion tracking", "Negative keyword hygiene"],
  },
  {
    icon: Share2,
    title: "Meta Ads & Lead Gen",
    keyword: "meta ads expert",
    copy: "Awareness video builds the retargeting pool; instant forms with OTP verification and conditional logic qualify leads before they ever hit your sales team.",
    points: ["OTP-verified forms", "Intent filtering", "Creative testing sprints"],
  },
  {
    icon: Globe,
    title: "Website & Landing Pages",
    keyword: "conversion rate optimisation",
    copy: "Fast, conversion-first pages and stores. We fix the leak between the click and the enquiry so your cost per lead drops without touching budget.",
    points: ["CRO teardowns", "Speed + mobile first", "Shopify & custom builds"],
  },
  {
    icon: Sparkles,
    title: "AI Content & Production",
    keyword: "ad creative production",
    copy: "UGC-style walkthroughs, founder stories and result-demo videos — plus keyword-led statics that pair a headline with a hard proof point.",
    points: ["3 video angles", "Keyword-led statics", "Monthly creative refresh"],
  },
  {
    icon: ArrowUpRight,
    title: "360° Digital Marketing",
    keyword: "digital marketing agency in mumbai",
    copy: "One team for media, creative, web and analytics. Cross-platform campaigns across Google, Meta, Amazon advertising and LinkedIn — coordinated, not siloed.",
    points: ["Amazon advertising", "Cross-platform planning", "Unified reporting"],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-sand border-y py-20 md:py-28">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">What we do</span>
          <a className="mt-4 heading block">
            Performance marketing services built for one outcome: profitable growth.
          </a>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Whether you need more leads, better leads, or a lower cost per acquisition, every
            engagement starts with the same thing — a free account audit and a clear number to beat.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <article className="card-soft group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/20 transition-colors group-hover:bg-secondary">
                    <s.icon className="size-5" />
                  </span>
                  <ArrowUpRight className="text-muted-foreground size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <h6 className="mt-5 ">{s.title}</h6>
                <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">{s.copy}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-medium"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
