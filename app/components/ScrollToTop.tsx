"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
   const router = useRouter();

  useEffect(() => {
    const checkSection = (): HTMLElement | null =>
      document.querySelector("#second-section");
    let secondSection: HTMLElement | null = checkSection();

    // Wait for DOM (Next.js hydration delay)
    const interval = setInterval(() => {
      secondSection = checkSection();
      if (secondSection) {
        clearInterval(interval);

        const handleScroll = () => {
          if (!secondSection) return; // ✅ type-safety check
          const rect = secondSection.getBoundingClientRect();
          const isPastSecondSection =
            rect.top <= window.innerHeight * 0.8; // show after 30% viewport
          setVisible(isPastSecondSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // run once on load

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // <button
    //   onClick={scrollToTop}
    //   className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#FAB31E] text-black flex items-center justify-center shadow-lg cursor-pointer transition-all duration-500 ${
    //     visible
    //       ? "opacity-100 translate-y-0"
    //       : "opacity-0 translate-y-4 pointer-events-none"
    //   }`}
    //   aria-label="Scroll to top"
    // >
    //   <Image
    //       width={40}
    //       height={40}
    //     src="/images/ScrollToTop.svg"
    //     alt="ScrollToTop"
    //     className="w-5 h-5"
    //   />
    // </button>


    <button
  onClick={() => router.push("/contactus")}
  className={` hidden md:flex fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
    visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4 pointer-events-none"
  }`}
>
  {/* Rotating Text */}
  <div
    className="
      absolute
      inset-0
      animate-[spin_10s_linear_infinite]
      rounded-full
    "
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        id="circlePath"
        d="
          M50,50
          m-38,0
          a38,38 0 1,1 76,0
          a38,38 0 1,1 -76,0
        "
        fill="none"
      />

      <text
        fill="#000"
        fontSize="18"
        fontWeight="600"
        letterSpacing="2"
      >
        <textPath href="#circlePath">
          GET QUOTE • GET QUOTE • GET QUOTE •
        </textPath>
      </text>
    </svg>
  </div>

  {/* Center Circle */}
  <div
    className="
      w-13
      h-13
      rounded-full
      bg-[#FAB31E]
      flex
      items-center
      justify-center
      shadow-lg
    "
  >
    <HiOutlineChatBubbleLeftRight
      className="text-black text-3xl"
    />
  </div>
</button>
  );
}
