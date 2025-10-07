"use client";
import React, { useEffect, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

const Taxi = () => {
  const scrollY = useMotionValue(0);
  const [docHeight, setDocHeight] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);

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
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setDocHeight(height || 1);
      setViewportWidth(window.innerWidth);
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

  // Move taxi a bit higher on small screens so it doesn’t overlap footer
  const bottomOffset =
    viewportWidth < 480 ? 60 : viewportWidth < 768 ? 40 : 20;

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
