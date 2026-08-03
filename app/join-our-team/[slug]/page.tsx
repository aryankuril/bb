import React from "react";
import Navbar from "@/app/components/Navbar";
import Firstsection from "@/app/components/Career/Firstsection";
import SecondSectionId from "@/app/components/Career/SecondSectionId";
import ThirdSection from "@/app/components/Career/ThirdSection";
import SeventhSection from "@/app/components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "@/app/components/Footer";
import Taxi from "@/app/components/Taxi";
import SmoothScroll from "@/app/components/SmoothScroll";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCareerCategories,
  getPublishedCareerByIdentifier,
} from "@/lib/server-data";

// Career records can change outside deploys. Always render the current job on
// the server so crawlers and View Source receive the job description.
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const career = await getPublishedCareerByIdentifier(slug);

  if (!career) return { title: "Career Not Found | Bombay Blokes" };

  return {
    title: `${career.title} | Careers at Bombay Blokes`,
    description: `Apply for the ${career.title} role at Bombay Blokes.`,
  };
};

const Index = async ({ params }: Props) => {
  const { slug } = await params;
  const [career, categories] = await Promise.all([
    getPublishedCareerByIdentifier(slug),
    getCareerCategories(),
  ]);

  if (!career) notFound();

  return (
    <div>
      <SmoothScroll>
        <Taxi />
        <Navbar />
        <Firstsection />
        <SecondSectionId
          initialJobs={[career]}
          initialCategories={categories}
          initialJobId={slug}
        />
        <ThirdSection />
        <SeventhSection />
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Index;
