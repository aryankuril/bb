// components/MobilePopup.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MobilePopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile || !showPopup) return null;

  return (
    <div className="fixed inset-0 bg-white z-99999 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white  rounded-lg  p-6 w-11/12 max-w-sm text-center">
      <div className="flex items-center justify-center py-10">
  <Link href="/">
    <Image
      src="/images/bblogo.webp"
      alt="Bombay Blokes Logo"
      width={200}
      height={1000}
      className="object-contain transition-opacity duration-300"
    />
  </Link>
</div>

        <p className="body1 mb-6">
        Our mobile experience is temporarily under Diwali maintenance 🎆.Our mobile site will sparkle again after Diwali.

        </p>

        <h1>Happy Diwali 🪔</h1>
        {/* <button
          onClick={() => setShowPopup(false)}
          className="bg-[#FAB31E] text-white px-4 py-2 rounded "
        >
          OK
        </button> */}
      </div>
    </div>
  );
};

export default MobilePopup;
