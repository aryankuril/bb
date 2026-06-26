"use client";

import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development": {
    title: (
      <>
         Design That {" "}
        <span className="text-highlight">
         Speaks Before
        </span>{" "}
        You Do.{" "}
        
      </>
    ),
   subtitle: "Modern, responsive websites with intuitive UI/UX that engage users and drive business growth.",
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
  className="black-text max-w-full lg:max-w-[1300px] font-outfit text-[30px] lg:text-[70px] leading-[1em] "
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