import type { ServiceCard as ServiceCardType } from "../types";
import Card from "../common/Card";
import Button from "../common/Button";
import { renderIcon } from "../icons";

type Props = {
  service: ServiceCardType;
  index: number;
};

export default function ServiceCard({ service, index }: Props) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-8">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
        {renderIcon(service.icon, "w-6 h-6")}
      </div>

      <span className="subtitle text-[var(--color-grey)] mb-2">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mb-3">{service.title}</h3>
      <p className="body2 grey-text mb-5 flex-1">{service.summary}</p>

      <ul className="space-y-2 mb-6">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="subtitle flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-highlight)]" />
            {bullet}
          </li>
        ))}
      </ul>

      <Button text={service.cta} href="#contact" ariaLabel={service.cta} />
    </Card>
  );
}
