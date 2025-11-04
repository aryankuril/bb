"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type BlogData = {
  title: string;
  description: string;
  imageUrl?: string;
  postedAt?: { seconds: number; nanoseconds: number };
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const ref = doc(db, "blogs", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) setBlog(snap.data() as BlogData);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-20">Loading blog...</p>;

  return (
    <div className="container  py-0 sm:py-15 lg:py-20  -mt-10 ">
      {/* Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
           className="object-fit w-full lg:h-[80vh] h-auto rounded-2xl"
        />
      )}

      {/* Content */}
      <div className="py-10">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.description}
        </p>
      </div>
    </div>
  );
}
