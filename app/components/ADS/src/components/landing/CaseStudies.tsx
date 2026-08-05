import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import caseFashion from "@/app/components/ADS/src/assets/case-fashion.jpg";
import caseD2c from "@/app/components/ADS/src/assets/case-d2c.jpg";
import caseRealEstate from "@/app/components/ADS/src/assets/case-realestate.jpg";
import Image from "next/image";


const cases = [
  {
    tag: "Fashion · Designer-led D2C",
    title: "“Exclusivity sells. Discounts don’t.”",
    copy: "No marketplace sales. Aspiration and storytelling through the brand website only — with Meta prospecting built around premium buyer signals at a ₹6,000 average order value.",
    image: caseFashion,
    alt: "Premium designer shirts flatlay for a fashion D2C ecommerce brand",
    metrics: [
      { v: "6.3X", l: "ROAS" },
      { v: "₹1.5 Cr", l: "Sales generated" },
      { v: "₹6,000", l: "Avg. order value" },
    ],
  },
  {
    tag: "Beauty · Catalog scaling",
    title: "Catalog ads that scaled without burning CPA",
    copy: "Restructured Advantage+ catalogue campaigns and creative-led prospecting across Meta and Google Shopping, with daily bid adjustment on live ROAS.",
    image: caseD2c,
    alt: "D2C skincare product range on a light beige studio backdrop",
    metrics: [
      { v: "80%", l: "Higher ROAS" },
      { v: "30%", l: "Higher CTR" },
      { v: "-38%", l: "Cost per purchase" },
    ],
  },
  {
    tag: "Real estate · Lead generation",
    title: "Site visits, not junk form fills",
    copy: "OTP-verified instant forms with conditional intent logic filtered budget and locality before handover — sales stopped chasing tyre-kickers within three weeks.",
    image: caseRealEstate,
    alt: "Modern Mumbai real estate sales gallery with an architectural model",
    metrics: [
      { v: "3.1X", l: "Qualified leads" },
      { v: "₹412", l: "Cost per lead" },
      { v: "47%", l: "Site-visit rate" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Case studies</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Proof of delivery, not a portfolio wall.
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Three accounts, three different problems, one method. Scroll through the numbers.
          </p>
        </Reveal>

        <div className="mt-14">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="sticky"
              style={{ top: `calc(6rem + ${i * 1.75}rem)`, marginBottom: "2rem" }}
            >
              <article className="card-soft overflow-hidden shadow-lift">
                <div className="grid lg:grid-cols-2">
                  <div className="p-7 sm:p-10">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-extrabold text-secondary">
                        0{i + 1}
                      </span>
                      <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        {c.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">{c.title}</h3>
                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
                      {c.copy}
                    </p>

                    <dl className="border-border mt-8 grid grid-cols-3 gap-4 border-t pt-6">
                      {c.metrics.map((m) => (
                        <div key={m.l}>
                          <dt className="text-muted-foreground order-2 mt-1 text-xs">{m.l}</dt>
                          <dd className="font-display text-2xl font-extrabold sm:text-3xl">
                            {m.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <a
                      href="#audit"
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-bold"
                    >
                      Get a plan like this
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="relative min-h-56 bg-muted lg:min-h-full">
                    <Image
  src={c.image}
  alt={c.alt}
  width={1000}
  height={750}
  className="h-full w-full object-cover"
/>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
