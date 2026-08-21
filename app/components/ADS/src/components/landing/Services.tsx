import {
  ArrowUpRight,
  Globe,
  LineChart,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const serviceContent = [
  {
    icon: LineChart,
    title: "1. Media buying: Google and Meta",
    points: [
      "Google: Search, Shopping and Performance Max structured by service line or product category. Max Clicks to build signal, Max Conversions once it holds. Negative keywords scrubbed weekly.",
      "Meta: awareness video to build the retargeting pool, prospecting on premium buyer signals, Advantage+ catalogue for ecommerce.",
      "Lead gen: OTP-verified instant forms with conditional logic. Budget and locality get asked before the lead reaches your sales team.",
      "Daily bid and budget adjustments against live ROAS or cost per qualified lead.",
    ],
  },
  {
    icon: Sparkles,
    title: "2. Creative production",
    points: [
      "Three angles per sprint: UGC-style walkthroughs, founder stories, result demos. Plus keyword-led statics that pair one headline with one hard proof point.",
      "Written, shot and edited in-house. The brief doesn't leave the building.",
      "Monthly refresh, timed to frequency numbers rather than the calendar.",
    ],
  },
  {
    icon: Globe,
    title: "3. Landing pages and CRO",
    points: [
      "The page your click lands on sets half your cost per lead. We treat it as media.",
      "Speed and mobile fixes first. Then one-decision pages for lead gen, Shopify or custom builds for ecommerce.",
      "Teardown before launch. Tests after.",
    ],
  },
  {
    icon: Search,
    title: "4. Tracking and reporting",
    points: [
      "Pixel, CAPI, GA4, conversion actions and deduplication set up in week one, before spend.",
      "Qualified leads fire the conversion. Junk doesn't. The algorithm learns who you actually want.",
      "A live dashboard you can open at 11pm. Nothing waits for Friday.",
    ],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="border-y bg-sand py-10 sm:py-15 lg:py-15"
    >
      <div className="container">

        <Reveal className="max-w-3xl">
          <span className="eyebrow">What we do</span>

          <a className="mt-3 block heading">
            What's included
          </a>

          <h6 className="text-black">
            One engagement. Four parts. One number.
          </h6>

          <p className="mt-3 leading-relaxed text-muted-foreground">
            Media can't fix ROAS on its own. Neither can creative, or a faster
            site. So they come together.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {serviceContent.map((s, i) => {
            const Icon = s.icon;

            return (
              <Reveal
                key={s.title}
                delay={(i % 2) * 90}
              >
                <article className="card-soft group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">

                  {/* Icon + Arrow */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/20 transition-colors group-hover:bg-secondary">
                      <Icon className="size-5" />
                    </span>

                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>

                  {/* Title */}
                  <h6 className="mt-5">
                    {s.title}
                  </h6>

                  {/* Content */}
                  <ul className="mt-4 list-disc space-y-3 pl-5">
                    {s.points.map((point, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}