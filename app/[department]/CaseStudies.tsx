'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const cases = [
  {
    brand: 'Luxor E-commerce',
    industry: 'Premium Retail',
    description: 'Scaled their Meta Ads from ₹2L/mo to ₹15L/mo profitably while dropping CPA by 42%.',
    metrics: {
      budget: '₹15L/mo',
      leads: '4,200+',
      roas: '6.5X',
      growth: '+450%'
    },
    bg: 'bg-[var(--color-highlight)]/10'
  
  },
  {
    brand: 'TechFlow SaaS',
    industry: 'B2B Software',
    description: 'Restructured Google Search campaigns to capture high-intent enterprise leads, reducing junk leads to zero.',
    metrics: {
      budget: '₹8L/mo',
      leads: '850+ SQLs',
      roas: '8.2X',
      growth: '+320%'
    },
     bg: 'bg-[var(--color-highlight)]/10'
  }
];

export default function CaseStudies() {
  return (
    <section id="work" className="container py-10 sm:py-15 lg:py-20">
      <div className="">
        <div className="flex justify-center items-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full"
  >
    <div className="w-full text-center mb-2">
      <h6 className="inline-block text-black">
        Proof Is In The <span className="text-highlight">Metrics.</span>
      </h6>

      <p className="lg:mt-4 mt-1 max-w-4xl mx-auto text-black subtitle">
       We don't hide behind fluffy branding metrics. We show you exactly how much money we make for our partners.
      </p>
    </div>
  </motion.div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mt-10 mt-5 ">
          {cases.map((cs, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-[20px] p-5 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500  ${cs.bg}`}
            >
              <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-[20px] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>

              <div className="lg:mb-12 mb-6">
                <span className="inline-block px-4 py-1.5 bg-black rounded-[20px] subtitle text-highlight uppercase tracking-wider lg:mb-6 mb-3">
                  {cs.industry}
                </span>
                <span className="block text-primary font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2em] lg:mb-4 mb-2">{cs.brand}</span>
                <span className="block subtitle text-black max-w-lg">{cs.description}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-[20px]">
                <div>
                  <span className="block text-xs font-bold text-primary/40 uppercase mb-1">Ad Spend</span>
                  <span className="block text-primary text-xl font-[500]">{cs.metrics.budget}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary/40 uppercase mb-1">Results</span>
                  <span className="block font-[500] text-primary text-xl">{cs.metrics.leads}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary/40 uppercase mb-1">ROAS</span>
                  <span className="block font-[500] text-highlight text-xl">{cs.metrics.roas}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary/40 uppercase mb-1">Growth</span>
                  <span className="block font-[500] text-green-600 text-xl flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> {cs.metrics.growth}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
