"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



const testimonials = {
  "paid-marketing": [
    {
      brand: "Lemonade India",
      text: "Bombay Blokes helped us identify a clear brand direction and strengthen our digital presence. Their strategic approach and commitment to growth have made them an invaluable partner.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "The team took complete ownership of our advertising efforts and delivered a noticeable increase in sales within the first month. Their proactive approach and performance-driven mindset set them apart.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Working with Bombay Blokes has been seamless from day one. Their understanding of digital marketing and ability to execute consistently has helped us achieve our business objectives.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "From website development to e-commerce solutions, the team demonstrated exceptional expertise and professionalism. They are a partner that genuinely cares about business growth.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "Bombay Blokes truly offers some of the best digital services in the industry. From social media marketing to web development, they consistently deliver outstanding results.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Feedback",
      text: "Their combination of creativity, strategy, and performance marketing expertise helped us unlock new growth opportunities while maintaining complete transparency.",
      name: "~ Client Feedback",
      maintext: "★★★★★ 5/5",
    },
  ],

  seo: [
    {
      brand: "Lemonade India",
      text: "The SEO strategy developed by Bombay Blokes significantly improved our search visibility and organic traffic. Their expertise helped us reach the right audience and generate consistent business growth.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "Bombay Blokes took a strategic approach to SEO, helping us rank for relevant keywords and improve our online presence. The results have been both measurable and sustainable.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Their SEO team understands both technical optimization and content strategy. We've seen a noticeable improvement in our search rankings and organic lead generation.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "The team delivered a well-planned SEO strategy backed by regular reporting and transparent communication. They made the entire process seamless and highly effective.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "Bombay Blokes helped us build a stronger online presence through smart SEO strategies and continuous optimization. Their commitment to results truly sets them apart.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
  ],

  "social-media-marketing": [
    {
      brand: "Lemonade India",
      text: "Bombay Blokes completely transformed our social media presence. Their creative direction, content strategy, and consistent execution helped us build a stronger brand and engage our audience like never before.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "The team understands what modern brands need on social media. Every post, campaign, and reel was thoughtfully planned, helping us increase engagement and strengthen our online presence.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Working with Bombay Blokes has been a fantastic experience. Their ability to combine creativity with strategy has made a noticeable difference in our brand visibility and audience engagement.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "The creativity, consistency, and professionalism of the Bombay Blokes team are exceptional. They truly understand how to create content that connects with the right audience.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "From content creation to social media management, every deliverable exceeded our expectations. The team is proactive, innovative, and genuinely invested in our brand's growth.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Review",
      text: "Bombay Blokes doesn't just post content—they build brands. Their strategic approach, creative excellence, and dedication to delivery exceeded our expectations.",
      name: "~ Client Review",
      maintext: "★★★★★ 5/5",
    },
  ],

  
  "website-development": [
  {
    brand: "Client Review",
    text: "Young, energetic team with a sharp eye for modern design. Creative, fresh ideas delivered with a smooth, collaborative process.",
    name: "~ Monil Shah",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "The Feline Foundation",
    text: "BB built The Feline Foundation's website and nailed the brief perfectly — warm, impactful, and nothing like a typical non-profit site. It drives real fundraising and volunteering results.",
    name: "~ Pallavi Kamath",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Incredible work on our website, especially the complex mascot animations. Patient, skilled team — highly recommend for anything creative and technical.",
    name: "~ Jash Chheda",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Transparent, fast, and high quality across both app development and marketing. A team that genuinely goes the extra mile and earns your trust.",
    name: "~ Akshat Adani",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Helped us launch our e-commerce website from scratch with patience and expertise. Highly recommend Bombay Blokes for web development.",
    name: "~ Chirag Vora",
    maintext: "★★★★★ 5.0",
  },
],
};
type Testimonial = {
  brand: string;
  text: string;
  name: string;
  maintext: string;
};

const AdsTestimonialsSection = () => {
  const { department } = useParams();

  const testimonialList: Testimonial[] =
    testimonials[
      (department as keyof typeof testimonials) ?? "paid-marketing"
    ] || testimonials["paid-marketing"];

  const [currentGroup, setCurrentGroup] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 15 },
      },
    },
    slideChanged(slider) {
      const perGroup = Math.ceil(testimonialList.length / 3);
      const currentIdx = slider.track.details.rel;
      setCurrentGroup(Math.floor(currentIdx / perGroup));
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="container py-10 sm:py-15 lg:py-20 relative">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="black-text lg:w-[950px] mx-auto">
          Trusted By <span className="text-highlight">200+ </span> Companies
        </h2>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {testimonialList.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide overflow-hidden relative"
          >
            <div className="flex flex-col justify-between h-full w-full bg-black shadow-lg rounded-[20px] p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-3 sm:w-5 md:w-5 candy-border"></div>

              <h5 className="text-highlight text-left z-10 relative">
                {item.maintext}
              </h5>

              <p className="white-text mt-2 subtitle z-10 relative">
                {item.text}
              </p>

              <div className="flex flex-col text-left z-10 relative mt-2">
                <p className="font-medium white-text">{item.name}</p>
                <p className="text-sm white-text">{item.brand}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentGroup === dot ? "bg-yellow-400" : "bg-gray-400"
            }`}
            onClick={() => {
              const perGroup = Math.ceil(testimonialList.length / 3);
              instanceRef.current?.moveToIdx(dot * perGroup);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdsTestimonialsSection;