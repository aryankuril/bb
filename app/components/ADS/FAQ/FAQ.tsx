"use client";

import { useState } from "react";
import { faq, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import FAQItem from "./FAQItem";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="FAQ">
      <Reveal>
        <SectionHeading {...sectionHeadings.faq} className="mb-10" />
      </Reveal>

      <div className="max-w-3xl space-y-3">
        {faq.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <FAQItem
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
