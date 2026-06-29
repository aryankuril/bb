"use client";

import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development": {
    title: (
      <>
          Get a Website{" "}
        <span className="text-highlight">
         That Sells 
        </span>{" "}
       Not Just One That Looks Good{" "}
        
      </>
    ),
   subtitle: "Whether you run a D2C brand, a service business, or a retail store, see exactly what your website will cost and how it'll perform. Get your free audit below.",
    },

  "/social-media-marketing": {
    title: (
      <>
       Making Brands {" "}
        <span className="text-highlight">
        Impossible To Ignore.
        </span>{" "}
        
      </>
    ),
    subtitle:
      "We help brands grow through strategic social media marketing, engaging content, and data-driven campaigns that build awareness, strengthen communities, and drive measurable business growth.",
  },

  "/paid-marketing": {
    title: (
      <>
        Mumbai's Growth-Focused {" "}
        <span className="text-highlight">
          Performance Marketing
        </span>{" "}
       Agency{" "}
       
      </>
    ),
    subtitle:
      "Trusted by ambitious brands to drive customer acquisition, revenue growth, and industry-leading marketing performance.",
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
    <section className="container pb-0 lg:py-0 lg:mt-30 mt-0 px-4 sm:px-6 lg:px-8">
            
      <div className="flex flex-col">
        <div className="flex-1">
           <a
  className="black-text max-w-full lg:max-w-[1300px] font-outfit text-[28px] lg:text-[60px] leading-[1em] "
>
  {content.title}
</a>

          <p className="mt-4 max-w-4xl  text-black subtitle">
            {content.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}