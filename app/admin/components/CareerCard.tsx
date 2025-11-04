"use client";

import Link from "next/link";

interface Career {
  id: string;
  title: string;
  description: string;
  isImmediate: boolean;
  postedAt: { seconds: number };
}

export default function CareerCard({
  career,
  onDelete,
}: {
  career: Career;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg">{career.title}</h2>
        <div className="flex gap-2">
          <Link
            href={`/admin/careers/${career.id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(career.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 mt-2 line-clamp-3">{career.description}</p>

      {career.isImmediate && (
        <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          IMMEDIATE
        </span>
      )}

      <p className="text-sm text-gray-500 mt-2">
        Posted on:{" "}
        {new Date(career.postedAt?.seconds * 1000).toLocaleDateString()}
      </p>

      {/* ✅ Added View button */}
      <div className="mt-4">
        <Link
          href="/join-our-team"
          className="inline-block bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
