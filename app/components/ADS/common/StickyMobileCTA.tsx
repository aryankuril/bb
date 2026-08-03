"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import type { StickyCTAContent } from "../types";

type Props = {
  content: StickyCTAContent;
};

export default function StickyMobileCTA({ content }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-black/5 bg-white/90 backdrop-blur-xl px-4 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
      role="region"
      aria-label="Mobile call to action"
    >
      <div className="container flex items-center justify-between gap-3 !px-0">
        <p className="subtitle flex-1 leading-snug">{content.text}</p>
        <Button text={content.cta} href={content.ctaHref} className="shrink-0" />
      </div>
    </div>
  );
}
