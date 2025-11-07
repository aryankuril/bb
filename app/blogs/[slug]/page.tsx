import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import BlogInternal from "@/app/components/BlogInternal";

import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blogs | Digital Agency | Bombay Blokes",
  description: "Bombay Blokes is a leading digital marketing company in Mumbai, our blogs are well- researched in the field of digital marketing",
};

type BlogData = {
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  scheduledAt?: any;
  slug: string;
};

async function getBlog(slug: string): Promise<BlogData | null> {
  if (!slug) return null;

  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (snap.empty) return null;

    return snap.docs[0].data() as BlogData;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <div className="p-10 text-center text-2xl">Blog not found</div>
    );
  }

  return (
    <SmoothScroll>
      <Navbar />
      <BlogInternal blog={blog} />
      <Footer />
    </SmoothScroll>
  );
}
