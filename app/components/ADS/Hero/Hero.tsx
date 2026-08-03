import { heroContent } from "../data";
import HeroContent from "./HeroContent";
import HeroForm from "./HeroForm";

export default function Hero() {
  return (
    <section className="container py-12 sm:py-16 lg:py-24" aria-label="Hero">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <HeroContent content={heroContent} />
        <HeroForm content={heroContent.form} />
      </div>
    </section>
  );
}
