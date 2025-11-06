"use client";

import React, { useEffect, useState } from "react";
import BlogForm from "../../components/BlogForm";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Blog = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id") ?? ""; // Next.js App Router dynamic param mapping depends on your folder naming; using searchParams fallback
  // But since this file is at app/admin/blogs/[id]/page.tsx, we can also use useParams() in future

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get id from URL if possible (useParams not available in this pattern in some Next versions)
    // Fallback: parse from window.location
    async function fetchItem() {
      try {
        // try searchParams id first (supported)
        let docId = id;
        if (!docId) {
          const urlParts = window.location.pathname.split("/");
          docId = urlParts[urlParts.length - 1];
        }

        const ref = doc(db, "blogs", docId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          alert("Blog not found");
          router.push("/admin/blogs");
          return;
        }
        setBlog({ id: snap.id, ...(snap.data() as any) });
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id, router]);

if (loading) return null;  // ✅ allow layout's PageLoader to show
if (!blog) return null;


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Edit Blog</h3>
        <button
          onClick={() => router.back()}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      <BlogForm
  initial={{
    id: blog.id,
    title: blog.title,
    description: blog.description,
    imageUrl: blog.imageUrl,
    category: (blog as any).category ?? "",
    scheduledAt: (blog as any).scheduledAt
      ? new Date((blog as any).scheduledAt.seconds * 1000)
      : undefined, // ✅ pass Firestore timestamp as JS Date
  }}
  onSuccess={() => {
    alert("Blog updated");
    router.push("/admin/blogs");
  }}
/>


    </div>
  );
}
