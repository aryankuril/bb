"use client";

import React, { useEffect, useState, ChangeEvent, useRef } from "react";
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

import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ChevronDown } from "lucide-react";

type BlogData = {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  scheduledAt?: Date;
};

type Props = {
  initial?: BlogData;
  onSuccess?: () => void;
};

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

export default function BlogForm({ initial, onSuccess }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(initial?.imageUrl);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Date Picker Open/Close
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  // ✅ Correct initial date
  const initialDate = initial?.scheduledAt
    ? new Date(initial.scheduledAt)
    : new Date();

  // ✅ Correct TypeScript-safe DateRange state
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: initialDate,
      endDate: initialDate,
      key: "selection",
    },
  ]);

  // ✅ Initial time from scheduledAt
// ✅ Initial time from scheduledAt (Fixed — uses local time)
const initialTime = initial?.scheduledAt
  ? new Date(initial.scheduledAt).toISOString().slice(11, 16)
  : (() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      return `${hh}:${mm}`;
    })();



const [selectedTime, setSelectedTime] = useState(initialTime);

const format12Hour = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
};

  // ✅ Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setOpenDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Preview image
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
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

      // ✅ Combine Date + Time safely
      const baseDate = dateRange[0].startDate
        ? new Date(dateRange[0].startDate)
        : new Date();

      const [hh, mm] = selectedTime.split(":");
      baseDate.setHours(Number(hh));
      baseDate.setMinutes(Number(mm));

      const scheduledDate = Timestamp.fromDate(baseDate);
      const now = new Date();

      const isPublished = baseDate <= now;
      const finalCategory = category?.trim() || "ALL";

      if (initial?.id) {
        const ref = firestoreDoc(db, "blogs", initial.id);
        await updateDoc(ref, {
          title,
          description,
          imageUrl,
          category: finalCategory,
          scheduledAt: scheduledDate,
          isPublished,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "blogs"), {
          title,
          description,
          imageUrl,
          category: finalCategory,
          scheduledAt: scheduledDate,
          postedAt: serverTimestamp(),
          isPublished,
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
  contentEditable
  className="w-full border rounded px-3 py-2 min-h-[200px] focus:outline-none"
  onInput={(e) => setDescription((e.target as HTMLDivElement).innerHTML)}
  dangerouslySetInnerHTML={{ __html: description }}
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

      {/* ✅ Date + Time Picker */}
      <div ref={dateRef} className="relative">
        <label className="block text-sm font-medium mb-1">
          Publish Date & Time
        </label>

        <div
          onClick={() => setOpenDatePicker(!openDatePicker)}
          className="border rounded px-4 py-2 cursor-pointer flex justify-between items-center"
        >
          <span>
            {dateRange[0].startDate?.toDateString()} {" • "} {format12Hour(selectedTime)}

          </span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {openDatePicker && (
          <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-lg p-2">
            <DateRange
              editableDateInputs
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              onChange={(item) => {
                if (item.selection) {
                  setDateRange([item.selection as Range]);
                }
              }}
            />

            <div className="mt-3 px-2 pb-2">
              <label className="text-sm font-medium">Select Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1">
          Select future date & time to schedule publishing.
        </p>
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
        disabled={loading || !title.trim() || !description.trim()}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : initial?.id ? "Update Blog" : "Create Blog"}
      </button>
    </div>
  );
}
