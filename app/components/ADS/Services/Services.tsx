import { sectionHeadings, services } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Services" id="services">
      <Reveal>
        <SectionHeading {...sectionHeadings.services} className="mb-10" />
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.08}>
            <ServiceCard service={service} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
