import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import PM1 from "@/app/components/ADS/src/assets/pmlp1.png";
import PM2 from "@/app/components/ADS/src/assets/pmlp2.png";
import PM3 from "@/app/components/ADS/src/assets/pmlp4.png";
import Image from "next/image";


const cases = [
  {
    tag: "Sports · E-commerce",
    title: "Scale Revenue While Improving ROAS",
    copy: "Scaled monthly revenue from ₹20L to ₹45L+ while improving ROAS across high-AOV products.",
    image: PM1,
    alt: "Sports e-commerce performance dashboard",
    metrics: [
      { v: "6.8x → 10.2x", l: "ROAS" },
      { v: "₹20L → ₹45L+", l: "Monthly Revenue" },
      { v: "15.87%", l: "Returning Customer Rate" },
    ],
  },
  {
    tag: "Textile & Apparel",
    title: "Scale to 7,000+ Orders Without Increasing CAC",
    copy: "2-model strategy combining prospecting and retargeting to scale orders while improving ROAS and maintaining efficient acquisition.",
    image: PM1,
    alt: "Textile and apparel e-commerce performance dashboard",
    metrics: [
      { v: "1.5x - 3.2x", l: "ROAS" },
      { v: "3,000 - 7,000+", l: "Orders" },
      { v: "+101%", l: "Revenue" },
    ],
  },
  {
    tag: "Kids & Stationery",
    title: "Scale Quarterly Revenue While Maintaining ROAS",
    copy: "Optimized the checkout and product experience while shifting creative and audience strategy towards high-intent, gifting-led customers.",
    image: PM1,
    alt: "Kids and stationery e-commerce performance dashboard",
    metrics: [
      { v: "+91% - ₹1.51 Cr", l: "Revenue" },
      { v: "+42%", l: "Orders" },
      { v: "2x - 4.5x", l: "ROAS" },
    ],
  },
  {
    tag: "Diamond Course",
    title: "Increase Conversions While Reducing CPL",
    copy: "Built demand through YouTube awareness and refined Search campaigns through keyword and audience testing to improve lead quality and conversion efficiency.",
    image: PM1,
    alt: "Diamond course marketing performance dashboard",
    metrics: [
      { v: "+36%", l: "Conversions" },
      { v: "-30%", l: "CAC" },
      { v: "-25%", l: "Junk Leads" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="container py-8 sm:py-8 lg:py-8">
      <div className="">
        <Reveal className="max-w-5xl mx-auto text-center">
  <span className="eyebrow subtitle">Case studies</span>

  <span className="heading mt-3 block">
    Proof of delivery, not a portfolio wall.
  </span>

  <p className="black-text mt-3 subtitle">
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
                    <h6 className=" black-text mt-5">{c.title}</h6>
                    <p className="black-text mt-4 subtitle">
                      {c.copy}
                    </p>

                    <dl className="border-border mt-8 grid grid-cols-3 gap-4 border-t pt-6">
                      {c.metrics.map((m) => (
                        <div key={m.l}>
                          <dt className="text-muted-foreground order-2 mt-1 subtitle">{m.l}</dt>
                         <h6 className="black-text">
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
  className="h-full w-full object-fit"
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
