"use client";

import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development": {
    title: (
      <>
        Turn Visitors Into{" "}
        <span className="text-highlight">
          Paying Customers.
        </span>
      </>
    ),
    subtitle:
      "High-converting websites and landing pages designed to build credibility, generate leads, and accelerate business growth.",
  },

  "/social-media-marketing": {
    title: (
      <>
        Build A Brand{" "}
        <span className="text-highlight">
          People Remember.
        </span>
      </>
    ),
    subtitle:
      "Content, strategy, and social media campaigns that increase visibility, engagement, and customer loyalty.",
  },

  "/paid-marketing": {
    title: (
      <>
        Every Click{" "}
        <span className="text-highlight">
          Built To Convert.
        </span>
      </>
    ),
    subtitle:
      "ROI-focused Google and Meta advertising campaigns that generate qualified leads and maximize your marketing budget.",
  },

  "/seo": {
    title: (
      <>
        Get Found{" "}
        <span className="text-highlight">
          Before Your Competitors.
        </span>
      </>
    ),
    subtitle:
      "Comprehensive SEO strategies that improve rankings, increase organic traffic, and drive sustainable business growth.",
  },
};

export default function Firstsection() {
  const pathname = usePathname();

  const content =
    pageContent[pathname as keyof typeof pageContent] ||
    pageContent["/website-development"];

  return (
    <section className="container pb-0 lg:py-0 lg:mt-30 mt-0 px-4 sm:px-6 lg:px-8">
            
      <div className="flex flex-col">
        <div className="flex-1">
          <a
  className="black-text max-w-full lg:max-w-[1300px] font-outfit text-[30px] lg:text-[70px] leading-[1em] font-normal"
>
  {content.title}
</a>

          <p className="mt-4 max-w-4xl  text-[#666] subtitle">
            {content.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}