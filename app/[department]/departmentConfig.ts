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
      badgeText: "Search, the revenue focused way",
      images: [
        "/images/seo cs/seo1.jpeg",
        "/images/seo cs/seo2.png",
        "/images/seo cs/seo3.webp",
        "/images/seo cs/seo4.webp",
      ],
    },
    whyText:
      "Rankings are easy. Revenue is harder. Bombay Blokes treats SEO as a long term asset, not a checklist. We start with strategy, build technical foundations that scale, create content that converts, report transparently, and grow search visibility that compounds month after month.",
    stats: {
      eyebrow: "Organic Growth",
      headline: "Rank Higher, Get Found, And Stay Ahead Of The Competition",
     statCards: [
  {
    value: "1M+",
    description: "Organic Clicks Generated",
  },
  {
    value: "100M+",
    description: "Search Impressions Delivered",
  },
  {
    value: "250+",
    description: "Brands Optimized",
  },
  {
    value: "10000+",
    description: "Keywords Optimized",
  },
],
      ctaBanner: {
        text: "Every day you wait, a competitor ranks for a keyword that should've been yours. And keeps it.",
        buttonText: "See what you're missing ",
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
          image: "/images/seo cs/manbaaa.png",
          link: "/work/seo services/manbafinance",
        },
        {
          number: "02",
          title: "SCS Sports",
          image: "/images/seo cs/SCS1.png",
          link: "/work/seo services/scssports",
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
          title: "Content & On Page",
          description:
            "Pages are built around useful content, sharp metadata, internal links, and conversion focused messaging.",
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
    question: "Why is SEO important for my business?",
    answer:
      "SEO helps your business rank higher on search engines, attract qualified organic traffic, and generate consistent leads without relying solely on paid advertising. It's a long term investment that builds credibility, increases visibility, and drives sustainable business growth.",
  },
  {
    question: "What SEO services does Bombay Blokes offer?",
    answer:
      "We provide end to end SEO services, including keyword research, technical SEO, on page optimization, content strategy, link building, local SEO, website audits, and ongoing performance monitoring to improve your search rankings and organic visibility.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO is a long term strategy. While timelines vary depending on your industry, website, and competition, most businesses begin seeing measurable improvements within 3–6 months, with stronger and more sustainable results achieved over time through continuous optimization.",
  },
  {
    question: "Do you provide Local SEO services?",
    answer:
      "Yes. We optimize your online presence to improve visibility in local search results through Google Business Profile optimization, local keyword targeting, citation management, and location specific SEO strategies that help nearby customers discover your business.",
  },
  {
    question: "How do you measure SEO success?",
    answer:
      "We measure SEO success through key performance metrics such as organic traffic, keyword rankings, search visibility, click through rates (CTR), website conversions, lead generation, and overall business growth. You'll receive transparent reports with actionable insights.",
  },
  {
    question: "Why choose Bombay Blokes for SEO?",
    answer:
      "Bombay Blokes combines technical expertise, data driven strategies, and high quality content to improve search rankings, increase organic traffic, and generate long term business growth. We focus on ranking for the keywords that matter most to your business while delivering measurable results.",
  },
  {
  question: "How much does SEO actually cost?",
  answer:
    "It depends on your business goals, competition level, and the scope of work required. Use the free Investment Guide above to get an instant starting estimate based on your needs. No hidden fees and no surprise add ons.",
},
{
  question: "What if my rankings drop?",
  answer:
    "SEO is continuously monitored—not set and forget. If rankings fluctuate due to algorithm updates or increased competition, we immediately analyze the data, identify the cause, and adjust the strategy using real ranking, traffic, and conversion insights to restore and improve performance.",
},
{
  question: "What are GEO and AEO, and do you offer them?",
  answer:
    "Yes. GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) are the next evolution of SEO. They focus on optimizing your content to appear in AI powered search experiences such as ChatGPT, Google AI Overviews, Perplexity, and other answer engines. We incorporate GEO and AEO best practices into every SEO strategy alongside traditional SEO to help your business stay visible as search continues to evolve.",
},
],
    },
  },

  "website-development-services": {
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
      eyebrow: "Beyond Beautiful",
      headline: "Websites Built To Convert, Perform, And Leave A Lasting Impression",
statCards: [
  {
    value: "250+",
    description: "Websites & Web Apps Built",
  },
  {
    value: "25+",
    description: "Industries Served",
  },
  {
    value: "95%",
    description: "Client Satisfaction",
  },
  {
    value: "100%",
    description: "Mobile Responsive Builds",
  },
],
      ctaBanner: {
        text: "Every day without a fast, conversion optimised site, you're handing business to your competitors.",
        buttonText: "See what you're losing ",
        buttonHref: "/contactus",
      },
      achievementStats: [
        { value: 100, suffix: "+", label: "Projects Delivered" },
        { value: 50, suffix: "+", label: "Brands Worked With" },
        { value: 98, suffix: "%", label: "On Time Delivery" },
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
          link: "/work/website development/jkdiamonds",
        },
        {
          number: "02",
          title: "Mr. Blox",
          image: "/images/webdev/mrblox1.jpg",
          link: "/work/website development/mrblox",
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
            "Clean, performant code built on modern frameworks   fast to ship and easy to scale.",
          tags: ["Code", "CMS", "Performance"],
        },
        {
          title: "QA & Testing",
          description:
            "Cross device testing, speed audits, and accessibility checks before anything goes live.",
          tags: ["Testing", "Speed", "Mobile"],
        },
        {
          title: "Launch",
          description:
            "Smooth deployment with SEO fundamentals, analytics tracking, and zero downtime rollout.",
          tags: ["Deploy", "SEO", "Analytics"],
        },
        {
          title: "Support & Growth",
          description:
            "Post launch support, performance monitoring, and iterative improvements that keep the site growing.",
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
    question: "Why does my business need a professionally designed website?",
    answer:
      "A professional website is often your customer's first impression of your brand—whatever industry you're in. It builds credibility, improves user experience, and directly impacts how many visitors convert into leads or customers.",
  },
  {
    question: "Do you create custom website designs?",
    answer:
      "Yes. Every website we design is fully customized to match your brand identity, business goals, and target audience. We don't use generic templates—we create unique digital experiences that help your brand stand out.",
  },
  {
    question: "Will my website be mobile friendly and responsive?",
    answer:
      "Absolutely. Every website we design is fully responsive, ensuring a seamless experience across desktops, tablets, and mobile devices for maximum engagement and performance.",
  },
  {
    question: "Do you design websites with SEO in mind?",
    answer:
      "Yes. Our websites are built with SEO best practices, including clean site architecture, optimized page structure, fast loading speeds, and user friendly navigation to improve search engine visibility.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. Whether your website needs a visual refresh or a complete transformation, we redesign websites to improve performance, user experience, functionality, and conversion rates while keeping your business goals at the forefront.",
  },
  {
    question: "Why choose Bombay Blokes for web design?",
    answer:
      "We've built websites across fashion, F&B, wellness, retail, education, and service businesses—not just one industry playbook. Every project is tailored to your business goals, audience, and long term growth.",
  },
  {
    question: "How much does a website actually cost?",
    answer:
      "It depends on your project scope, features, and business requirements. Use the free Investment Guide above to get an instant starting estimate based on your business type. No hidden fees and no surprise add ons.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "Every project includes structured revision rounds and a dedicated project manager, so you're never stuck with a design you don't love. We don't move to the next stage until you're completely satisfied and approve the design.",
  },
],
    },
  },

  "social-media-management": {
    hero: {
      headline: "Making Brands",
      highlightText: "Impossible To Ignore.",
      description:
        "We help brands grow through strategic social media marketing, content creation, and community building. From Instagram and LinkedIn management to content strategy and performance driven campaigns, we create meaningful engagement, strengthen brand awareness, and drive measurable business growth. ",
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
      eyebrow: "Always Relevant",
      headline: "Content That Stops The Scroll And Builds A Loyal Community.",
    statCards: [
  {
    value: "250+",
    description: "Brands Managed",
  },
  {
    value: "100M+",
    description: "Social Impressions",
  },
  {
    value: "10M+",
    description: "Video Views",
  },
  {
    value: "1M+",
    description: "Engagements",
  },

],
      ctaBanner: {
        text: "Every post without a strategy is a missed opportunity to build real brand equity.",
        buttonText: "See what you're missing ",
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
          link: "/work/social media/supersox",
        },
        {
          number: "02",
          title: "Ric Rac",
          image: "/images/SocialMedia/ricrac.webp",
          link: "/work/social media/ricrac",
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
            "Scroll stopping visuals, copy, reels, and carousels crafted to earn attention and drive action.",
          tags: ["Design", "Copy", "Reels"],
        },
        {
          title: "Publishing",
          description:
            "Consistent scheduling, platform native formatting, and hashtag strategy for maximum organic reach.",
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
    question: "Why is social media marketing important for my business?",
    answer:
      "Social media helps your brand increase visibility, engage the right audience, build credibility, and drive meaningful business growth. A strong social presence creates lasting customer relationships while generating valuable leads and conversions.",
  },
  {
    question: "Which social media platforms do you manage?",
    answer:
      "We manage Instagram, Facebook, LinkedIn, X (Twitter), YouTube, and other leading social platforms, creating platform specific strategies that maximize reach, engagement, and brand impact.",
  },
  {
    question: "Do you create content for social media?",
    answer:
      "Yes. Our team handles everything from content strategy and creative design to copywriting, photography, videography, and short form video production, ensuring your brand remains consistent and engaging across all platforms.",
  },
  {
    question: "How do you measure the success of social media campaigns?",
    answer:
      "We track key performance metrics such as reach, engagement, audience growth, website traffic, lead generation, and conversions, providing transparent reports that clearly demonstrate your return on investment.",
  },
  {
    question: "Can social media marketing help generate leads and sales?",
    answer:
      "Absolutely. Our social media strategies are designed to build brand awareness, generate qualified leads, drive website traffic, increase customer engagement, and support long term business growth.",
  },
  {
    question: "Why should I choose Bombay Blokes for social media marketing?",
    answer:
      "Bombay Blokes combines creative storytelling, data driven strategy, and platform expertise to create impactful social media campaigns that build communities, strengthen brand presence, and deliver measurable business results. We don't just manage social media—we help brands grow through it.",
  },

  {
  question: "How much does social media management actually cost?",
  answer:
    "It depends on the number of platforms, content requirements, posting frequency, and campaign scope. Use the free Investment Guide above to get an instant starting estimate based on your business needs. No hidden fees and no surprise add ons.",
},
{
  question: "What if the content isn't performing?",
  answer:
    "Every social media strategy includes ongoing performance tracking, audience insights, and continuous optimization. If content isn't delivering the desired results, we refine the strategy, test new creative approaches, and improve performance using real data—not guesswork.",
},
],
    },
  },

  "performance-marketing-services": {
    hero: {
      headline: "From clicks",
      highlightText: "to customers.",
      description:
        "Anyone can get you clicks. We get you conversions   turning ad spend into real revenue, not vanity metrics. Every rupee tracked, every campaign optimised.",
      ctaText: "BOOK FREE AUDIT",
      ctaHref: "/contactus",
      badgeText: "Marketing, the result driven way",
      images: [
        "/images/pm/chaterbox.png",
        "/images/pm/Dancingleaf.png",
        "/images/pm/Jk diamonds.png",
        "/images/pm/SCS.png",
      ],
    },
    whyText:
      "Performance marketing is not about spending more. It is about spending smarter. Bombay Blokes builds campaigns with precision targeting, compelling creative, continuous optimisation, and transparent reporting that connects every rupee to real business outcomes.",
    stats: {
      eyebrow: "Real Results",
      headline: "Growth First Approach Focused On Revenue & ROI",
      statCards: [
  {
    value: "250+",
    description: "Trusted Brands",
  },
  {
    value: "100M+",
    description: "Impressions Generated",
  },
  {
    value: "1M+",
    description: "Leads Generated",
  },
  {
    value: "95%",
    description: "Client Retention",
  },
],
      ctaBanner: {
        text: "Every rupee spent without a strategy is a rupee earned for your competitor.",
        buttonText: "See what you're losing ",
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
      eyebrow: "Trusted by 250+ brands",
      title: "Brands That",
      highlightTitle: "Trust The Work",
      subtitle: "From e commerce to service businesses, 50+ brands have trusted us to make their ad spend work harder.",
    },
    work: {
      filterLabel: "Performance Marketing",
      workItems: [
        {
          number: "01",
          title: "Manba Finance",
          image: "/images/pm/Manba.png",
          link: "/work/performance marketing/manbafinance",
        },
        {
          number: "02",
          title: "Presolv360",
          image: "/images/pm/Presolv.png",
          link: "/work/performance marketing/presolv",
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
            "Ad creative copy, visuals, and video built to stop the scroll and drive the click.",
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
    question: "How can Performance Marketing help my business grow?",
    answer:
      "Performance Marketing helps you reach the right audience, generate qualified leads, increase conversions, and maximize your return on investment. Every campaign is continuously optimized using real time data to drive measurable business growth and long term profitability.",
  },
  {
    question: "Which advertising platforms do you specialize in?",
    answer:
      "We specialize in Meta Ads (Facebook & Instagram), Google Ads, YouTube Ads, LinkedIn Ads, and other leading digital advertising platforms. Our team builds platform specific strategies designed to maximize reach, engagement, and conversions.",
  },
  {
    question: "How do you measure the success of a campaign?",
    answer:
      "We measure campaign performance using key metrics such as ROAS (Return on Ad Spend), Cost Per Acquisition (CPA), conversion rate, lead quality, website traffic, revenue generated, and overall return on investment.",
  },
  {
    question: "How long does it take to see results from Performance Marketing?",
    answer:
      "Results vary depending on your industry, audience, competition, and campaign objectives. Most campaigns begin generating valuable insights within the first few weeks, with performance improving continuously through optimization and data driven refinements.",
  },
  {
    question: "What industries does Bombay Blokes work with?",
    answer:
      "We work with startups, D2C brands, e commerce businesses, healthcare, hospitality, real estate, education, retail, lifestyle, and service based businesses, creating customized performance marketing strategies for every industry.",
  },
  {
    question: "Do you manage both Meta Ads and Google Ads?",
    answer:
      "Yes. We provide complete end to end management for both Meta Ads and Google Ads, including strategy, audience research, campaign setup, creative optimization, budget management, A/B testing, conversion tracking, and ongoing performance reporting to maximize leads, sales, and ROI.",
  },
  {
  question: "How much does a performance marketing campaign cost?",
  answer:
    "It depends on your business goals, target audience, advertising platforms, and campaign scope. Use the free Investment Guide above to get an instant starting estimate based on your requirements. No hidden fees and no surprise add ons.",
},
{
  question: "What if the campaign doesn't perform?",
  answer:
    "Every campaign is backed by transparent ROAS and CPA reporting, along with continuous testing and optimization. If something isn't performing as expected, we quickly identify the issue, refine the strategy, and make data driven improvements instead of letting ad spend go to waste.",
},
],
    },
  },
};

export function getDepartmentConfig(department: string): DepartmentConfig | null {
  return configs[department] ?? null;
}