import type { ReactNode } from "react";
import type { IconKey } from "./types";

type IconProps = { className?: string };

const base = (className = "w-5 h-5") => className;

export const IconAward = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2l2.4 4.8 5.3.8-3.8 3.7 1 5.3L12 14.3 6.1 16.6l1-5.3L3.3 7.6l5.3-.8L12 2z"
      fill="currentColor"
    />
  </svg>
);

export const IconClock = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconChart = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 19V5M4 19h16M8 15V9M12 15V7M16 15v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconGlobe = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 12h18M12 3c2.5 2.8 4 6.1 4 9s-1.5 6.2-4 9c-2.5-2.8-4-6.1-4-9s1.5-6.2 4-9z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconRocket = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3c3 2 5 5.5 5 10a5 5 0 01-5 5 5 5 0 01-5-5c0-4.5 2-8 5-10z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 14l-2 5 3-1 3 1-2-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconShield = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconTarget = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const IconUsers = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21 19c0-2.2-1.6-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconZap = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconSearch = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconMegaphone = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 10v4h4l6 4V6L8 10H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M18 8a4 4 0 010 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconLayers = ({ className }: IconProps) => (
  <svg className={base(className)} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const iconMap: Record<IconKey, (props: IconProps) => ReactNode> = {
  award: IconAward,
  clock: IconClock,
  chart: IconChart,
  globe: IconGlobe,
  rocket: IconRocket,
  shield: IconShield,
  target: IconTarget,
  users: IconUsers,
  zap: IconZap,
  search: IconSearch,
  megaphone: IconMegaphone,
  layers: IconLayers,
};

export function renderIcon(key: IconKey, className?: string) {
  const Icon = iconMap[key];
  return <Icon className={className} />;
}
