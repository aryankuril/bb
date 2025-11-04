"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  postedAt?: any;
  authorId?: string | null;
  category?: string; // ✅ Added category
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("postedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items: Blog[] = [];
      snap.forEach((s) => items.push({ id: s.id, ...(s.data() as any) }));
      setBlogs(items);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog? This action cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "blogs", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <Link
          href="/admin/blogs/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          New Blog
        </Link>
      </div>

      {/* Blogs List */}
      <div>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-600">No blogs yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded shadow p-4 flex flex-col"
              >
                {/* Image */}
                {b.imageUrl ? (
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 rounded mb-3" />
                )}

                {/* Title */}
                <h3 className="font-semibold">{b.title}</h3>

                {/* ✅ Category & Time Row */}
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                  {b.category && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      {b.category}
                    </span>
                  )}

                  {/* <p className="text-sm text-gray-500 mt-2">
        Posted on:{" "}
        {new Date(b.postedAt?.seconds * 1000).toLocaleDateString()}
      </p> */}
                  {b.postedAt?.seconds && (
                    <span className="text-gray-500">
                      {new Date(b.postedAt.seconds * 1000).toLocaleDateString()}{" "}
                      {new Date(b.postedAt.seconds * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                  {b.description}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/blogs/${b.id}`}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={deleting === b.id}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm disabled:opacity-60"
                  >
                    {deleting === b.id ? "Deleting..." : "Delete"}
                  </button>
                  <a
                    href={`/blogs/${b.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 border rounded text-sm ml-auto"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
