"use client";
import React, { useEffect, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

const Taxi = () => {
  const scrollY = useMotionValue(0);
  const [docHeight, setDocHeight] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const taxiWidth = 120; // keep same as style width

  useEffect(() => {
    const updateSizes = () => {
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setDocHeight(height || 1);
      setViewportWidth(window.innerWidth);
    };

    const updateScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("resize", updateSizes);
    window.addEventListener("scroll", updateScroll);

    updateSizes();
    updateScroll();

    return () => {
      window.removeEventListener("resize", updateSizes);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [scrollY]);

  // Total distance to travel = viewport width minus taxi width
  const distance = Math.max(viewportWidth - taxiWidth, 0);

  // Map scroll progress (0 → 1) to pixel distance
  const x = useTransform(scrollY, [0, docHeight], [0, distance]);

  return (
    <motion.img
      src="/images/taxi.png" // 👈 put taxi.png inside public/images
      alt="Taxi"
      style={{
        position: "fixed",
        bottom: 20,
        left: 0,
        x, // pixel-based horizontal movement
        width: `${taxiWidth}px`,
        height: "auto",
        zIndex: 50,
        pointerEvents: "none",
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
    />
  );
};

export default Taxi;
