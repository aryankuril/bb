import type { Stat } from "../types";
import { renderIcon } from "../icons";

type Props = {
  stat: Stat;
};

export default function StatsCard({ stat }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/60 p-5 backdrop-blur-sm text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
        {renderIcon(stat.icon, "w-5 h-5")}
      </div>
      <p className="body1 !text-3xl font-medium leading-none mb-1">{stat.value}</p>
      <p className="subtitle grey-text">{stat.label}</p>
    </div>
  );
}
