"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";
import type { CTA, SectionCopy } from "./types";
export function Section({ copy, id, children, dark = false }: { copy: SectionCopy; id?: string; children?: ReactNode; dark?: boolean }) { return <section id={id} className={`${dark ? "bg-[#121212] text-white" : "bg-[#f7f6f2] text-[#171717]"} px-5 py-20 md:py-32`}><div className="container"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} className="max-w-4xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#d18a00]">{copy.eyebrow}</p><h2 className="max-w-4xl text-4xl font-medium tracking-[-.055em] md:text-7xl">{copy.title}</h2><p className="subtitle mt-7 max-w-2xl text-base leading-7 opacity-70">{copy.body}</p></motion.div>{children}</div></section> }
export function LinkButton({ cta, invert = false }: { cta: CTA; invert?: boolean }) { return <a href={cta.href} className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${invert ? "bg-white text-black" : "bg-[#f7bf36] text-black"}`}>{cta.label}<ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a> }
