import type { ProcessStep as ProcessStepType } from "../types";
import Card from "../common/Card";
import { renderIcon } from "../icons";

type Props = {
  step: ProcessStepType;
  isLast: boolean;
};

export default function ProcessCard({ step, isLast }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      <Card className="w-full p-6 sm:p-8 text-center" hover>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
          {renderIcon(step.icon, "w-7 h-7")}
        </div>
        <p className="subtitle text-[var(--color-highlight)] mb-2">{step.step}</p>
        <h3 className="mb-3">{step.title}</h3>
        <p className="body2 grey-text">{step.body}</p>
      </Card>

      {!isLast && (
        <div className="hidden lg:flex absolute -right-8 top-1/2 -translate-y-1/2 text-[var(--color-highlight)] text-2xl z-10">
          ↓
        </div>
      )}
    </div>
  );
}
