"use client";

import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development": {
    title: (
      <>
        Build High-Converting{" "}
        <span className="text-highlight">
          Websites
        </span>{" "}
        That Drive{" "}
        <span className="text-highlight">
          Business Growth
        </span>
      </>
    ),
    subtitle:
      "From corporate websites to custom web applications, we build fast, scalable, and conversion-focused digital experiences tailored to your business goals.",
  },

  "/social-media-marketing": {
    title: (
      <>
        Grow Your Brand With{" "}
        <span className="text-highlight">
          Social Media
        </span>{" "}
        That Creates{" "}
        <span className="text-highlight">
          Real Engagement
        </span>
      </>
    ),
    subtitle:
      "Build a stronger online presence with content, strategy, and campaigns designed to increase reach, engagement, and customer loyalty.",
  },

  "/paid-marketing": {
    title: (
      <>
        Maximize ROI With{" "}
        <span className="text-highlight">
          Paid Marketing
        </span>{" "}
        That Delivers{" "}
        <span className="text-highlight">
          Results
        </span>
      </>
    ),
    subtitle:
      "Launch data-driven advertising campaigns across Google, Meta, LinkedIn, and more to generate qualified leads and measurable business growth.",
  },

  "/seo": {
    title: (
      <>
        Improve Rankings With{" "}
        <span className="text-highlight">
          SEO
        </span>{" "}
        That Drives{" "}
        <span className="text-highlight">
          Organic Growth
        </span>
      </>
    ),
    subtitle:
      "Increase visibility, traffic, and leads through comprehensive SEO strategies focused on long-term growth and sustainable search performance.",
  },
};

export default function Firstsection() {
  const pathname = usePathname();

  const content =
    pageContent[pathname as keyof typeof pageContent] ||
    pageContent["/website-development"];

  return (
    <section className="container pb-0 lg:py-0 lg:mt-30 -mt-10 px-4 sm:px-6 lg:px-8">
            
      <div className="flex flex-col">
        <div className="flex-1">
          <h1 className="black-text max-w-full lg:max-w-[1300px]">
            {content.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-[#666] leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}