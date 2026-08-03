import type {
  ContactSectionContent,
  FAQItemData,
  FeatureCard,
  FinalCTAContent,
  FooterCTAContent,
  FormContent,
  HeroContent,
  Industry,
  LandingPageMeta,
  ProcessStep,
  SectionHeading,
  ServiceCard,
  StickyCTAContent,
  Testimonial,
  TrustedByContent,
  WhyBombayBlokesContent,
  CounterStat,
  PageSectionContent,
} from "./types";

export const landingPageMeta: LandingPageMeta = {
  title: "Bombay Blokes — Digital Growth Agency Mumbai",
  description:
    "Premium website development, performance marketing, SEO and social media marketing agency in Mumbai. Get a free audit from Google Ads and Meta Ads experts.",
};

const sharedFormValidation = {
  nameRequired: "Please enter your name.",
  emailRequired: "Please enter your email address.",
  emailInvalid: "Please enter a valid email address.",
  phoneRequired: "Please enter your phone number.",
};

export const sharedLeadForm: FormContent = {
  title: "Get Your Free Audit",
  subtitle: "Share a few details and our team will send a tailored growth audit within 24 hours.",
  fields: {
    name: { label: "Name", placeholder: "Your full name", required: true },
    phone: { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", required: true },
    email: { label: "Email Address", placeholder: "you@company.com", type: "email", required: true },
    brand: {
      label: "Your Brand Name / Website / Instagram Link",
      placeholder: "Brand, website URL or Instagram handle",
      required: false,
    },
  },
  submit: "Get Free Audit",
  loading: "Sending...",
  success: "Thank you! Your audit request is in. We'll reach out within 24 hours.",
  errorGeneric: "Something went wrong. Please try again or call us directly.",
  validation: sharedFormValidation,
};

export const heroContent: HeroContent = {
  eyebrow: "MUMBAI'S PERFORMANCE-FOCUSED DIGITAL AGENCY",
  title: (
    <>
      Grow Faster With A{" "}
      <span className="text-[var(--color-highlight)]">Premium Digital Partner</span> Built For
      Revenue
    </>
  ),
  description: [
    "Bombay Blokes is a web development and performance marketing agency in Mumbai helping ambitious brands scale with Website Development, Google Ads, Meta Ads, SEO and Social Media Marketing.",
    "From custom website development and Shopify ecommerce builds to full-funnel paid acquisition — we engineer growth systems, not vanity metrics.",
  ],
  cta: "Get Free Audit",
  ctaHref: "#contact",
  trustBadges: [
    "Google Partner",
    "Meta Business Partner",
    "50+ Brands Scaled",
    "10+ Years Experience",
  ],
  stats: [
    { icon: "award", value: "10+", label: "Years of Experience" },
    { icon: "users", value: "50+", label: "Brands Worked With" },
    { icon: "chart", value: "4.2x", label: "Average ROAS" },
    { icon: "rocket", value: "120+", label: "Campaigns Launched" },
  ],
  form: sharedLeadForm,
};

export const trustedBy: TrustedByContent = {
  heading: {
    eyebrow: "TRUSTED BY GROWTH-FOCUSED BRANDS",
    title: (
      <>
        Brands That Trust{" "}
        <span className="text-[var(--color-highlight)]">Bombay Blokes</span>
      </>
    ),
    subtitle:
      "From D2C and ecommerce to SaaS and enterprise — we partner with teams that demand measurable results.",
  },
  logos: [
    "/images/logo/LOGO(1).png",
    "/images/logo/LOGO(2).png",
    "/images/logo/LOGO(3).png",
    "/images/logo/LOGO(4).png",
    "/images/logo/LOGO(5).png",
    "/images/logo/LOGO(6).png",
    "/images/logo/LOGO(7).png",
    "/images/logo/LOGO(8).png",
    "/images/logo/LOGO(9).png",
    "/images/logo/LOGO(10).png",
    "/images/logo/LOGO(11).png",
    "/images/logo/LOGO(12).png",
    "/images/logo/LOGO(13).png",
    "/images/logo/LOGO(14).png",
    "/images/logo/LOGO(15).png",
    "/images/logo/LOGO(16).png",
    "/images/logo/LOGO(17).png",
    "/images/logo/LOGO(18).png",
    "/images/logo/LOGO(19).png",
    "/images/logo/LOGO(20).png",
  ],
  stats: [
    { icon: "chart", value: "₹50Cr+", label: "Ad Spend Managed" },
    { icon: "globe", value: "12+", label: "Industries Served" },
    { icon: "target", value: "98%", label: "Client Retention" },
  ],
};

export const sectionHeadings = {
  services: {
    eyebrow: "OUR SERVICES",
    title: (
      <>
        Full-Stack Digital Growth —{" "}
        <span className="text-[var(--color-highlight)]">One Partner</span>
      </>
    ),
    subtitle:
      "Website development, performance marketing, SEO and social media — engineered to convert traffic into revenue.",
  } satisfies SectionHeading,
  whyBombayBlokes: {
    eyebrow: "WHY BOMBAY BLOKES",
    title: (
      <>
        We Engineer{" "}
        <span className="text-[var(--color-highlight)]">Growth Systems</span> Not Just
        Campaigns
      </>
    ),
    subtitle:
      "A professional web development company and performance marketing agency built for brands that want compounding results.",
  } satisfies SectionHeading,
  process: {
    eyebrow: "OUR PROCESS",
    title: (
      <>
        From Discovery To{" "}
        <span className="text-[var(--color-highlight)]">Scale</span>
      </>
    ),
    subtitle: "A proven framework that turns strategy into measurable revenue growth.",
  } satisfies SectionHeading,
  whyChooseUs: {
    eyebrow: "WHY CHOOSE BOMBAY BLOKES",
    title: (
      <>
        The Partner{" "}
        <span className="text-[var(--color-highlight)]">Growth Teams</span> Trust
      </>
    ),
    subtitle:
      "Senior strategists, performance creatives, and developers — aligned to your business outcomes.",
  } satisfies SectionHeading,
  industries: {
    eyebrow: "INDUSTRIES WE SERVE",
    title: (
      <>
        Built For{" "}
        <span className="text-[var(--color-highlight)]">Every Vertical</span>
      </>
    ),
    subtitle: "Deep expertise across ecommerce, SaaS, retail, healthcare, finance and more.",
  } satisfies SectionHeading,
  results: {
    eyebrow: "RESULTS THAT MATTER",
    title: (
      <>
        Numbers That{" "}
        <span className="text-[var(--color-highlight)]">Prove It</span>
      </>
    ),
    subtitle: "Real outcomes from real partnerships — not vanity dashboards.",
  } satisfies SectionHeading,
  testimonials: {
    eyebrow: "CLIENT STORIES",
    title: (
      <>
        What Our{" "}
        <span className="text-[var(--color-highlight)]">Clients Say</span>
      </>
    ),
    subtitle: "Trusted by founders, CMOs and growth leaders across India.",
  } satisfies SectionHeading,
  faq: {
    eyebrow: "FAQ",
    title: (
      <>
        Frequently Asked{" "}
        <span className="text-[var(--color-highlight)]">Questions</span>
      </>
    ),
    subtitle: "Everything you need to know before your free audit.",
  } satisfies SectionHeading,
};

export const services: ServiceCard[] = [
  {
    id: "website-development",
    title: "Website Development",
    summary:
      "As a web design and development agency, we build fast, conversion-focused websites and Shopify stores that turn visitors into customers.",
    bullets: [
      "Custom website development & Shopify ecommerce development",
      "Professional web development company standards — Core Web Vitals optimised",
      "Website development near me? We're Mumbai-based with global delivery",
    ],
    cta: "Get Free Audit",
    icon: "layers",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    summary:
      "Our performance marketing agency in Mumbai runs Google Ads, Meta Ads and Amazon campaigns focused on ROAS, CAC and revenue.",
    bullets: [
      "Google Ads expert & Meta Ads expert team",
      "Performance marketing services across search, social & marketplaces",
      "Google advertising agency with full-funnel attribution",
    ],
    cta: "Get Free Audit",
    icon: "megaphone",
  },
  {
    id: "seo",
    title: "SEO",
    summary:
      "An SEO agency Mumbai brands trust for Technical SEO, Local SEO, Ecommerce SEO, GEO, AEO and AI SEO strategies.",
    bullets: [
      "Technical SEO, Local SEO & Ecommerce SEO",
      "Google AI Overview Optimization & Organic Traffic Growth",
      "GEO & AEO for next-gen search visibility",
    ],
    cta: "Get Free Audit",
    icon: "search",
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    summary:
      "End-to-end social media marketing agency services — from Instagram marketing to LinkedIn marketing and paid social.",
    bullets: [
      "Social media management agency for Instagram, Facebook & LinkedIn",
      "Social media experts for creative, content & paid amplification",
      "Full social media marketing company capabilities",
    ],
    cta: "Get Free Audit",
    icon: "users",
  },
];

export const whyBombayBlokes: WhyBombayBlokesContent = {
  eyebrow: "WHY BOMBAY BLOKES",
  title: (
    <>
      We Engineer{" "}
      <span className="text-[var(--color-highlight)]">Websites That Perform</span> Not Just
      Websites That Exist
    </>
  ),
  body: [
    "Most agencies deliver deliverables. We deliver revenue. As a website development company and performance marketing agency, we combine custom website development with data-driven paid and organic growth.",
    "Whether you need Shopify website development, a Google Ads marketing agency, or an SEO agency Mumbai businesses rely on — Bombay Blokes is your single growth partner.",
    "Every engagement starts with a free audit. We identify leaks in your funnel, fix what is broken, and build systems that scale.",
  ],
  cta: "Get Free Audit",
  ctaHref: "#contact",
  stats: [
    { icon: "award", value: "10+", label: "Years of Experience" },
    { icon: "users", value: "50+", label: "Brands Worked With" },
    { icon: "chart", value: "4.2x", label: "Average ROAS" },
    { icon: "shield", value: "98%", label: "Client Retention" },
  ],
};

export const process: ProcessStep[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery",
    body: "Deep audit of your website, ads, SEO and social. We map gaps, competitors and quick wins aligned to revenue KPIs.",
    icon: "search",
  },
  {
    id: "strategy",
    step: "02",
    title: "Strategy",
    body: "Channel mix, messaging, creative direction and roadmap. Every tactic tied to measurable business outcomes.",
    icon: "target",
  },
  {
    id: "execution",
    step: "03",
    title: "Execution",
    body: "Launch campaigns, ship websites, publish content. Fast iteration with weekly performance reviews.",
    icon: "rocket",
  },
  {
    id: "scale",
    step: "04",
    title: "Scale",
    body: "Double down on winners, automate reporting, expand channels. Sustainable compounding growth.",
    icon: "chart",
  },
];

export const whyChooseUs: FeatureCard[] = [
  {
    id: "senior-team",
    title: "Senior-Led, Not Junior-Staffed",
    body: "Your account is led by strategists with 10+ years across web development, Google Ads and SEO — not handed off to juniors.",
    icon: "users",
  },
  {
    id: "full-stack",
    title: "Full-Stack Growth Partner",
    body: "Website development, performance marketing, SEO and social under one roof. No silos, no finger-pointing.",
    icon: "layers",
  },
  {
    id: "data-driven",
    title: "Revenue-First Reporting",
    body: "We track ROAS, CAC, LTV and conversion rates — not impressions and vanity metrics.",
    icon: "chart",
  },
  {
    id: "speed",
    title: "Speed To Market",
    body: "Launch-ready websites in weeks, not months. Campaigns live within days of onboarding.",
    icon: "zap",
  },
  {
    id: "transparent",
    title: "Transparent Communication",
    body: "Weekly reports, Slack access, and direct lines to your strategist. No black-box agency behaviour.",
    icon: "shield",
  },
  {
    id: "local-global",
    title: "Mumbai Roots, Global Standards",
    body: "A performance marketing agency in Mumbai with enterprise-grade processes and premium creative quality.",
    icon: "globe",
  },
];

export const industries: Industry[] = [
  { id: "ecommerce", name: "Ecommerce & D2C", summary: "Shopify ecommerce development, Amazon advertising & conversion optimisation", icon: "layers" },
  { id: "saas", name: "SaaS & Technology", summary: "Landing pages, Google Ads agency campaigns & product-led growth", icon: "rocket" },
  { id: "retail", name: "Retail & FMCG", summary: "Local SEO, Meta Ads & omnichannel performance marketing", icon: "target" },
  { id: "healthcare", name: "Healthcare & Wellness", summary: "Compliant campaigns, local visibility & trust-building content", icon: "shield" },
  { id: "finance", name: "Finance & Fintech", summary: "High-intent Google advertising & conversion-focused web development", icon: "chart" },
  { id: "education", name: "Education & EdTech", summary: "Lead generation, social media management & funnel optimisation", icon: "globe" },
  { id: "hospitality", name: "Hospitality & Travel", summary: "Seasonal campaigns, Instagram marketing & booking conversions", icon: "megaphone" },
  { id: "real-estate", name: "Real Estate", summary: "Local SEO, Meta lead ads & premium website development", icon: "search" },
];

export const results: CounterStat[] = [
  { id: "years", icon: "award", value: 10, suffix: "+", label: "Years of Experience" },
  { id: "brands", icon: "users", value: 50, suffix: "+", label: "Brands Worked With" },
  { id: "roas", icon: "chart", value: 4.2, suffix: "x", label: "Average ROAS", decimals: 1 },
  { id: "traffic", icon: "rocket", value: 180, suffix: "%", label: "Avg. Organic Traffic Growth" },
  { id: "spend", icon: "target", value: 50, suffix: "Cr+", label: "Ad Spend Managed (INR)" },
  { id: "retention", icon: "shield", value: 98, suffix: "%", label: "Client Retention Rate" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Bombay Blokes rebuilt our Shopify store and doubled conversion rates in 90 days. Their web development agency approach is genuinely performance-first.",
    author: "Asha Patel",
    role: "Head of Ecommerce",
    company: "RetailCo",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "As our Google Ads marketing agency, they scaled ROAS from 2.1x to 5.4x while reducing CAC. Best performance marketing services we've used.",
    author: "Rohit Mehra",
    role: "Marketing Lead",
    company: "SaaSCo",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Their SEO agency Mumbai team delivered 3x organic traffic in 6 months with Technical SEO and content. Genuinely expert-level work.",
    author: "Priya Sharma",
    role: "Founder",
    company: "WellnessBrand",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Our social media marketing company of choice. Instagram marketing and paid social now drive 40% of our revenue.",
    author: "Karan Desai",
    role: "CMO",
    company: "D2C Fashion",
    rating: 5,
  },
];

export const faq: FAQItemData[] = [
  {
    id: "f1",
    question: "What services does Bombay Blokes offer?",
    answer:
      "We are a full-service digital agency offering Website Development, Performance Marketing (Google Ads, Meta Ads, Amazon Ads), SEO (Technical SEO, Local SEO, Ecommerce SEO, AI SEO) and Social Media Marketing. Every service is built for lead generation and revenue growth.",
  },
  {
    id: "f2",
    question: "Do you offer Shopify website development?",
    answer:
      "Yes. Shopify ecommerce development is one of our core strengths. We build custom Shopify stores optimised for conversion, speed and Core Web Vitals — from theme customisation to full headless builds.",
  },
  {
    id: "f3",
    question: "Are you a performance marketing agency in Mumbai?",
    answer:
      "Yes. We are a performance marketing agency based in Mumbai serving local and global clients. Our Google Ads expert and Meta Ads expert teams manage full-funnel paid acquisition with ROAS-focused optimisation.",
  },
  {
    id: "f4",
    question: "How is Bombay Blokes different from other web development agencies?",
    answer:
      "We combine custom website development with performance marketing and SEO under one roof. Most web design and development agencies stop at launch — we engineer sites for conversions and scale them with data-driven growth.",
  },
  {
    id: "f5",
    question: "Do you provide SEO agency Mumbai services for local businesses?",
    answer:
      "Absolutely. Our Local SEO, Technical SEO and Google AI Overview Optimization services help Mumbai and pan-India businesses dominate local and organic search results.",
  },
  {
    id: "f6",
    question: "What is included in the free audit?",
    answer:
      "Our free audit covers your website performance, ad account health, SEO visibility and social presence. You'll receive actionable recommendations and a custom growth roadmap within 24 hours.",
  },
  {
    id: "f7",
    question: "What budgets do you work with for Google Ads and Meta Ads?",
    answer:
      "We work with startups spending ₹50K/month to enterprises managing ₹50L+ monthly ad spend. Our performance marketing services scale with your business.",
  },
  {
    id: "f8",
    question: "Do you handle social media management for brands?",
    answer:
      "Yes. As a social media management agency, we handle content strategy, community management, Instagram marketing, Facebook marketing, LinkedIn marketing and paid social amplification.",
  },
  {
    id: "f9",
    question: "How quickly can you launch a new website?",
    answer:
      "Most custom website development projects launch in 4–8 weeks depending on scope. Shopify builds can go live in 2–4 weeks. We prioritise speed without compromising quality.",
  },
  {
    id: "f10",
    question: "How do I get started with Bombay Blokes?",
    answer:
      "Click Get Free Audit anywhere on this page, fill in your details, and our team will reach out within 24 hours with your personalised audit and next steps.",
  },
];

export const finalCTA: FinalCTAContent = {
  eyebrow: "READY TO SCALE?",
  title: (
    <>
      Get Your{" "}
      <span className="text-[var(--color-highlight)]">Free Growth Audit</span> Today
    </>
  ),
  subtitle:
    "Discover exactly what's holding your brand back — and get a custom roadmap to fix it.",
  cta: "Get Free Audit",
  ctaHref: "#contact",
  bullets: [
    "No commitment required",
    "Personalised audit within 24 hours",
    "Covers website, ads, SEO & social",
  ],
};

export const contactForm: ContactSectionContent = {
  heading: {
    eyebrow: "START YOUR GROWTH JOURNEY",
    title: (
      <>
        Request Your{" "}
        <span className="text-[var(--color-highlight)]">Free Audit</span>
      </>
    ),
    subtitle:
      "Tell us about your brand and we'll send a tailored growth plan — no strings attached.",
  },
  form: sharedLeadForm,
};

export const footerCTA: FooterCTAContent = {
  brand: "Bombay Blokes",
  tagline: "Premium digital growth for ambitious brands.",
  cta: "Get Free Audit",
  ctaHref: "#contact",
  links: [
    { label: "Website Development", href: "/website-development" },
    { label: "Performance Marketing", href: "/paid-marketing" },
    { label: "SEO Services", href: "/seo" },
    { label: "Social Media", href: "/social-media-marketing" },
    { label: "Contact", href: "/contactus" },
  ],
  copyright: "© 2026 Bombay Blokes Digital Solutions LLP. All rights reserved.",
};

export const stickyCTA: StickyCTAContent = {
  text: "Ready for your free audit?",
  cta: "Get Free Audit",
  ctaHref: "#contact",
};

export const pageContent: Record<string, PageSectionContent> = {
  "/website-development": {
    eyebrow: "WHY BOMBAY BLOKES",
    title: (
      <>
        We Engineer{" "}
        <span className="text-[var(--color-highlight)]">Websites That Perform</span> Not Just
        Websites That Exist
      </>
    ),
    body: [
      "As a professional web development company, we build custom website development solutions that load fast, rank well and convert visitors into customers.",
      "From Shopify website development to enterprise web design and development agency projects — every build is engineered for performance.",
    ],
    cta: "Get Free Audit",
    stats: [
      { icon: "award", value: "10+", label: "Years of Experience" },
      { icon: "users", value: "50+", label: "Brands" },
      { icon: "rocket", value: "120+", label: "Websites Launched" },
    ],
  },
  "/paid-marketing": {
    eyebrow: "PERFORMANCE MARKETING",
    title: (
      <>
        Performance Marketing That{" "}
        <span className="text-[var(--color-highlight)]">Scales Revenue</span>
      </>
    ),
    body: [
      "Our performance marketing agency in Mumbai runs Google Ads, Meta Ads and Amazon advertising campaigns focused on ROAS and profitable growth.",
      "Work with a Google Ads marketing agency and Meta Ads expert team that treats your budget like their own.",
    ],
    cta: "Get Free Audit",
    stats: [
      { icon: "chart", value: "4.2x", label: "Average ROAS" },
      { icon: "target", value: "₹50Cr+", label: "Ad Spend Managed" },
    ],
  },
  "/social-media-marketing": {
    eyebrow: "SOCIAL MEDIA MARKETING",
    title: (
      <>
        Social Media That{" "}
        <span className="text-[var(--color-highlight)]">Drives Revenue</span>
      </>
    ),
    body: [
      "End-to-end social media marketing agency services — strategy, content, community and paid social across Instagram, Facebook and LinkedIn.",
      "Our social media experts turn followers into customers with data-driven creative and conversion-focused campaigns.",
    ],
    cta: "Get Free Audit",
    stats: [
      { icon: "users", value: "30+", label: "Social Accounts Managed" },
      { icon: "megaphone", value: "200+", label: "Campaigns Run" },
    ],
  },
  "/seo": {
    eyebrow: "SEO SERVICES",
    title: (
      <>
        SEO That Compounds{" "}
        <span className="text-[var(--color-highlight)]">Organic Growth</span>
      </>
    ),
    body: [
      "An SEO agency Mumbai businesses trust for Technical SEO, Local SEO, Ecommerce SEO, GEO, AEO and Google AI Overview Optimization.",
      "We build sustainable Organic Traffic Growth engines — not short-term ranking tricks.",
    ],
    cta: "Get Free Audit",
    stats: [
      { icon: "search", value: "180%", label: "Avg. Traffic Growth" },
      { icon: "globe", value: "500+", label: "Keywords Ranked" },
    ],
  },
};
