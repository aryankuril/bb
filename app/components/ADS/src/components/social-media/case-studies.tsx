import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import Image from "next/image";
import caseFashion from "@/app/components/ADS/src/assets/case-fashion.jpg";
import caseD2c from "@/app/components/ADS/src/assets/case-d2c.jpg";
import caseRealEstate from "@/app/components/ADS/src/assets/case-realestate.jpg";
import c2 from "../../assets/creative-2.jpg";
import c1 from "../../assets/creative-1.jpg";
import carron from "../../assets/carron.png";
import ss from "../../assets/supersox.png";
import Manba from "../../assets/manbaa.png";


const cases = [
  {
    tag: "Carron Clothing",
    title: "Product Stories That Turned Store Content Into 90K+ Views.",
    copy: "Product-led short-form storytelling has worked particularly well for in-store content, showcasing product ideas and the store experience in an engaging way. This approach helped generate 90K+ views in a single month, demonstrating the impact of concise, product-focused storytelling.",
    image: carron,
    alt: "Carron Clothing case study",
    metrics: [
      { v: "90K+", l: "Views" },
      { v: "90", l: "Engagement" },
      { v: "160", l: "Profile visits" },
    ],
  },
  {
    tag: "Manba Finance",
    title: "From Loans to Life’s Next Big Move.",
    copy: "A storytelling-led social strategy helped Manba Finance transform financial communication into relatable conversations around mobility, ambition and everyday progress — making the brand more relevant to the people it aims to empower.",
    image: Manba,
    alt: "Manba Finance case study",
    metrics: [
      { v: "37%", l: "Views growth" },
      { v: "20%", l: "Profile visits" },
    ],
  },
  {
    tag: "Supersox",
    title: "From Functional Socks to a Brand People Want to Wear.",
    copy: "A content-first social strategy built around culture, storytelling and everyday relevance helped Supersox move beyond product-led communication — making performance socks more relevant, relatable and worth talking about.",
    image: ss,
    alt: "Supersox case study",
    metrics: [
      { v: "42,992", l: "Interactions" },
      { v: "12.5%", l: "Monthly follower growth" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="container py-6 sm:py-8 lg:py-8">
      <div className="">
        <Reveal className="  text-center">
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
                                   <div className="relative min-h-56 bg-muted lg:hidden">
  <Image
    src={c.image}
    alt={c.alt}
    width={1000}
    height={750}
    className="h-full w-full object-fit"
  />
</div>
                  <div className="p-7 sm:p-10">
                    
                    <div className="flex items-center gap-3">
                      
                      <span className="font-display subtitle text-secondary">
                        0{i + 1}
                      </span>
                      <span className="text-muted-foreground subtitle  uppercase">
                        {c.tag}
                      </span>
                    </div>
                    <h6 className=" black-text lg:mt-5 mt-3">{c.title}</h6>
                    <p className="black-text lg:mt-4 mt-3 subtitle">
                      {c.copy}
                    </p>

                   <dl className="border-border mt-3 grid grid-cols-1 gap-3 border-t pt-3 lg:mt-8 lg:grid-cols-3 lg:gap-4 lg:pt-6">
  {c.metrics.map((m) => (
    <div
      key={m.l}
      className="grid grid-cols-2 items-center lg:block"
    >
      <dt className="text-muted-foreground subtitle">
        {m.l}
      </dt>

    <span className="black-text text-right text-[18px] lg:text-left lg:text-[25px]">
  {m.v}
</span>
    </div>
  ))}
</dl>

                    <a
                      href="#audit"
                      className="group lg:mt-8 mt-3 inline-flex items-center gap-2 text-sm font-bold"
                    >
                      Get a plan like this
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                 <div className="relative hidden min-h-56 bg-muted lg:block lg:min-h-full">
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
