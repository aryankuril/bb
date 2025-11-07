"use client";

type BlogData = {
  title: string;
  description: string;
  imageUrl?: string;
};

export default function BlogInternal({ blog }: { blog: BlogData }) {
  return (
    <div className="container py-10 sm:py-15 lg:py-40">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full lg:h-[80vh] h-auto rounded-2xl object-cover"
        />
      )}

      <div className="py-10">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>

        <div
          className="text-gray-700 leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
}
