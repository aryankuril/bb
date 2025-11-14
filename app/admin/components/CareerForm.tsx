"use client";

import React, { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";

const Embed = require("@editorjs/embed");

// ✅ sanitize undefined/null recursively
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

export default function CareerForm({ existingCareer }: { existingCareer?: any }) {
  const [title, setTitle] = useState(existingCareer?.title || "");
  const [isImmediate, setIsImmediate] = useState(existingCareer?.isImmediate || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editorRef = useRef<EditorJS | null>(null);
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Init EditorJS
  useEffect(() => {
    if (!editorContainer.current) return;
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: editorContainer.current,
        data: existingCareer?.description || undefined,
        autofocus: true,
        placeholder: "Write career details here...",
        inlineToolbar: ["link", "bold", "italic"],
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
                  // optional: handle image upload
                  return { success: 1, file: { url: URL.createObjectURL(file) } };
                },
              },
            },
          },
        },
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }
  }, [editorContainer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const editorData: OutputData | undefined = await editorRef.current?.save();
      const cleanData = sanitizeData(editorData);

      const careerData = {
        title,
        description: cleanData,
        isImmediate,
        ...(existingCareer ? { updatedAt: serverTimestamp() } : { postedAt: serverTimestamp() }),
      };

      if (existingCareer) {
        const ref = doc(db, "careers", existingCareer.id);
        await updateDoc(ref, careerData);
        toast.success("Career updated successfully");
      } else {
        await addDoc(collection(db, "careers"), careerData);
        toast.success("Career added successfully");
      }

      router.push("/admin/careers");
    } catch (err) {
      console.error(err);
      setError("Failed to save career details");
      toast.error("Error saving career");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-md space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <div
          ref={editorContainer}
          className="border rounded-md p-4 min-h-[200px]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Is Immediate Hiring?</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={isImmediate === true}
              onChange={() => setIsImmediate(true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={isImmediate === false}
              onChange={() => setIsImmediate(false)}
            />
            No
          </label>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Saving..." : existingCareer ? "Update Career" : "Add Career"}
      </button>
    </form>
  );
}
