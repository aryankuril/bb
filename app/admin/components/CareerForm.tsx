"use client";

import { useState } from "react";
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
import Button from "@/app/components/Button";

export default function CareerForm({
  existingCareer,
}: {
  existingCareer?: any;
}) {
  const [title, setTitle] = useState(existingCareer?.title || "");
  const [description, setDescription] = useState(
    existingCareer?.description || ""
  );
  const [isImmediate, setIsImmediate] = useState(
    existingCareer?.isImmediate || false
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (existingCareer) {
        const ref = doc(db, "careers", existingCareer.id);
        await updateDoc(ref, { title, description, isImmediate });
        toast.success("Career updated successfully");
      } else {
        await addDoc(collection(db, "careers"), {
          title,
          description,
          isImmediate,
          postedAt: serverTimestamp(),
        });
        toast.success("Career added successfully");
      }
      router.push("/admin/careers");
    } catch (error) {
      console.error(error);
      toast.error("Error saving career");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-md "
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Is Immediate Hiring?
        </label>
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

      {/* <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : existingCareer
          ? "Update Career"
          : "Add Career"}
      </button> */}


      <Button
  disabled={loading}
  className="mt-4"
  text={loading ? "Saving..."  : existingCareer?.id ? "Update Career" : "Add Career"}
/>
    </form>
  );
}
