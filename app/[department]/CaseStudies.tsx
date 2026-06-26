'use client';
import { Outfit, Poppins } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });


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
    bg: "bg-gray-100"
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
              className={`rounded-[32px] p-5 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-primary/5 ${cs.bg}`}
            >
              <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>

              <div className="mb-12">
                <span className="inline-block px-4 py-1.5 bg-white rounded-full text-xs font-bold text-primary/60 uppercase tracking-wider mb-6">
                  {cs.industry}
                </span>
                <h6 className={`block ${outfit.className}  text-primary lg:mb-4 mb-2`}>{cs.brand}</h6>
                <span className={`block ${poppins.className} subtitle text-black max-w-md`}>{cs.description}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl">
                <div>
                  <span className={`block ${poppins.className} text-xs font-bold text-primary/40 uppercase mb-1`}>Ad Spend</span>
                  <span className={`block ${poppins.className} font-black text-primary text-xl`}>{cs.metrics.budget}</span>
                </div>
                <div>
                  <span className={`block ${poppins.className} text-xs font-bold text-primary/40 uppercase mb-1`}>Results</span>
                  <span className={`block ${poppins.className} font-black text-primary text-xl`}>{cs.metrics.leads}</span>
                </div>
                <div>
                  <span className={`block ${poppins.className} text-xs font-bold text-primary/40 uppercase mb-1`}>ROAS</span>
                  <span className={`block ${poppins.className} font-black text-highlight text-xl`}>{cs.metrics.roas}</span>
                </div>
                <div>
                  <span className={`block ${poppins.className} text-xs font-bold text-primary/40 uppercase mb-1`}>Growth</span>
                  <span className={`block ${poppins.className} font-black text-green-600 text-xl flex items-center gap-1`}>
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
