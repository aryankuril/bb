"use client";

import React, { useEffect, useState } from "react";
import BlogForm from "../../components/BlogForm";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const slug = params.slug;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        if (!slug) {
          alert("Invalid slug");
          router.push("/admin/blogs");
          return;
        }

        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snap = await getDocs(q);

        if (snap.empty) {
          alert("Blog not found");
          router.push("/admin/blogs");
          return;
        }

        const data = snap.docs[0];

        setBlog({
          id: data.id,
          ...data.data(),
        });
      } catch (err) {
        console.error("Error loading blog:", err);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [slug, router]);

  if (loading || !blog) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Edit Blog</h3>
        <button onClick={() => router.back()} className="px-3 py-1 border rounded">
          Back
        </button>
      </div>

      <BlogForm
        initial={{
          id: blog.id,
          slug: blog.slug,
          title: blog.title,
          description: blog.description,
          imageUrl: blog.imageUrl,
          category: blog.category ?? "",
          scheduledAt: blog.scheduledAt
            ? new Date(blog.scheduledAt.seconds * 1000)
            : undefined,
        }}
        onSuccess={() => {
          alert("Blog updated");
          router.push("/admin/blogs");
        }}
      />
    </div>
  );
}
