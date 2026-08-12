"use client";

import { Reveal } from "../../hooks/use-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const faqs = [
  {
    q: "What does a social media marketing agency actually do?",
    a: "We own your social presence end to end: strategy and content pillars, creative direction, photo and reel production, publishing, community management and monthly reporting. You approve, we ship.",
  },
  {
    q: "How much does social media management cost in Mumbai?",
    a: "Retainers typically start around ₹60,000 a month for a single-platform content and management scope, and scale with shoot volume, platforms and creator work. We quote after the free audit so the number matches the actual output.",
  },
  {
    q: "Is this organic social or paid social?",
    a: "The core of what we do is organic — strategy, content, storytelling and engagement. Paid social is a supporting layer we use to amplify posts that already perform, never a replacement for a real content system.",
  },
  {
    q: "Which platforms do you manage?",
    a: "Instagram, YouTube Shorts, LinkedIn, Facebook and Pinterest are the usual mix. We recommend platforms based on where your buyers actually spend time rather than covering all of them thinly.",
  },
  {
    q: "Do you produce the content or do we send it?",
    a: "We produce it. Shoots, reels, motion graphics and design happen in-house at our Mumbai studio, with a monthly batch shoot plus reactive content through the month.",
  },
  {
    q: "How quickly will we see results?",
    a: "Expect a visibly better grid within the first month, meaningful reach and engagement movement by month two to three, and compounding growth from there as the content library builds.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="container px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="text-eyebrow subtitle">FAQ</p>
            <a className="mt-4 heading block">
            Straight answers before you spend.
          </a>
          <p className="mt-5 text-muted-foreground subtitle">
            Still unsure? Send us your handle and we'll tell you honestly whether you need an agency
            yet.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-5 text-left  hover:no-underline ">
<span
  className="block text-[20px] leading-[1.2] sm:text-[24px] lg:text-[25px]"
  style={{
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontWeight: 800,
  }}
>
  {f.q}
</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 subtitle leading-relaxed">
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
