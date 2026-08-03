"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { CounterStat } from "../types";
import { renderIcon } from "../icons";

type Props = {
  stat: CounterStat;
};

export default function Counter({ stat }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-black/5 bg-white/60 p-6 sm:p-8 text-center backdrop-blur-sm"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-highlight)]/15 text-[var(--color-highlight)]">
        {renderIcon(stat.icon, "w-6 h-6")}
      </div>
      <p className="stats-number !text-4xl sm:!text-5xl text-[var(--color-primary)] mb-2">
        {inView ? (
          <CountUp
            end={stat.value}
            duration={2}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix ?? ""}
          />
        ) : (
          `0${stat.suffix ?? ""}`
        )}
      </p>
      <p className="subtitle grey-text">{stat.label}</p>
    </div>
  );
}
