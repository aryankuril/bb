import { testimonials, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Testimonials">
      <Reveal>
        <SectionHeading {...sectionHeadings.testimonials} className="mb-10" />
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 0.08}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
