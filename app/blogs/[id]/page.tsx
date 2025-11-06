import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
// import Taxi from "@/app/components/Taxi";
import SmoothScroll from "@/app/components/SmoothScroll";
import BlogInternal from "@/app/components/BlogInternal";
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type BlogData = {
  title: string;
  description: string;
};

interface PageProps {
  params: Promise<{ id: string }>;   // ✅ must be Promise now
}

// ✅ Dynamic metadata FIXED
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // ✅ must await params

  let title = "Blogs | Bombay Blokes";
  let description =
    "Bombay Blokes is a leading digital marketing company in Mumbai, our blogs are well-researched in the field of digital marketing";

  try {
    const ref = doc(db, "blogs", id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const blog = snap.data() as BlogData;
      title = `${blog.title} | Bombay Blokes`;
      description = blog.description;
    }
  } catch (err) {
    console.error("Failed to fetch blog for metadata:", err);
  }

  return { title, description };
}

// ✅ MAIN PAGE FIXED
const BlogPage = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ must await params

  return (
    <div>
      <SmoothScroll>
        {/* <Taxi /> */}
        <Navbar />
        <BlogInternal id={id} /> {/* ✅ safe now */}
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default BlogPage;
