'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { icon: Award, label: 'Projects Delivered', value: '100+' },
  { icon: TrendingUp, label: 'Managed Ad Spend', value: '₹20Cr+' },
  { icon: Users, label: 'Happy Clients', value: '150+' },
  { icon: Target, label: 'Average ROAS', value: '4X' },
];

export default function AboutUs() {
  return (
    <section className=" py-10 sm:py-15 lg:py-20 bg-black text-secondary relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-highlight)]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className=" container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left text */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[var(--color-highlight)] mb-6 font-medium uppercase tracking-widest text-sm">
<span className="w-3 h-3 rounded-full bg-[var(--color-highlight)] inline-block"></span>    
          About Our Agency
            </div>
            <h6 className="text-4xl md:text-5xl lg:text-5xl font-black mb-8 leading-tight text-secondary text-white">
              We engineer <span className="text-[var(--color-highlight)] bg-clip-text bg-gradient-to-r from-secondary to-secondary/50">digital outcomes</span>, not just websites.
            </h6>
            <div className="space-y-6 text-lg text-white ">
              <p>
                Founded by performance marketers and elite developers, we bridge the gap between stunning visual aesthetics and ruthless conversion rate optimization.
              </p>
              <p>
                Whether it’s an Awwwards-worthy WebGL experience or a complex Meta Ads funnel scaling past ₹10L/day, our dedicated experts operate as an extension of your growth team. No fluff. Just data, design, and revenue.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-secondary/5 border border-secondary/10 backdrop-blur-md rounded-[32px] p-8 hover:bg-secondary/10 hover:border-secondary/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-highlight)]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-highlight)] transition-all duration-300">
                <stat.icon className="w-7 h-7 text-[var(--color-highlight)] group-hover:text-black transition-colors" />
              </div>
              <div>
                <a className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</a>
                <p className="text-white font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
