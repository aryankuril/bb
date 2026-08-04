import HeroContent from "./HeroContent";
import HeroForm from "./HeroForm";
export default function Hero() { return <section className="relative overflow-hidden bg-[#111] px-5 py-20 md:py-28"><div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#f7bf36]/20 blur-[110px]" /><div className="container relative grid gap-14 lg:grid-cols-[1.25fr_.75fr]"><HeroContent /><HeroForm /></div></section> }
