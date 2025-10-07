"use client";
import React, { useEffect, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

const Taxi = () => {
  const scrollY = useMotionValue(0);
  const [docHeight, setDocHeight] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Width of taxi dynamically based on screen size
  const getTaxiWidth = () => {
    if (typeof window === "undefined") return 120;
    if (window.innerWidth < 480) return 70; // small phones
    if (window.innerWidth < 768) return 90; // tablets
    return 120; // desktops
  };

  const [taxiWidth, setTaxiWidth] = useState(getTaxiWidth());

  useEffect(() => {
    const updateSizes = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setDocHeight(height || 1);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setTaxiWidth(getTaxiWidth());
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

  // Total distance taxi can move
  const distance = Math.max(viewportWidth - taxiWidth - 10, 0);

  // Smooth scroll mapping
  const x = useTransform(scrollY, [0, docHeight], [0, distance], {
    clamp: true,
  });

  // Adjust bottom offset based on viewport width & height
  let bottomOffset = 20; // default
  if (viewportWidth < 480) {
    bottomOffset = Math.max(viewportHeight * 0.12, 60); // at least 60px or 12% of screen height
  } else if (viewportWidth < 768) {
    bottomOffset = Math.max(viewportHeight * 0.08, 40); // at least 40px or 8% of screen height
  }

  return (
    <motion.img
      src="/images/taxi.png"
      alt="Taxi"
      style={{
        position: "fixed",
        bottom: bottomOffset,
        left: 0,
        x,
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
