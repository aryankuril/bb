"use client";

import React from "react";
import BlogForm from "../../components/BlogForm";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Create New Blog</h2>
        <button
          onClick={() => router.back()}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      <BlogForm
        onSuccess={() => {
          alert("Blog created");
          router.push("/admin/blogs");
        }}
      />
    </div>
  );
}
