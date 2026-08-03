import Navbar from "../components/Navbar";
import Firstsection from "../components/Blogs/Firstsection";
import SecondSection from "../components/Blogs/SecondSection";
import SeventhSection from "../components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "../components/Footer";
import Taxi from "../components/Taxi";
import SmoothScroll from "@/app/components/SmoothScroll";
import { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Blogs | Digital Agency | Bombay Blokes",
  description:
    "Bombay Blokes is a leading digital marketing company in Mumbai, our blogs are well- researched in the field of digital marketing",
};

export default async function BlogsPage() {
  const initialBlogs = await getPublishedBlogs();

  return (
    <div>
      <SmoothScroll>
        <Taxi />
        <Navbar />
        <Firstsection />
        <SecondSection initialBlogs={initialBlogs} />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
}
