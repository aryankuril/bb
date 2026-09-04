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
  "Require you to spend hours on audience, ideas and copywriting - instead you focus on building your business.",
  "Leave you unsure about your true return on investment and whether your paid spend is moving the needle.",
  "Aimlessly test with no proven system, like other agencies or freelancers.",
  "Leave you questioning what the next month will bring - growth or downturn.",
  "Provide false promises on results that can be achieved without any data analysis.",
];

const solutions = [
  "Go through data and tell you the projected ROAS for your brand and what we can do to scale.",
  "Leave you feeling confident that every dollar of advertising spend is being maximized",
  "Generate clear benchmarks and KPIs with in-depth, easy-to-digest reporting in real time.",
  "Allow you to focus on what really matters - your product and your customers.",
];

export default function Problems() {
  return (
    <section id="transformation" className="container py-6 sm:py-8 lg:py-8 relative overflow-hidden">
      <div className="relative z-10">

        <div className="text-center">
            <a className=" heading block black-text">
            What Happens When Ads Are{" "}
            <span className="text-highlight">
              Managed Incorrectly?
            </span>
          </a>
      
        </div>

<div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-stretch justify-center lg:mt-10 mt-5">
          {/* BAD SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
           className="border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 h-full relative overflow-hidden group hover:border-highlight/50 transition-colors" >
            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] black-text mb-8 border-b border-[#A1A1A1] pb-4">
              WHAT WE WON’T DO
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

         <div className="hidden lg:flex self-center items-center justify-center -mx-4 z-10 bg-white p-4 rounded-[30px] border border-primary/10 shrink-0">
  <ArrowRight className="w-8 h-8 text-primary" />
</div>
          {/* GOOD SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="  border border-[#A1A1A1] rounded-[20px] lg:p-8 p-4 md:p-12 w-full lg:w-1/2 relative overflow-hidden group hover:border-highlight/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/5 rounded-[20px] blur-3xl translate-x-1/3 -translate-y-1/3"></div>

            <span className="block font-outfit font-[500] text-[18px] lg:text-[25px] leading-[1.2] black-text mb-8 border-b border-[#A1A1A1] pb-4 relative z-10">
              WHAT WE WILL DO
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