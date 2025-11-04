"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; // ← make sure this points to your Firebase setup
import Link from "next/link";

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

type BlogData = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  postedAt?: { seconds: number; nanoseconds: number };
};

const SecondSection = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(8);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("postedAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogData[];
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Adjust visible blogs per device
  useEffect(() => {
    setVisibleCount(isMobile ? 4 : 8);
  }, [isMobile, selectedCategory]);

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter blogs by category
  const filteredBlogs =
    selectedCategory === "ALL"
      ? blogs
      : blogs.filter(
          (b) => b.category?.toUpperCase() === selectedCategory.toUpperCase()
        );

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(filteredBlogs.length);
  };

  return (
    <section id="second-section" className="w-full container py-10 sm:py-15 lg:py-20">
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
              selectedCategory === cat
                ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                : "bg-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Title + Slider */}
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex-col justify-between items-start mb-10">
          <h2 className="black-text">{sliderData[current].title}</h2>
          <div className="mt-6 lg:mt-10">
            <Button href="#" text="EXPLORE OUR WORK" className="lg:mt-10" />
          </div>
        </div>

        {/* Slider Image + Dots */}
        <div className="flex-1 mb-12 flex flex-col lg:flex-row w-full relative">
          <div className="mr-[50px] lg:w-[600px] w-full h-[400px] bg-gray-100 rounded-2xl transition-all duration-500 overflow-hidden ml-auto">
            <img
              src={sliderData[current].image}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-2 gap-5 lg:pr-4">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-6 h-6 font-['Poppins'] border rounded-full flex items-center justify-center text-xs cursor-pointer 
                  ${
                    current === index
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-gray-600"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {visibleBlogs.map((blog) => (
          <div key={blog.id} className="flex flex-col gap-2">
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="lg:w-[320px] w-full h-[291px] object-cover rounded-[30px]"
              />
            ) : (
              <div className="lg:w-[320px] w-full h-[291px] bg-gray-200 rounded-[30px]" />
            )}
            <h5 className="px-1 black-text">{blog.title}</h5>
            <p className="px-1 grey-text body4">
              {blog.postedAt
                ? new Date(blog.postedAt.seconds * 1000).toDateString()
                : "Recent"}{" "}
              – 3min Read
            </p>
            <Link
              href={`/blogs/${blog.id}`}
              className="px-1 body3 black-text underline"
            >
              Read More
            </Link>
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
