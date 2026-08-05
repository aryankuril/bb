import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ADS/src/components/ui/accordion";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const faqs = [
  {
    q: "What does a performance marketing agency actually do?",
    a: "We plan, launch and optimise paid campaigns on Google and Meta against a business number — cost per qualified lead or ROAS. That covers keyword and audience research, campaign structure, conversion tracking, ad creative, landing pages and daily optimisation.",
  },
  {
    q: "How much does performance marketing cost in Mumbai?",
    a: "Management fees depend on scope and ad spend. Most brands we work with start between ₹50,000 and ₹3,00,000 monthly media budget. We will tell you honestly in the audit if your budget is too low for the result you want.",
  },
  {
    q: "How fast will I see results?",
    a: "Google Search usually shows signal within 2 to 3 weeks. Meta prospecting needs a creative cycle — expect a clear read at 30 days and meaningful scaling from month two, once conversion data has accrued.",
  },
  {
    q: "Do you work with ecommerce and D2C brands?",
    a: "Yes. Performance marketing for ecommerce is a large part of our book — catalogue and Shopping campaigns, Advantage+ structures, Amazon advertising and creative testing built around average order value.",
  },
  {
    q: "Will I get a dedicated Google Ads expert?",
    a: "Yes. Every account has a named strategist and a creative lead. You will not be passed between five people to get a straight answer about your spend.",
  },
  {
    q: "What is included in the free account audit?",
    a: "A review of your existing Google and Meta accounts: structure, wasted spend, tracking gaps, creative angles and landing page leaks — plus the specific number we think we can move and how.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-sand border-y py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Straight answers before you spend.
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Still unsure? Send us your ad account and we will point at the leak for free.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border border-b">
                <AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline sm:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
