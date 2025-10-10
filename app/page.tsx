
"use client";

import Image from "next/image";

export default function Home() {
  return (
     <main className="flex flex-col items-center justify-center h-screen bg-[#F8F8F8] text-center px-6">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/images/logo.png" // 👈 replace with your actual logo path
          alt="Brand Logo"
          width={200}
          height={200}
          className="mx-auto "
        />
      </div>

      {/* Text */}

      <div className="mb-8 md:mb-12">
        <h1 className="max-w-[1000px] black-text">
 Please have a seat {" "}  We’re
 coming live {" "} 
<span className="text-highlight"> soon</span>
</h1>
   </div>

      {/* Optional subtle animation */}
      {/* <div className="mt-10">
        <div className="w-6 h-6 border-4 border-[#1D1D1D]/30 border-t-[#1D1D1D] rounded-full animate-spin"></div>
      </div> */}
    </main>
    
  );
}
