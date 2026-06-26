'use client';
import { Outfit, Poppins } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const webProcess = [
  { num: '01', title: 'Discovery Call', desc: 'Aligning on business goals and requirements.' },
  { num: '02', title: 'Research & Planning', desc: 'Competitor analysis and site architecture.' },
  { num: '03', title: 'UI/UX Design', desc: 'Mapping user journeys & high-fidelity mockups.' },
  { num: '04', title: 'Development', desc: 'Building on blazing-fast modern stacks.' },
  { num: '05', title: 'Testing & QA', desc: 'Rigorous cross-device testing.' },
  { num: '06', title: 'Deployment', desc: 'Seamless handoff to production.' },
  { num: '07', title: 'Maintenance', desc: 'Monthly retainer for speed & security.' },
];

const pmProcess = [
  { num: '01', title: 'Business Analysis', desc: 'Auditing your current funnel bottlenecks.' },
  { num: '02', title: 'Competitor Intel', desc: 'Reverse-engineering rival strategies.' },
  { num: '03', title: 'Audience Matrix', desc: 'Deep-dive demographic and intent targeting.' },
  { num: '04', title: 'Campaign Setup', desc: 'Structuring Pixel, CAPI, and tracking tags.' },
  { num: '05', title: 'Creative Testing', desc: 'Deploying hook-driven organic-style ads.' },
  { num: '06', title: 'Optimization', desc: 'Daily bid adjustment based on live ROAS.' },
  { num: '07', title: 'Scaling', desc: 'Vertical scaling constraints unlocked.' },
];

export default function ProcessCombined() {
  const [activeTab, setActiveTab] = useState<'web' | 'pm'>('pm');

  const currentProcess = activeTab === 'web' ? webProcess : pmProcess;

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#f7f7f7] relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-primary mb-6 tracking-tight leading-none"
          >
            How We <span className="text-highlight">Execute.</span>
          </motion.h2>
          <span className={`block ${poppins.className} text-lg text-primary/60 max-w-2xl mx-auto mb-10`}>
            Transparency is everything. Here is the exact playbook we use to generate predictable results.
          </span>

          {/* Custom Toggle Switch */}
          <div className="inline-flex bg-white p-2 rounded-full border border-primary/10 shadow-sm relative z-10 w-full max-w-md mx-auto h-[60px] md:h-16">
            <button
               onClick={() => setActiveTab('web')}
               className={clsx(
                 "flex-1 rounded-full font-bold text-sm md:text-base relative z-10 transition-colors duration-300",
                 activeTab === 'web' ? "text-secondary" : "text-primary/60 hover:text-primary"
               )}
            >
               Website Dev
            </button>
            <button
               onClick={() => setActiveTab('pm')}
               className={clsx(
                 "flex-1 rounded-full font-bold text-sm md:text-base relative z-10 transition-colors duration-300",
                 activeTab === 'pm' ? "text-secondary" : "text-primary/60 hover:text-primary"
               )}
            >
               Performance Marketing
            </button>
            
            {/* Sliding Pill */}
            <motion.div 
               animate={{ x: activeTab === 'web' ? 0 : '100%' }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] bg-primary rounded-full shadow-lg z-0"
            />
          </div>
        </div>

        <div className="relative mt-24">
          <AnimatePresence mode="wait">
             <motion.div 
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
               className="relative"
             >
                {/* Horizontal Line Desktop */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-primary/5 hidden lg:block rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-highlight relative rounded-full"
                  />
                </div>

                {/* Vertical Line Mobile */}
                <div className="absolute left-3.5 top-0 bottom-0 w-1 bg-highlight lg:hidden rounded-full opacity-30"></div>

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-4 relative z-10 pl-12 lg:pl-0">
                  {currentProcess.map((step, i) => (
                    <div key={i} className="relative group">
                      {/* Mobile Node */}
                      <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full border-4 border-[#f7f7f7] bg-highlight lg:hidden shadow-sm"></div>
                      
                      {/* Desktop Node */}
                      <div className="hidden lg:flex w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm items-center justify-center font-black text-primary/30 mx-auto mb-6 group-hover:border-highlight group-hover:text-highlight transition-all relative z-10 bg-clip-padding group-hover:-translate-y-1 group-hover:shadow-lg">
                        {step.num}
                      </div>

                      <div className="lg:text-center mt-2 lg:mt-0 bg-white lg:bg-transparent p-5 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-primary/5 lg:border-none">
                        <span className={`block ${outfit.className} text-xl lg:text-lg font-bold text-primary mb-2 flex items-center gap-2 lg:justify-center`}>
                          <span className="lg:hidden text-highlight font-black text-sm">{step.num}</span> 
                          {step.title}
                        </span>
                        <span className={`block ${poppins.className} text-sm text-primary/60`}>{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
