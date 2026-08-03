import { results, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import Counter from "./Counter";

export default function Results() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Results">
      <Reveal>
        <SectionHeading {...sectionHeadings.results} align="center" className="mb-10" />
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {results.map((stat, index) => (
          <Reveal key={stat.id} delay={index * 0.08}>
            <Counter stat={stat} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
