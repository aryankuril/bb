"use client";

import { Outfit, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const problems = [
  "Just create better-looking creatives without strategy",
  "Add AI-generated copy with no brand voice or context",
  "Ignore the consumer journey and message relevance",
  "Skip funnel mapping - top, mid, and bottom of funnel",
  "Run ads without clear objectives or performance KPIs",
  "Treat all audiences the same with generic messaging",
  "Neglect A/B testing and creative iteration cycles",
];

const solutions = [
  "Build strategy-first creatives rooted in consumer insight",
  "Craft brand-consistent copy that speaks to real audience needs",
  "Map messaging to the consumer journey — awareness to conversion",
  "Design full-funnel strategies: top, mid, and bottom of funnel",
  "Set clear objectives and track performance KPIs from day one",
  "Segment audiences and tailor creative to each persona",
  "Run structured A/B tests and iterate based on data",
];

export default function Problems() {
  return (
    <section className="container mb-8 relative overflow-hidden">
      <div className="relative z-10">

        <div className="text-center">

           <a className="heading block black-text">
           Creative{" "}
            <span className="text-highlight">
              Approach
            </span>
          </a>
         
        
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-stretch justify-center lg:mt-10 mt-5">

          {/* BAD SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 h-full relative overflow-hidden group hover:border-highlight/50 transition-colors"
          >
            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] black-text mb-8 border-b border-[#A1A1A1] pb-4">
              WHAT WE DON’T DO
            </span>

            <ul className="space-y-6">
              {problems.map((prob, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 black-text subtitle"
                >
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  {prob}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ARROW */}
          <div className="hidden lg:flex self-center items-center justify-center -mx-4 z-10 bg-white p-4 rounded-[30px] border border-primary/10 shrink-0">
            <ArrowRight className="w-8 h-8 text-primary" />
          </div>

          {/* GOOD SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 relative overflow-hidden group hover:border-highlight/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/5 rounded-[20px] blur-3xl translate-x-1/3 -translate-y-1/3"></div>

            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] black-text mb-8 border-b border-[#A1A1A1] pb-4 relative z-10">
              WHAT WE DO
            </span>

            <ul className="space-y-6 relative z-10">
              {solutions.map((sol, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 black-text subtitle"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  {sol}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}