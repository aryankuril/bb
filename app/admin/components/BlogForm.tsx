"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { storage, db, auth } from "@/lib/firebase";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc as firestoreDoc,
} from "firebase/firestore";

type BlogData = {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
};

type Props = {
  initial?: BlogData;
  onSuccess?: () => void;
};

// 👇 Category options
const CATEGORY_OPTIONS = [
  "WEB DEVELOPMENT",
  "UX/UI DESIGNING",
  "SOCIAL MEDIA",
  "PERFORMANCE MARKETING",
  "DESIGN & BRANDING",
  "SEO",
  "GEO",
];

export default function BlogForm({ initial, onSuccess }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORY_OPTIONS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(
    initial?.imageUrl ?? undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Image preview
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;

    if (f.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setFile(f);
    setError(null);
  };

  // ✅ Upload image to Firebase
  const uploadImageAndGetURL = async (f: File): Promise<string> => {
    const fileName = `${Date.now()}_${f.name}`;
    const sRef = storageRef(storage, `blogimages/${fileName}`);
    const uploadTask = uploadBytesResumable(sRef, f);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        undefined,
        reject,
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      let imageUrl = initial?.imageUrl ?? "";
      if (file) imageUrl = await uploadImageAndGetURL(file);

      if (initial?.id) {
        // Update existing blog
        const ref = firestoreDoc(db, "blogs", initial.id);
        await updateDoc(ref, {
          title,
          description,
          imageUrl,
          category,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create new blog
        await addDoc(collection(db, "blogs"), {
          title,
          description,
          imageUrl,
          category,
          postedAt: serverTimestamp(),
          authorId: auth.currentUser?.uid ?? null,
        });
      }

      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter blog title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="w-full border rounded px-3 py-2"
          placeholder="Write the blog description"
        />
      </div>

      {/* 👇 Category Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />
        {preview && (
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">Preview</div>
            <img
              src={preview}
              alt="preview"
              className="max-h-48 rounded object-cover"
            />
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex gap-2">
        <button
          onClick={handleCreate}
          disabled={loading || !title.trim() || !description.trim()}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : initial?.id ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </div>
  );
}
