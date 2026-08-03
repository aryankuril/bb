import { whyChooseUs, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Card from "../common/Card";
import Reveal from "../common/Reveal";
import { renderIcon } from "../icons";

export default function WhyChooseUs() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Why choose us">
      <Reveal>
        <SectionHeading {...sectionHeadings.whyChooseUs} className="mb-10" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {whyChooseUs.map((feature, index) => (
          <Reveal key={feature.id} delay={index * 0.07}>
            <Card className="h-full p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
                {renderIcon(feature.icon, "w-6 h-6")}
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="body2 grey-text">{feature.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
