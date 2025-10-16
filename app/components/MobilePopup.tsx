// components/MobilePopup.tsx
"use client";

import { useEffect, useState } from "react";

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
    <div className="fixed inset-0 bg-black/80 z-99999 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white  rounded-lg shadow-lg p-6 w-11/12 max-w-sm text-center">
        {/* <h2 className="text-lg font-semibold mb-4">
          Mobile Version Coming Soon!
        </h2> */}
        <p className="body1 mb-6">
         We are working on the mobile version now. Please visit the desktop site for the full experience.

        </p>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-[#FAB31E] text-white px-4 py-2 rounded "
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MobilePopup;
