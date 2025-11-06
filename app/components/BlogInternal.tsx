"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type BlogData = {
  title: string;
  description: string;
  imageUrl?: string;
  postedAt?: { seconds: number; nanoseconds: number };
};

interface Props {
  id: string;
}

const BlogInternal = ({ id }: Props) => {
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const ref = doc(db, "blogs", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setBlog(snap.data() as BlogData);
    };
    fetchBlog();
  }, [id]);

if (!blog) return null;


  return (
    <div className="container py-0 sm:py-15 lg:py-40 -mt-10">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="object-fit w-full lg:h-[80vh] h-auto rounded-2xl"
        />
      )}
      <div className="py-10">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <div
  className="text-gray-700 leading-relaxed prose max-w-none"
  dangerouslySetInnerHTML={{ __html: blog.description }}
></div>

      </div>
    </div>
  );
};

export default BlogInternal;
