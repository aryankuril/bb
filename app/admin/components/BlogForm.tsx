"use client";
import React, { useEffect, useRef, useState } from "react";
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
  Timestamp,
} from "firebase/firestore";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import RawTool from "@editorjs/raw";
import Checklist from "@editorjs/checklist";
import Button from "@/app/components/Button";
const Embed = require("@editorjs/embed");

const CATEGORY_OPTIONS = [
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
  id?: string;
  slug: string;
  title: string;
  description: any;
  imageUrl?: string;
  category?: string;
  scheduledAt?: any;
};

type Props = {
  initial?: BlogData;
  onSuccess?: () => void;
};

const createSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function BlogForm({ initial, onSuccess }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(initial?.imageUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load date & time when editing
  const defaultDate = initial?.scheduledAt
    ? new Date(initial.scheduledAt)
    : new Date();

  const [publishDate, setPublishDate] = useState(
    defaultDate.toISOString().split("T")[0]
  );

  const [publishTime, setPublishTime] = useState(
    defaultDate.toTimeString().slice(0, 5)
  );

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlug(createSlug(title));
  }, [title]);

  // ✅ Initialize EditorJS ONLY once
  useEffect(() => {
    if (!editorContainer.current) return;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: editorContainer.current,
        data: initial?.description || undefined,
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          embed: Embed,
          raw: RawTool,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await uploadImageAndGetURL(file);
                  return { success: 1, file: { url } };
                },
              },
            },
          },
        },
        placeholder: "Write your blog content here...",
        inlineToolbar: true,
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }
  }, []);

  // ✅ Image preview
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }
    setFile(f);
    setError(null);
  };

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
      const editorData = await editorRef.current?.save();

      let imageUrl = initial?.imageUrl ?? "";
      if (file) imageUrl = await uploadImageAndGetURL(file);

      const finalSlug = createSlug(title);
      const finalCategory = category?.trim() || "ALL";

      const dt = new Date(`${publishDate}T${publishTime}:00`);
      const scheduledAt = Timestamp.fromDate(dt);

      if (initial?.id) {
        // ✅ Update blog
        const ref = firestoreDoc(db, "blogs", initial.id);
        await updateDoc(ref, {
          title,
          slug: finalSlug,
          description: editorData,
          imageUrl,
          category: finalCategory,
          scheduledAt,
          updatedAt: serverTimestamp(),
        });
      } else {
        // ✅ Create new blog
        await addDoc(collection(db, "blogs"), {
          title,
          slug: finalSlug,
          description: editorData,
          imageUrl,
          category: finalCategory,
          scheduledAt,
          postedAt: serverTimestamp(),
          authorId: auth.currentUser?.uid ?? null,
        });
      }

      onSuccess?.();
    } catch (err: any) {
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
        <div
          ref={editorContainer}
          className="border rounded min-w-[550px] w-full prose max-w-full prose-img:rounded prose-img:max-h-80"
          style={{ overflowY: "auto" }}
        ></div>
      </div>

      {/* Category */}
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

      {/* Publish Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Publish Date</label>
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Publish Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Publish Time</label>
        <input
          type="time"
          value={publishTime}
          onChange={(e) => setPublishTime(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
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

     <Button
  onClick={handleCreate}
  disabled={loading}
  className="mt-4"
  text={loading ? "Saving..." : initial?.id ? "Update Blog" : "Create Blog"}
/>

    </div>
  );
}
