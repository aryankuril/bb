"use client";

import { useState, useEffect } from "react";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[100vh] bg-white">
        <img
          src="/BB-web-chai-1.gif"
          alt="Loading..."
          className="w-100 h-100"
        />
      </div>
    );
  }

  return <>{children}</>;
}
