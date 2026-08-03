import type { ReactNode } from "react";

export type IconKey =
  | "award"
  | "clock"
  | "chart"
  | "globe"
  | "rocket"
  | "shield"
  | "target"
  | "users"
  | "zap"
  | "search"
  | "megaphone"
  | "layers";

export type Stat = {
  icon: IconKey;
  value: string;
  label: string;
  suffix?: string;
};

export type CounterStat = {
  id: string;
  icon: IconKey;
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
};

export type ServiceCard = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  cta: string;
  icon: IconKey;
};

export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  body: string;
  icon: IconKey;
};

export type FeatureCard = {
  id: string;
  title: string;
  body: string;
  icon: IconKey;
};

export type Industry = {
  id: string;
  name: string;
  summary: string;
  icon: IconKey;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

export type FAQItemData = {
  id: string;
  question: string;
  answer: string;
};

export type SectionHeading = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
};

export type HeroContent = {
  eyebrow: string;
  title: ReactNode;
  description: string[];
  cta: string;
  ctaHref: string;
  trustBadges: string[];
  stats: Stat[];
  form: FormContent;
};

export type FormFieldKey = "name" | "phone" | "email" | "brand";

export type FormField = {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
};

export type FormContent = {
  title: string;
  subtitle: string;
  fields: Record<FormFieldKey, FormField>;
  submit: string;
  loading: string;
  success: string;
  errorGeneric: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
  };
};

export type WhyBombayBlokesContent = {
  eyebrow: string;
  title: ReactNode;
  body: string[];
  cta: string;
  ctaHref: string;
  stats: Stat[];
};

export type PageSectionContent = {
  eyebrow: string;
  title: ReactNode;
  body: string[];
  cta: string;
  stats?: Stat[];
};

export type TrustedByContent = {
  heading: SectionHeading;
  logos: string[];
  stats: Stat[];
};

export type FinalCTAContent = {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  cta: string;
  ctaHref: string;
  bullets: string[];
};

export type FooterCTAContent = {
  brand: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  links: { label: string; href: string }[];
  copyright: string;
};

export type ContactSectionContent = {
  heading: SectionHeading;
  form: FormContent;
};

export type StickyCTAContent = {
  text: string;
  cta: string;
  ctaHref: string;
};

export type LandingPageMeta = {
  title: string;
  description: string;
};
