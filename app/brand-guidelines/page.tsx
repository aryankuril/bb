import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Guidelines | Bombay Blokes",
  description:"Explore the official Bombay Blokes brand guidelines, including logo usage, typography, color palette, imagery, tone of voice, and downloadable brand assets.",
};

export default function BrandGuidelines() {
  return (
    <iframe
      src="/brand-guidelines.html"
      className="w-full h-screen border-0"
    />
  );
}