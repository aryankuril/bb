// "use client";
// import React, { useEffect } from "react";

// const textBlock1 = [
//   "Your brand is the experience you create.",
//   "Stand out from the crowd.",
//   "We shape your purpose and story.",
//   "Turn your story into loyalty.",
//   "Let your promise guide your product.",
//   "",
// ];

// const FourthSection = () => {
//   useEffect(() => {
//     const handleScroll = () => {
//       const allDivs = document.querySelectorAll(".textDiv");
//       const viewportHeight = window.innerHeight;
//       const centerY = viewportHeight / 2;

//       allDivs.forEach((div) => {
//         const htmlDiv = div as HTMLElement;
//         const rect = htmlDiv.getBoundingClientRect();
//         const divCenterY = rect.top + rect.height / 2;
//         const distanceFromCenter = Math.abs(divCenterY - centerY);

//         const nearCenter = distanceFromCenter < 100;
//         const opacity = Math.max(0, 1 - distanceFromCenter / centerY);
//         const weight = 100 + (1 - distanceFromCenter / centerY) * 400;
//         const size = 3 + (1 - distanceFromCenter / centerY);

//         htmlDiv.style.opacity = opacity.toFixed(2);
//         htmlDiv.style.fontWeight = weight.toFixed(0);
//         htmlDiv.style.fontSize = `${size.toFixed(2)}vw`;
//         htmlDiv.style.color = nearCenter
//           ? "var(--color-highlight)"
//           : "var(--color-text-primary)";
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.dispatchEvent(new Event("scroll"));
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="container mx-auto text-center black-text single-title lg:mt-0 mt-50  py-0 sm:py-15 lg:py-20  space-y-6 px-4 sm:px-8 md:px-16">
//       <h1>
//         {textBlock1.map((line, index) =>
//           line === "" ? (
//             <br key={`b1-${index}`} />
//           ) : (
//             <div
//               key={`t1-${index}`}
//               className="textDiv transition-transform duration-150 cursor-default capitalize break-words"
//             >
//               {line}
//             </div>
//           )
//         )}
//       </h1>
//     </div>
//   );
// };

// export default FourthSection;





"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FourthSection = () => {
  const sectionRef = useRef(null);
  const text =
    "Your brand is the total, authentic experience you deliver, cutting through market noise. We define your core purpose, translating it into a narrative that builds lifelong customer advocacy. This creates market leadership, ensuring your promise always precedes your product.";

  const words = text.split(" ");

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] container py-0 sm:py-15 lg:py-20 flex justify-center items-center  "
    >
      {/* Sticky container */}
      <div className="sticky top-[50%] -translate-y-1/2  text-center">
        <motion.h2 className="font-['Poppins']  font-semibold  flex flex-wrap justify-center">
          {words.map((word, i) => {
            // Create a nice staggered scroll-based reveal for each word
            const start = i / words.length;
            const end = start + 1 / words.length;

            const color = useTransform(
              scrollYProgress,
              [start, end],
              ["#9ca3af", "#000000"] // gray-400 → black
            );
            const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

            return (
              <motion.span
                key={i}
                style={{ color, opacity }}
                className="mx-[2px] transition-all duration-300"
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </motion.h2>
      </div>
    </section>
  );
};

export default FourthSection;


