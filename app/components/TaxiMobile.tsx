// "use client";

// import React, { useEffect, useState } from "react";
// import { motion, useTransform, useMotionValue } from "framer-motion";
// import { usePathname } from "next/navigation";

// const TaxiMobile = () => {
//   const pathname = usePathname();
//   const scrollY = useMotionValue(0);
//   const [docHeight, setDocHeight] = useState(1);
//   const [viewportWidth, setViewportWidth] = useState(0);

//   const getTaxiWidth = () => {
//     if (typeof window === "undefined") return 120;
//     if (window.innerWidth < 480) return 70;
//     if (window.innerWidth < 768) return 90;
//     return 120;
//   };

//   const [taxiWidth, setTaxiWidth] = useState(getTaxiWidth());

//   useEffect(() => {
//     const updateSizes = () => {
//       const vw = window.innerWidth;
//       const fullDocHeight = document.documentElement.scrollHeight;
//       const vh = window.innerHeight;
//       setViewportWidth(vw);
//       setTaxiWidth(getTaxiWidth());

//       // Ensure scroll height is sufficient for full taxi animation
//       const scrollableHeight = Math.max(fullDocHeight - vh, 100);
//       setDocHeight(scrollableHeight);
//     };

//     const handleScroll = () => scrollY.set(window.scrollY);

//     window.addEventListener("resize", updateSizes);
//     window.addEventListener("scroll", handleScroll);

//     updateSizes();
//     handleScroll();

//     return () => {
//       window.removeEventListener("resize", updateSizes);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrollY, pathname]);

//   const distance = Math.max(viewportWidth - taxiWidth - 10, 0);
//   const x = useTransform(scrollY, [0, docHeight], [0, distance]);

//   // 🚫 Hide taxi on desktop
//   if (viewportWidth >= 1024) return null;

//   return (
//     <motion.img
//       src="/images/taxi.png"
//       alt="Taxi"
//       style={{
//         position: "fixed",
//         left: 0,
//         x,
//         width: taxiWidth,
//         height: "auto",
//         zIndex: 81, // just above navbar (navbar z=80)
//         pointerEvents: "none",
//         top: "calc(100vh - 75px - 40px)", 
//         // 68px is navbar height, 40px gives top line offset above it
//       }}
//       transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
//     />
//   );
// };

// export default TaxiMobile;










"use client";

import React, { useEffect, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";

const Taxi = () => {
  const pathname = usePathname();
  const scrollY = useMotionValue(0);
  const [docHeight, setDocHeight] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const getTaxiWidth = () => {
    if (typeof window === "undefined") return 120;
    if (window.innerWidth < 480) return 70;
    if (window.innerWidth < 768) return 90;
    return 120;
  };

  const [taxiWidth, setTaxiWidth] = useState(getTaxiWidth());

  useEffect(() => {
    const updateSizes = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const fullDocHeight = document.documentElement.scrollHeight;

      setViewportHeight(vh);
      setViewportWidth(vw);
      setTaxiWidth(getTaxiWidth());

      // Ensure minimum docHeight to allow full taxi movement
      const scrollableHeight = Math.max(fullDocHeight - vh, 100);
      setDocHeight(scrollableHeight);
    };

    const handleScroll = () => scrollY.set(window.scrollY);

    window.addEventListener("resize", updateSizes);
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(updateSizes, 100);
    updateSizes();
    handleScroll();

    return () => {
      window.removeEventListener("resize", updateSizes);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [scrollY, pathname]);

  const distance = Math.max(viewportWidth - taxiWidth - 10, 0);

  // Map scrollY to horizontal position
  const x = useTransform(scrollY, [0, docHeight], [0, distance]);


  // 🚫 Hide taxi on desktop
  if (viewportWidth >= 1024) return null;


  return (
    <motion.img
      src="/images/taxi.png"
      alt="Taxi"
      style={{
        position: "fixed",
       top: "calc(100vh - 75px - 40px)", 
        left: 0,
        x,
        width: taxiWidth,
        height: "auto",
        zIndex: 81,
        pointerEvents: "none",
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
    />



  );
};

export default Taxi;