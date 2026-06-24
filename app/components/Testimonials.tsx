"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Naman Ajmera",
    role: "Founder, JK Diamonds Institute",
    text: "The brand started seeing more orders every single day. They understood our market, built the right strategy, and actually executed it. One of the few agencies that thinks about revenue, not just metrics.",
    initials: "NA",
  },
  {
    name: "Keval Shah",
    role: "Owner, SCS Sports",
    text: "Month-end stress disappeared because targets were hit early. Performance stayed consistent and results kept improving. The team is always two steps ahead and never needs chasing.",
    initials: "KS",
  },
  {
    name: "Shaurya Modi",
    role: "Founder, DNM Sports",
    text: "Customers found the brand through our content and felt genuinely connected. The storytelling approach made all the difference. We stopped shouting and started being heard.",
    initials: "SM",
  },
  {
    name: "Aryan Kuril",
    role: "Founder, Dancing Leaf Tea",
    text: "Engagement increased and enquiries stopped dropping midway. The brand feels inviting now. They brought warmth and clarity to every piece of content they touched.",
    initials: "AK",
  },
  {
    name: "Manish Shah",
    role: "MD, Manba Finance",
    text: "Fresh ideas brought new attention and interactions increased across every platform. Finally an agency that delivers on what it promises and keeps raising the bar.",
    initials: "MS",
  },
  {
    name: "Rohit Chhedda",
    role: "Owner, Carron Clothing",
    text: "Orders started increasing every single day, showing clear and consistent growth. The team understood our business goals from day one and never lost sight of them.",
    initials: "RC",
  },
  {
    name: "Harsh Saraf",
    role: "MD, Supersox",
    text: "Performance stayed consistent and results improved month after month. They treat the business like their own and bring that energy to every campaign they run.",
    initials: "HS",
  },
  {
    name: "Pranav Bimbhat",
    role: "Founder, FirstEdge",
    text: "Customers found the brand through our content and felt truly connected. Their content strategy is sharp, intentional, and built for the long term.",
    initials: "PB",
  },
];

const avatarColors = [
  "bg-[#FAB31E]",
  "bg-[#e8a012]",
  "bg-[#f5c842]",
  "bg-[#FAB31E]",
  "bg-[#e8a012]",
  "bg-[#f5c842]",
  "bg-[#FAB31E]",
  "bg-[#e8a012]",
];

const Stars = (_: { dark?: boolean }) => (
  <div className="flex gap-1 mb-5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FAB31E">
        <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const n = testimonials.length;
  const [center, setCenter] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setCenter((c) => (c + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  const prev = (center - 1 + n) % n;
  const next = (center + 1) % n;

  const Card = ({
    index,
    featured,
  }: {
    index: number;
    featured: boolean;
  }) => {
    const t = testimonials[index];
    return (
      <div
        className={`rounded-[24px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 h-full ${
          featured
            ? "bg-[var(--color-primary)] shadow-xl"
            : "bg-white border border-[rgba(10,10,10,.08)] shadow-sm"
        }`}
      >
        <div>
          <Stars dark={featured} />
          <p
            className={`font-['Poppins'] text-[15.5px] leading-[1.65] ${
              featured ? "text-white" : "text-[#2a2a2a]"
            }`}
          >
            "{t.text}"
          </p>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${avatarColors[index]}`}
          >
            <span className="font-['Poppins'] font-bold text-[13px] text-black">
              {t.initials}
            </span>
          </div>
          <div>
            <p
              className={`font-['Poppins'] font-semibold text-[14px] ${
                featured ? "text-white" : "text-[#0a0a0a]"
              }`}
            >
              {t.name}
            </p>
            <p
              className={`font-['Poppins'] text-[12.5px] ${
                featured ? "text-[rgba(255,255,255,0.55)]" : "text-[#888]"
              }`}
            >
              {t.role}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-10 sm:py-15 lg:py-20">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="black-text">
          Trusted By <span className="text-highlight">200+</span> Companies
        </h2>
      </div>

      {/* Desktop: 3-col grid — fixed height prevents layout shift on rotate */}
      <div className="hidden md:grid grid-cols-3 gap-5 h-[360px]">
        <Card index={prev} featured={false} />
        <Card index={center} featured={true} />
        <Card index={next} featured={false} />
      </div>

      {/* Mobile: single center card */}
      <div className="md:hidden min-h-[340px]">
        <Card index={center} featured={true} />
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCenter(i)}
            className={`rounded-full transition-all duration-300 ${
              i === center
                ? "w-6 h-2.5 bg-[var(--color-highlight)]"
                : "w-2.5 h-2.5 bg-[rgba(10,10,10,0.2)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
