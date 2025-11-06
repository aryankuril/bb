"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

type BlogData = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  postedAt?: { seconds: number; nanoseconds: number };
  scheduledAt?: { seconds: number; nanoseconds: number };
  isPublished?: boolean;
};

const SecondSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(8);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>(["ALL"]);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("scheduledAt", "desc"));
      const snapshot = await getDocs(q);

      // All blogs from Firestore
      const allBlogs: BlogData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<BlogData, "id">),
      }));

      // ✅ Collect all categories from ALL blogs (ignore scheduledAt/isPublished)
      // Collect all categories from ALL blogs, remove duplicate ALL
const categories = Array.from(
  new Set(
    allBlogs
      .map((b) => b.category?.trim())
      .filter((cat): cat is string => !!cat && cat.toUpperCase() !== "ALL")
  )
);
setAvailableCategories(["ALL", ...categories]);


      // ✅ Filter blogs for display only (published or scheduled date <= now)
      const now = new Date();
      const filteredBlogs = allBlogs.filter((b) => {
        if (!b.scheduledAt) return true;
        const publishDate = new Date(b.scheduledAt.seconds * 1000);
        return b.isPublished || publishDate <= now;
      });

      setBlogs(filteredBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setVisibleCount(isMobile ? 4 : 8);
  }, [isMobile, selectedCategory]);

  // Filter blogs by category for display
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
      {/* Category Buttons */}
      <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide flex-nowrap">
        {availableCategories.map((cat, i) => (
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

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {visibleBlogs.map((blog) => {
          const showDate = blog.scheduledAt || blog.postedAt;
          const formattedDate = showDate
  ? (() => {
      const d = new Date(showDate.seconds * 1000);
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    })()
  : "Recent";


          return (
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
                {formattedDate} – 3min Read
              </p>
              <Link
                href={`/blogs/${blog.id}`}
                className="px-1 body3 black-text underline"
              >
                Read More
              </Link>
            </div>
          );
        })}
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
