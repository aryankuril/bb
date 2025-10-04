"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button";

const sliderData = [
  { id: 1, image: "images/section1-img1.png", title: "Next JS & React Components" },
  { id: 2, image: "images/section1-img2.png", title: "UX/UI Design Projects" },
  { id: 3, image: "images/section1-img3.png", title: "Performance Campaigns" },
  { id: 4, image: "images/section1-img4.png", title: "SEO & Branding Solutions" },
];

const categories = [
  "ALL",
  "WEB DEVELOPMENT",
  "UX/UI DESIGNING",
  "SOCIAL MEDIA",
  "PERFORMANCE MARKETING",
  "DESIGN & BRANDING",
  "SEO",
  "GEO",
];

// Blogs data with category
const blogs = [
  { id: 1, title: "Next JS Blog 1", date: "Dec 4 2024", category: "WEB DEVELOPMENT" },
  { id: 2, title: "Next JS Blog 2", date: "Dec 5 2024", category: "WEB DEVELOPMENT" },
  { id: 3, title: "React Blog 1", date: "Dec 6 2024", category: "WEB DEVELOPMENT" },
  { id: 4, title: "UI Design Blog 1", date: "Dec 7 2024", category: "UX/UI DESIGNING" },
  { id: 5, title: "UI Design Blog 2", date: "Dec 8 2024", category: "UX/UI DESIGNING" },
  { id: 6, title: "Social Media Blog 1", date: "Dec 9 2024", category: "SOCIAL MEDIA" },
  { id: 7, title: "Performance Blog 1", date: "Dec 10 2024", category: "PERFORMANCE MARKETING" },
  { id: 8, title: "SEO Blog 1", date: "Dec 11 2024", category: "SEO" },
  { id: 9, title: "Design Branding Blog 1", date: "Dec 12 2024", category: "DESIGN & BRANDING" },
  { id: 10, title: "GEO Blog 1", date: "Dec 13 2024", category: "GEO" },
];

const SecondSection = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(8);

  // Detect screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Set initial count depending on device
  useEffect(() => {
    setVisibleCount(isMobile ? 4 : 8);
  }, [isMobile, selectedCategory]);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter blogs
  const filteredBlogs =
    selectedCategory === "ALL"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  // Visible blogs
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  // Load more
  const handleLoadMore = () => {
    setVisibleCount(filteredBlogs.length);
  };

  return (
    <section className="w-full container py-10 sm:py-15 lg:py-20">
      {/* Category Filter */}
<div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide flex-nowrap">
  {categories.map((cat, i) => (
    <button
      key={i}
      onClick={() => {
        setSelectedCategory(cat);
        setVisibleCount(isMobile ? 4 : 8);
      }}
      className={`px-4 py-2 border body3 rounded-full cursor-pointer shrink-0 hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] ${
        selectedCategory === cat ? "bg-[var(--color-primary)] text-[var(--color-secondary)]" : "bg-transparent"
      }`}
    >
      {cat}
    </button>
  ))}
</div>


      {/* Title & CTA */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex-col justify-between items-start mb-10">
          <div
            className="black-text single-title"
          >
            {sliderData[current].title}
          </div>
          <div className="mt-6 lg:mt-10">
            <Button href="#" text="EXPLORE OUR WORK " className="lg:mt-10" />
          </div>
        </div>

        {/* Slider */}
        <div className="flex-1 mb-12 flex flex-col lg:flex-row w-full relative">
          {/* Image */}
          <div className="mr-[50px] lg:w-[600px] w-full h-[400px] bg-gray-100 rounded-2xl transition-all duration-500 overflow-hidden ml-auto">
            <img
              src={sliderData[current].image}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-2 gap-5 lg:pr-4">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-6 h-6 font-['Poppins'] border rounded-full flex items-center justify-center text-xs cursor-pointer 
                  ${current === index ? "bg-yellow-400 text-black" : "bg-white text-gray-600"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {visibleBlogs.map((blog) => (
          <div key={blog.id} className="flex flex-col gap-2">
            <div className="lg:w-[320px] w-full h-[291px] bg-gray-200 rounded-[30px]"></div>
            <h5 className="px-1 black-text">
              {blog.title}
            </h5>
            <p className="px-1 grey-text body4">
              {blog.date} – 3min Read
            </p>
            <a
              href="#"
              className="px-1 body3 black-text underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < filteredBlogs.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="border px-6 py-2 rounded-full text-sm cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </section>
  );
};

export default SecondSection;
