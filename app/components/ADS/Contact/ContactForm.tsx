import { contactForm } from "../data";
import LeadForm from "../common/LeadForm";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="container py-12 sm:py-16 lg:py-20 scroll-mt-24"
      aria-label="Contact form"
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <Reveal>
          <SectionHeading {...contactForm.heading} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/40 bg-white/55 p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
            <LeadForm content={contactForm.form} variant="contact" id="contact-form" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
