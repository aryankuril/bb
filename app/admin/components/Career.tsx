"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import CareerCard from "../components/CareerCard";

interface Career {
  id: string;
  title: string;
  description: string;
  isImmediate: boolean;
  postedAt: { seconds: number };
}

export default function Career() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "careers"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Career[];
        setCareers(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch careers");
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career?")) return;
    await deleteDoc(doc(db, "careers", id));
    setCareers((prev) => prev.filter((c) => c.id !== id));
    toast.success("Career deleted successfully");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Careers Management</h3>
        <Link
          href="/admin/careers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Career
        </Link>
      </div>

      {loading ? (
        <p>Loading careers...</p>
      ) : careers.length === 0 ? (
        <p>No careers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
