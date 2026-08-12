import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import Image from "next/image";
import caseFashion from "@/app/components/ADS/src/assets/case-fashion.jpg";
import caseD2c from "@/app/components/ADS/src/assets/case-d2c.jpg";
import caseRealEstate from "@/app/components/ADS/src/assets/case-realestate.jpg";
import c2 from "../../assets/creative-2.jpg";
import c1 from "../../assets/creative-1.jpg";
import c3 from "../../assets/creative-3.jpg";

const cases = [
  {
    tag: "Fashion · D2C",
    title: "A quiet fashion label became a destination feed in 6 months.",
    copy: "We rebuilt the content system around founder storytelling and studio-shot reels instead of discount posts. Weekly output tripled without losing the premium look.",
    image: caseFashion,
    alt: "Saanjh Label fashion content",
    metrics: [
      { v: "+312%", l: "Organic reach" },
      { v: "1.2M", l: "Reel views" },
      { v: "42k", l: "New followers" },
    ],
  },
  {
    tag: "Beauty · E-commerce",
    title: "Education-led content turned saves into repeat customers.",
    copy: "A pillar mix of ingredient explainers, UGC and routine carousels gave the brand a reason to post daily — and gave customers a reason to come back.",
     image: caseD2c,
    alt: "Lumé Skincare beauty products",
    metrics: [
      { v: "12.4%", l: "Engagement rate" },
      { v: "18k", l: "Monthly saves" },
      { v: "2.7x", l: "Site sessions from social" },
    ],
  },
  {
    tag: "F&B · Multi-outlet",
    title: "Local social that filled tables on weekdays, not just weekends.",
    copy: "Neighbourhood-first content, creator seeding and a consistent posting rhythm made the café the default recommendation in its area.",
   image: caseRealEstate,
    alt: "Bandra Roasters café content",
    metrics: [
      { v: "+68%", l: "Store-visit taps" },
      { v: "9.1k", l: "Location tags" },
      { v: "4.9★", l: "Review average" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="container py-10 sm:py-15 lg:py-20">
      <div className="">
        <Reveal className="max-w-4xl">
  <span className="eyebrow subtitle">Case studies</span>

  <span className="heading mt-4 block">
    Proof of delivery, not a portfolio wall.
  </span>

  <p className="text-muted-foreground mt-4 subtitle">
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
                      <span className="font-display subtitle text-secondary">
                        0{i + 1}
                      </span>
                      <span className="text-muted-foreground subtitle  uppercase">
                        {c.tag}
                      </span>
                    </div>
                    <h6 className=" text-black mt-5">{c.title}</h6>
                    <p className="text-muted-foreground mt-4 subtitle">
                      {c.copy}
                    </p>

                    <dl className="border-border mt-8 grid grid-cols-3 gap-4 border-t pt-6">
                      {c.metrics.map((m) => (
                        <div key={m.l}>
                          <dt className="text-muted-foreground order-2 mt-1 subtitle">{m.l}</dt>
                         <h6 className="text-black">
                            {m.v}
                          </h6>
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
