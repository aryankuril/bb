import { industries, sectionHeadings } from "../data";
import SectionHeading from "../common/SectionHeading";
import Card from "../common/Card";
import Reveal from "../common/Reveal";
import { renderIcon } from "../icons";

export default function Industries() {
  return (
    <section className="container py-12 sm:py-16 lg:py-20" aria-label="Industries">
      <Reveal>
        <SectionHeading {...sectionHeadings.industries} className="mb-10" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((industry, index) => (
          <Reveal key={industry.id} delay={index * 0.06}>
            <Card className="h-full p-5 sm:p-6">
              <div className="mb-3 text-[var(--color-highlight)]">
                {renderIcon(industry.icon, "w-5 h-5")}
              </div>
              <h3 className="!text-xl mb-2">{industry.name}</h3>
              <p className="subtitle grey-text">{industry.summary}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
