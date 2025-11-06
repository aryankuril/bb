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
import Button from "@/app/components/Button";
import {
  FormInput,
  FolderOpen,
  Users,
  LogOut,
  ExternalLink,
  Edit,
  Trash,
  ChevronDown,
   ChevronRight,
  Building,
   BarChart3,   // ✅ icon
} from 'lucide-react';

type Blog = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  scheduledAt?: any;
  postedAt?: any;
  isPublished?: boolean;
  authorId?: string | null;
  category?: string;
};


const Blogs = () => {
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
        <h3 className="text-2xl font-semibold">Blogs</h3>


        <Button
      href="/admin/blogs/new"
      text="New Blog"
      className="text-black font-semibold"
    />
        {/* <Button>
        <Link
          href="/admin/blogs/new"
          className=" text-white"
        >
          New Blog
        </Link>
        </Button> */}
      </div>

      {/* Blogs List */}
      <div>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-600">No blogs yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((b) => {
              const showDate = b.scheduledAt || b.postedAt;
              const formattedDate = showDate
  ? (() => {
      const d = new Date(showDate.seconds * 1000);

      const day = d.getDate();
      const month = d.toLocaleString("en-US", { month: "long" });
      const year = d.getFullYear();

      const time = d.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return `${day} ${month}, ${year} ${time}`;
    })()
  : "Recent";


              // Check if scheduled date is in past
              const isLive =
                b.scheduledAt?.seconds &&
                new Date(b.scheduledAt.seconds * 1000) <= new Date();

              return (
                <div key={b.id} className="bg-white rounded shadow p-4 flex flex-col">
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
                  <h5 className="font-semibold">{b.title}</h5>

                  {/* Category & Time */}
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                    {b.category && b.category !== "All" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {b.category}
                      </span>
                    )}

                    {/* Date */}
                    {showDate?.seconds && (
                      <span className="text-gray-500">{formattedDate}</span>
                    )}

                    {/* Scheduled / Posted Badge */}
                    {b.scheduledAt?.seconds && !b.isPublished ? (
                      isLive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Posted
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                          Scheduled
                        </span>
                      )
                    ) : b.postedAt?.seconds ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Posted
                      </span>
                    ) : null}
                  </div>

                  {/* Description */}
                  <div
  className="
    text-sm text-gray-600 
    line-clamp-3 
    mt-2 
    prose 
    prose-p:m-0 
    prose-p:text-sm 
    prose-p:leading-snug 
    max-w-none
  "
  dangerouslySetInnerHTML={{ __html: b.description }}
></div>


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
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs