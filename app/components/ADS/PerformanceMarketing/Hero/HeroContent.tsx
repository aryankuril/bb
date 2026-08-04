import { heroContent } from "../data";
import { LinkButton } from "../Shared";
export default function HeroContent() { return (
<div className="flex flex-col justify-center">
    <p className="mb-6 text-xs font-semibold uppercase tracking-[.22em] text-[#f7bf36]">{heroContent.eyebrow}</p>
    <h1 className="max-w-3xl  text-white">{heroContent.title}</h1>
    <p className="subtitle mt-7 max-w-xl text-white/65">{heroContent.body}</p>
    <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton cta={heroContent.primary} /><LinkButton cta={heroContent.secondary} invert />
        </div>
        <p className="mt-8 text-xs text-white/45">{heroContent.trust}</p>
        <div className="mt-7 flex gap-6 border-t border-white/15 pt-5">{heroContent.stats.map((stat) => <div key={stat.label}><strong className="block text-xl text-white">{stat.value}</strong><span className="text-[11px] uppercase tracking-wider text-white/45">{stat.label}</span></div>)}</div></div>); }
