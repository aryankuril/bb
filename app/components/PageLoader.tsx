"use client";
import Image from "next/image";

import { useState, useEffect, ReactNode } from "react";

interface PageLoaderProps {
  children?: ReactNode; // 👈 make children optional
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const handleLoad = () => setLoading(false);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] flex h-dvh w-screen items-center justify-center overflow-hidden bg-white">
        <Image
          width={40}
          height={40}
          src="/images/BB-web-chai-1.gif"
          alt="Loading..."
          className="w-100 h-100"
        />
      </div>
    );
  }

  return <>{children}</>;
}
