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
  const formattedDate = career.postedAt?.seconds
    ? (() => {
        const d = new Date(career.postedAt.seconds * 1000);
        const day = d.getDate();
        const month = d.toLocaleString("en-US", { month: "long" });
        const year = d.getFullYear();
        return `${day} ${month}, ${year}`;
      })()
    : "Recent";

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {/* ✅ Image Placeholder (Same Style as Blogs) */}
      

      {/* ✅ Title */}
      <h5 className="font-semibold">{career.title}</h5>

      {/* ✅ Tags (same badge style as blogs) */}
      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
        {career.isImmediate && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            Immediate Joiner
          </span>
        )}

        {/* ✅ Date */}
        <span className="text-gray-500">{formattedDate}</span>
      </div>

      {/* ✅ Description (same clamped layout as blogs) */}
      <p className="text-sm text-gray-600 line-clamp-3 mt-2">
        {career.description}
      </p>

      {/* ✅ Bottom buttons (same layout as blogs) */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/admin/careers/${career.id}`}
          className="px-3 py-1 border rounded text-sm"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(career.id)}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>

        <a
          href="/join-our-team"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 border rounded text-sm ml-auto"
        >
          View
        </a>
      </div>
    </div>
  );
}
