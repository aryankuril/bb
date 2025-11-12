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

import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import RawTool from "@editorjs/raw";
import Checklist from "@editorjs/checklist";

const Embed = require("@editorjs/embed");

// ✅ Helper — sanitize undefined/null recursively
function sanitizeData(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data
      .map((item) => sanitizeData(item))
      .filter((item) => item !== undefined && item !== null);
  } else if (typeof data === "object" && data !== null) {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        cleanObj[key] = sanitizeData(value);
      }
    }
    return cleanObj;
  }
  return data;
}

const createSlug = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

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

export default function BlogForm({ initial, onSuccess }: { initial?: any; onSuccess: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initial?.imageUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultDate = initial?.scheduledAt
    ? new Date(initial.scheduledAt)
    : new Date();

  const [publishDate, setPublishDate] = useState(defaultDate.toISOString().split("T")[0]);
  const [publishTime, setPublishTime] = useState(defaultDate.toTimeString().slice(0, 5));

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => setSlug(createSlug(title)), [title]);

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
          checklist: Checklist,
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
        inlineToolbar: ["link", "bold", "italic"],
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }
  }, []);

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
      const editorData: OutputData | undefined = await editorRef.current?.save();
      const cleanEditorData = sanitizeData(editorData);

      let imageUrl = initial?.imageUrl ?? "";
      if (file) imageUrl = await uploadImageAndGetURL(file);

      const finalSlug = createSlug(title);
      const finalCategory = category?.trim() || "ALL";

      const dt = new Date(`${publishDate}T${publishTime}:00`);
      const scheduledAt = Timestamp.fromDate(dt);

      const blogData = {
        title,
        slug: finalSlug,
        description: cleanEditorData,
        imageUrl,
        category: finalCategory,
        scheduledAt,
        ...(initial?.id
          ? { updatedAt: serverTimestamp() }
          : {
              postedAt: serverTimestamp(),
              authorId: auth.currentUser?.uid ?? null,
            }),
      };

      if (initial?.id) {
        const ref = firestoreDoc(db, "blogs", initial.id);
        await updateDoc(ref, blogData);
      } else {
        await addDoc(collection(db, "blogs"), blogData);
      }

      onSuccess?.();
      // alert("✅ Blog saved successfullg
    } catch (err: unknown) {
      console.error("🔥 Error creating blog:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to save blog";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter blog title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
       <div
  ref={editorContainer}
  className="border rounded w-full p-4 text-left"
  style={{
    overflowY: "auto",
    minHeight: "300px",
    lineHeight: "1.6",
    fontSize: "16px",
  }}
></div>

      </div>

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

      <div>
        <label className="block text-sm font-medium mb-1">Publish Date</label>
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Publish Time</label>
        <input
          type="time"
          value={publishTime}
          onChange={(e) => setPublishTime(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

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

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : initial?.id ? "Update Blog" : "Create Blog"}
      </button>
    </div>
  );
}
