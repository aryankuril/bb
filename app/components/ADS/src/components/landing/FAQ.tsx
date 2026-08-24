import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ADS/src/components/ui/accordion";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

const faqs = [
  {
    q: "What's the minimum spend?",
    a: "₹3L a month on one platform. ₹5L total for multiple. Under that, the data moves too slowly to learn anything inside 30 days, and you'd be paying us to wait. Our fee sits on top, so if you are spending anything lower, you are better off with a one-person freelancer.",
  },
  {
    q: "Who owns the ad accounts?",
    a: "You do. We work inside your accounts with admin access. Your pixel, your audiences, your history. If we part ways, you remove a user and everything stays exactly where it was. An agency that insists on running your ads from its own account is keeping your data. Ask them why.",
  },
  {
    q: "Who will I actually be talking to?",
    a: "The senior strategist running your account day to day. You'll know him by more than just his name in week one. We're 40 people in one office in Mumbai. There's nowhere to hide a junior.",
  },
  {
    q: "How fast can we go live?",
    a: "Audit in 48 hours. Tracking fixed and KPI agreed in week one. First campaign live inside ten working days. Faster is possible. Faster on broken tracking just means you find out you were wrong at a higher spend.",
  },
  {
    q: "What happens if it doesn't work?",
    a: "You hear it from us in week four, not month four. The KPI is agreed in writing before launch, so \"working\" isn't a matter of opinion. If the number isn't moving, we tell you what we're changing. If it still doesn't move, you leave. Month to month, no minimum term, no exit fee. The work has to earn next month. Every month.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-sand border-y py-8 sm:py-8 lg:py-8">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow subtitle">FAQs</span>
          <a className="mt-3 heading block">
            Straight answers before you spend.
          </a>
          <p className="black-text mt-3 subtitle">
            Still unsure? Send us your ad account and we will point at the leak for free.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border border-b">
                <AccordionTrigger className="py-5 text-left  hover:no-underline ">
<h6 className="block !normal-case">
  {f.q}
</h6>
                </AccordionTrigger>
                <AccordionContent className="black-text pb-5 subtitle leading-relaxed">
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
