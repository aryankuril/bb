import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import BlogInternal from "@/app/components/BlogInternal";
import { Metadata } from "next";
import { getBlogBySlug } from "@/lib/server-data";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Bombay Blokes",
    };
  }

  return {
    title: `${blog.title} | Bombay Blokes`,
    description:
      typeof blog.description === "string"
        ? blog.description
        : "Read the latest from Bombay Blokes",
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <SmoothScroll>
      <Navbar />
      <BlogInternal blog={blog} />
      <Footer />
    </SmoothScroll>
  );
}
