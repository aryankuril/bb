export interface HeroContent {
  headline: string;
  highlightText: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  badgeText: string;
  images: string[];
}

export interface StatCard {
  value: string;
  description: string;
  boldWord?: string;
}

export interface AchievementStat {
  value: number;
  suffix: string;
  label: string;
  isLongValue?: boolean;
}

export interface StatsContent {
  eyebrow: string;
  headline: string;
  statCards: StatCard[];
  ctaBanner: {
    text: string;
    buttonText: string;
    buttonHref: string;
  };
  achievementStats: AchievementStat[];
}

export interface LogoContent {
  eyebrow: string;
  title: string;
  highlightTitle: string;
  subtitle: string;
}

export interface WorkItem {
  number: string;
  title: string;
  image: string;
  link: string;
}

export interface WorkContent {
  filterLabel: string;
  workItems: WorkItem[];
}

export interface WorkflowStep {
  title: string;
  description: string;
  tags: string[];
}

export interface WorkflowContent {
  title: string;
  steps: WorkflowStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  eyebrow: string;
  title: string;
  highlightTitle: string;
  faqs: FAQItem[];
}

export interface DepartmentConfig {
  hero: HeroContent;
  whyText: string;
  stats: StatsContent;
  logos: LogoContent;
  work: WorkContent;
  workflow: WorkflowContent;
  faq: FAQContent;
}

const configs: Record<string, DepartmentConfig> = {
  seo: {
    hero: {
      headline: "SEO that ranks,",
      highlightText: "converts, and compounds.",
      description:
        "Rankings are only the start. We build search visibility that brings the right people in, moves them through the site, and turns organic traffic into measurable business growth.",
      ctaText: "BOOK FREE SEO AUDIT",
      ctaHref: "/contactus",
      badgeText: "Search, the revenue-focused way",
      images: [
        "/images/seo-cs/seo1.jpeg",
        "/images/seo-cs/seo2.png",
        "/images/seo-cs/seo3.webp",
        "/images/seo-cs/seo4.webp",
      ],
    },
    whyText:
      "Rankings are easy. Revenue is harder. Bombay Blokes treats SEO as a long-term asset, not a checklist. We start with strategy, build technical foundations that scale, create content that converts, report transparently, and grow search visibility that compounds month after month.",
    stats: {
      eyebrow: "The uncomfortable truth",
      headline: "If you're not on page one, you're invisible. Your competitors are eating your lunch.",
      statCards: [
        {
          value: "91%",
          description: "of pages get zero Google traffic. Beautiful site, invisible to buyers.",
          boldWord: "zero",
        },
        {
          value: "7/10",
          description: "clicks go to the top 3 results. Position 8 might as well be page 80.",
        },
        {
          value: "₹0",
          description: "is what SEO agencies report when they hide behind rankings instead of revenue.",
        },
      ],
      ctaBanner: {
        text: "Every day you wait, a competitor ranks for a keyword that should've been yours. And keeps it.",
        buttonText: "See what you're missing +",
        buttonHref: "/contactus",
      },
      achievementStats: [
        { value: 100, suffix: "+", label: "Projects Delivered" },
        { value: 50, suffix: "+", label: "Brands Worked With" },
        { value: 10, suffix: "M+", label: "Organic Impressions", isLongValue: true },
        { value: 5, suffix: "+", label: "Years Experience" },
      ],
    },
    logos: {
      eyebrow: "Trusted by 50+ brands",
      title: "Brands That",
      highlightTitle: "Trust The Work",
      subtitle: "From D2C startups to legacy finance brands, we've grown organic search for companies across India.",
    },
    work: {
      filterLabel: "SEO",
      workItems: [
        {
          number: "01",
          title: "Manba Finance",
          image: "/images/seo-cs/manbaaa.png",
          link: "/work/seo-services/manbafinance",
        },
        {
          number: "02",
          title: "SCS Sports",
          image: "/images/seo-cs/SCS1.png",
          link: "/work/seo-services/scssports",
        },
      ],
    },
    workflow: {
      title: "How We Grow Your Rankings",
      steps: [
        {
          title: "SEO Audit",
          description:
            "We inspect crawlability, indexing, speed, content gaps, and search visibility before touching execution.",
          tags: ["Audit", "Indexing", "Visibility"],
        },
        {
          title: "Research & Strategy",
          description:
            "Search intent, competitors, category demand, and conversion opportunities shape the roadmap.",
          tags: ["Intent", "Keywords", "Roadmap"],
        },
        {
          title: "Technical Fixes",
          description:
            "We clean up the foundations so search engines can read the site and customers can move fast.",
          tags: ["Speed", "Schema", "Structure"],
        },
        {
          title: "Content & On-Page",
          description:
            "Pages are built around useful content, sharp metadata, internal links, and conversion-focused messaging.",
          tags: ["Content", "Metadata", "Conversion"],
        },
        {
          title: "Authority Building",
          description:
            "We strengthen trust signals through relevant content assets, outreach, and durable search authority.",
          tags: ["Authority", "Links", "Trust"],
        },
        {
          title: "Reporting & Growth",
          description:
            "Clear reports connect rankings, traffic, leads, and revenue so SEO keeps compounding over time.",
          tags: ["Reports", "Leads", "Growth"],
        },
      ],
    },
    faq: {
      eyebrow: "Got questions",
      title: "SEO",
      highlightTitle: "FAQs",
      faqs: [
        {
          question: "How long does SEO take?",
          answer:
            "Most brands start seeing directional movement in 3 to 6 months, depending on competition, site health, content depth, and authority.",
        },
        {
          question: "Do you guarantee rankings?",
          answer:
            "No ethical SEO partner can guarantee exact rankings. We focus on controllable work: technical quality, content relevance, authority, reporting, and business growth.",
        },
        {
          question: "What industries do you work with?",
          answer:
            "We work across consumer brands, finance, sports, B2B, local businesses, and service-led companies that want search to drive measurable demand.",
        },
        {
          question: "How often will I receive reports?",
          answer:
            "You receive transparent recurring reports that cover traffic, rankings, content progress, technical fixes, and growth opportunities.",
        },
        {
          question: "Do you handle local SEO?",
          answer:
            "Yes. We handle local SEO strategy, location pages, Google Business Profile improvements, citations, and local search visibility.",
        },
        {
          question: "What is included in your SEO service?",
          answer:
            "SEO audits, research, technical fixes, on-page optimization, content planning, authority building, tracking, and growth reporting.",
        },
      ],
    },
  },

  "website-development": {
    hero: {
      headline: "Websites that perform,",
      highlightText: "not just impress.",
      description:
        "A beautiful site means nothing if it doesn't convert. We design and build fast, scalable websites that turn visitors into customers and keep your brand ahead.",
      ctaText: "BOOK FREE CONSULTATION",
      ctaHref: "/contactus",
      badgeText: "Design that works as hard as you do",
      images: [
        "/images/webdev/Blancora1.jpg",
        "/images/webdev/MST.png",
        "/images/webdev/Mysuite.png",
        "/images/webdev/Foundation.png",
      ],
    },
    whyText:
      "A website is your best salesperson. Bombay Blokes builds digital experiences that load fast, rank well, and convert consistently. We combine sharp design with solid engineering, obsess over mobile performance, and build on foundations that scale as your business does.",
    stats: {
      eyebrow: "The hard truth",
      headline: "A slow, dated website is costing you customers every single day.",
      statCards: [
        {
          value: "53%",
          description: "of visits are abandoned if a page takes more than 3 seconds to load.",
          boldWord: "abandoned",
        },
        {
          value: "88%",
          description: "of users won't return after a bad experience. First impressions are permanent.",
        },
        {
          value: "₹0",
          description: "in conversions from a site that looks great but isn't built to sell.",
        },
      ],
      ctaBanner: {
        text: "Every day without a fast, conversion-optimised site, you're handing business to your competitors.",
        buttonText: "See what you're losing +",
        buttonHref: "/contactus",
      },
      achievementStats: [
        { value: 100, suffix: "+", label: "Projects Delivered" },
        { value: 50, suffix: "+", label: "Brands Worked With" },
        { value: 98, suffix: "%", label: "On-Time Delivery" },
        { value: 5, suffix: "+", label: "Years Experience" },
      ],
    },
    logos: {
      eyebrow: "Trusted by 50+ brands",
      title: "Brands That",
      highlightTitle: "Trust The Work",
      subtitle: "From luxury fashion to fintech, we've built websites for brands that need speed, design, and conversion.",
    },
    work: {
      filterLabel: "Web Development",
      workItems: [
        {
          number: "01",
          title: "JK Diamonds",
          image: "/images/webdev/jkd1.png",
          link: "/work/website-development/jkdiamonds",
        },
        {
          number: "02",
          title: "Mr. Blox",
          image: "/images/webdev/mrblox1.jpg",
          link: "/work/website-development/mrblox",
        },
      ],
    },
    workflow: {
      title: "How We Build Sites That Convert",
      steps: [
        {
          title: "Discovery",
          description:
            "We map your goals, audience, and competitive landscape before a single wireframe is drawn.",
          tags: ["Goals", "Research", "Scope"],
        },
        {
          title: "Design",
          description:
            "UI/UX design grounded in brand identity, user journeys, and conversion architecture.",
          tags: ["UI/UX", "Branding", "Wireframes"],
        },
        {
          title: "Development",
          description:
            "Clean, performant code built on modern frameworks — fast to ship and easy to scale.",
          tags: ["Code", "CMS", "Performance"],
        },
        {
          title: "QA & Testing",
          description:
            "Cross-device testing, speed audits, and accessibility checks before anything goes live.",
          tags: ["Testing", "Speed", "Mobile"],
        },
        {
          title: "Launch",
          description:
            "Smooth deployment with SEO fundamentals, analytics tracking, and zero-downtime rollout.",
          tags: ["Deploy", "SEO", "Analytics"],
        },
        {
          title: "Support & Growth",
          description:
            "Post-launch support, performance monitoring, and iterative improvements that keep the site growing.",
          tags: ["Support", "Updates", "Growth"],
        },
      ],
    },
    faq: {
      eyebrow: "Got questions",
      title: "Web Development",
      highlightTitle: "FAQs",
      faqs: [
        {
          question: "How long does a website take to build?",
          answer:
            "A standard brochure website takes 4 to 6 weeks. More complex builds with custom functionality or e-commerce take 8 to 12 weeks depending on scope.",
        },
        {
          question: "Do you build on WordPress or custom code?",
          answer:
            "Both. We choose the stack based on your needs — WordPress for content-heavy sites, Next.js or custom builds for high-performance, scalable products.",
        },
        {
          question: "Will my website be mobile-friendly?",
          answer:
            "Yes, every site we build is fully responsive and tested across all major devices and screen sizes before launch.",
        },
        {
          question: "Do you handle SEO during development?",
          answer:
            "We set up technical SEO foundations — site structure, metadata, schema, page speed, and indexing — so your site is search-ready from day one.",
        },
        {
          question: "Can I update the website myself after launch?",
          answer:
            "Yes. We build on CMS platforms or headless setups that give you full content control without needing a developer for every change.",
        },
        {
          question: "What is included in your web development service?",
          answer:
            "Strategy, UI/UX design, development, QA testing, SEO setup, CMS integration, launch support, and a post-launch handover session.",
        },
      ],
    },
  },

  "social-media-marketing": {
    hero: {
      headline: "Social media that",
      highlightText: "builds brands and drives revenue.",
      description:
        "Scroll-stopping content is only half the job. We build social strategies that grow your audience, deepen brand loyalty, and turn followers into customers.",
      ctaText: "BOOK FREE STRATEGY CALL",
      ctaHref: "/contactus",
      badgeText: "Content that earns attention",
      images: [
        "/images/SocialMedia/SuperSox.webp",
        "/images/SocialMedia/ricrac.webp",
        "/images/SocialMedia/scs.webp",
        "/images/SocialMedia/SuperSox.webp",
      ],
    },
    whyText:
      "Likes don't pay salaries. Bombay Blokes builds social media systems that grow the right audience, earn real engagement, create brand love that lasts, and convert social attention into business outcomes that show up in revenue.",
    stats: {
      eyebrow: "The uncomfortable truth",
      headline: "Posting without a strategy is just noise. And noise doesn't build brands.",
      statCards: [
        {
          value: "91%",
          description: "of brands post with no documented content strategy. Effort without direction.",
          boldWord: "no",
        },
        {
          value: "5%",
          description: "average organic reach on Instagram. Most of your followers never see your content.",
        },
        {
          value: "₹0",
          description: "ROI from followers who never convert. Vanity metrics don't pay the bills.",
        },
      ],
      ctaBanner: {
        text: "Every post without a strategy is a missed opportunity to build real brand equity.",
        buttonText: "See what you're missing +",
        buttonHref: "/contactus",
      },
      achievementStats: [
        { value: 50, suffix: "+", label: "Brands Managed" },
        { value: 200, suffix: "M+", label: "Total Impressions", isLongValue: true },
        { value: 5, suffix: "x", label: "Avg Engagement Lift" },
        { value: 5, suffix: "+", label: "Years Experience" },
      ],
    },
    logos: {
      eyebrow: "Trusted by 50+ brands",
      title: "Brands That",
      highlightTitle: "Trust The Work",
      subtitle: "From sports and retail to finance and fashion, 50+ brands trust us to build and grow their social presence.",
    },
    work: {
      filterLabel: "Social Media",
      workItems: [
        {
          number: "01",
          title: "Super Sox",
          image: "/images/SocialMedia/SuperSox.webp",
          link: "/work/social-media/supersox",
        },
        {
          number: "02",
          title: "Ric Rac",
          image: "/images/SocialMedia/ricrac.webp",
          link: "/work/social-media/ricrac",
        },
      ],
    },
    workflow: {
      title: "How We Grow Your Audience",
      steps: [
        {
          title: "Audit",
          description:
            "We review your current profiles, content performance, audience data, and competitive positioning.",
          tags: ["Audit", "Analytics", "Benchmarks"],
        },
        {
          title: "Strategy",
          description:
            "Platform selection, content pillars, tone of voice, and a calendar built around your business goals.",
          tags: ["Strategy", "Pillars", "Calendar"],
        },
        {
          title: "Content Creation",
          description:
            "Scroll-stopping visuals, copy, reels, and carousels crafted to earn attention and drive action.",
          tags: ["Design", "Copy", "Reels"],
        },
        {
          title: "Publishing",
          description:
            "Consistent scheduling, platform-native formatting, and hashtag strategy for maximum organic reach.",
          tags: ["Scheduling", "Reach", "Formats"],
        },
        {
          title: "Community",
          description:
            "Active engagement, comment management, and community building that keeps your audience invested.",
          tags: ["Engagement", "Community", "DMs"],
        },
        {
          title: "Reporting",
          description:
            "Monthly reports connecting follower growth, engagement, reach, and conversions back to business growth.",
          tags: ["Reports", "Insights", "Growth"],
        },
      ],
    },
    faq: {
      eyebrow: "Got questions",
      title: "Social Media",
      highlightTitle: "FAQs",
      faqs: [
        {
          question: "Which platforms do you manage?",
          answer:
            "We manage Instagram, Facebook, LinkedIn, Twitter/X, YouTube, and Pinterest depending on where your audience lives.",
        },
        {
          question: "How often will you post?",
          answer:
            "Posting frequency is set in your strategy based on platform and goals — typically 4 to 5 times per week on primary platforms.",
        },
        {
          question: "Do you create the content or do we?",
          answer:
            "We handle full content creation — design, copywriting, video editing, and scheduling — so your team can focus on running the business.",
        },
        {
          question: "How do you measure success?",
          answer:
            "We track reach, impressions, engagement rate, follower growth, story views, link clicks, and any conversion metrics tied to your goals.",
        },
        {
          question: "Can you run paid ads alongside organic?",
          answer:
            "Yes. We offer integrated social media and paid advertising to amplify organic efforts and target new audiences precisely.",
        },
        {
          question: "What is included in your social media service?",
          answer:
            "Strategy, content creation, scheduling, community management, monthly reporting, and ongoing optimisation based on performance data.",
        },
      ],
    },
  },

  "paid-marketing": {
    hero: {
      headline: "From clicks",
      highlightText: "to customers.",
      description:
        "Anyone can get you clicks. We get you conversions — turning ad spend into real revenue, not vanity metrics. Every rupee tracked, every campaign optimised.",
      ctaText: "BOOK FREE AUDIT",
      ctaHref: "/contactus",
      badgeText: "Marketing, the result-driven way",
      images: [
        "/images/pm/chaterbox.png",
        "/images/pm/Dancingleaf.png",
        "/images/pm/Jk-diamonds.png",
        "/images/pm/SCS.png",
      ],
    },
    whyText:
      "Performance marketing is not about spending more. It is about spending smarter. Bombay Blokes builds campaigns with precision targeting, compelling creative, continuous optimisation, and transparent reporting that connects every rupee to real business outcomes.",
    stats: {
      eyebrow: "The expensive truth",
      headline: "You're spending on ads. Someone else is getting the customers.",
      statCards: [
        {
          value: "76%",
          description: "of ad budgets are wasted on campaigns with no proper conversion tracking.",
          boldWord: "wasted",
        },
        {
          value: "40%",
          description: "of clicks go to the top 3 ads. Position 5 might as well be invisible.",
        },
        {
          value: "₹0",
          description: "returns when ads drive traffic to pages that aren't built to convert.",
        },
      ],
      ctaBanner: {
        text: "Every rupee spent without a strategy is a rupee earned for your competitor.",
        buttonText: "See what you're losing +",
        buttonHref: "/contactus",
      },
      achievementStats: [
        { value: 100, suffix: "+", label: "Campaigns Launched" },
        { value: 50, suffix: "+", label: "Brands Worked With" },
        { value: 3, suffix: "x", label: "Average ROAS" },
        { value: 5, suffix: "+", label: "Years Experience" },
      ],
    },
    logos: {
      eyebrow: "Trusted by 50+ brands",
      title: "Brands That",
      highlightTitle: "Trust The Work",
      subtitle: "From e-commerce to service businesses, 50+ brands have trusted us to make their ad spend work harder.",
    },
    work: {
      filterLabel: "Performance Marketing",
      workItems: [
        {
          number: "01",
          title: "Manba Finance",
          image: "/images/pm/Manba.png",
          link: "/work/performance-marketing/manbafinance",
        },
        {
          number: "02",
          title: "Presolv360",
          image: "/images/pm/Presolv.png",
          link: "/work/performance-marketing/presolv",
        },
      ],
    },
    workflow: {
      title: "How We Turn Spend Into Revenue",
      steps: [
        {
          title: "Audit",
          description:
            "We review existing campaigns, audiences, creative, and conversion tracking before building anything new.",
          tags: ["Audit", "Data", "Benchmarks"],
        },
        {
          title: "Strategy",
          description:
            "Channel selection, audience mapping, budget allocation, and funnel architecture designed for your goals.",
          tags: ["Strategy", "Funnel", "Budget"],
        },
        {
          title: "Creative",
          description:
            "Ad creative — copy, visuals, and video — built to stop the scroll and drive the click.",
          tags: ["Creative", "Copy", "Video"],
        },
        {
          title: "Launch",
          description:
            "Campaigns go live with precise targeting, conversion tracking, and baseline benchmarks in place.",
          tags: ["Launch", "Targeting", "Tracking"],
        },
        {
          title: "Optimise",
          description:
            "Continuous A/B testing, bid adjustments, audience refinement, and creative iteration to lower CPA.",
          tags: ["A/B Test", "Bids", "CPA"],
        },
        {
          title: "Scale & Report",
          description:
            "What works gets scaled. Clear reports connect ad spend directly to leads, sales, and ROAS.",
          tags: ["Scale", "ROAS", "Reports"],
        },
      ],
    },
    faq: {
      eyebrow: "Got questions",
      title: "Paid Marketing",
      highlightTitle: "FAQs",
      faqs: [
        {
          question: "Which ad platforms do you work with?",
          answer:
            "We run campaigns on Google Ads, Meta (Facebook & Instagram), LinkedIn, YouTube, and other platforms based on where your audience converts best.",
        },
        {
          question: "What budget do I need to get started?",
          answer:
            "We work with brands across a range of budgets. We'll recommend a minimum based on your goals and category — enough to generate statistically meaningful data.",
        },
        {
          question: "How do you measure campaign success?",
          answer:
            "We track ROAS, CPA, CPL, CTR, conversion rate, and revenue. Every metric is tied to your specific business goal, not just impressions.",
        },
        {
          question: "How long before I see results?",
          answer:
            "Most campaigns start generating data within the first 2 weeks. Meaningful ROAS optimisation typically takes 4 to 8 weeks as the algorithm learns.",
        },
        {
          question: "Do you handle ad creative?",
          answer:
            "Yes. We create ad copy, static visuals, and video creatives tailored to each platform and audience, then iterate based on performance.",
        },
        {
          question: "What is included in your paid marketing service?",
          answer:
            "Strategy, audience research, campaign setup, creative production, ongoing optimisation, conversion tracking, and monthly performance reports.",
        },
      ],
    },
  },
};

export function getDepartmentConfig(department: string): DepartmentConfig | null {
  return configs[department] ?? null;
}