import { process, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import ProcessCard from "./ProcessCard";

export default function Process() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Our process">
      <Reveal>
        <SectionHeading {...sectionHeadings.process} className="mb-10" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
        {process.map((step, index) => (
          <Reveal key={step.id} delay={index * 0.1}>
            <ProcessCard step={step} isLast={index === process.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
