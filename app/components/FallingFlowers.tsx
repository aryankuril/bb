"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FallingFlowers() {
  const flowerImages = [
    "/images/flower1.svg",
    "/images/flower2.svg",
    "/images/flower3.svg",
  ];

  const [flowers, setFlowers] = useState<any[]>([]);

  useEffect(() => {
    const createFlower = () => {
      const randomImage =
        flowerImages[Math.floor(Math.random() * flowerImages.length)];

      const newFlower = {
        id: Math.random(),
        img: randomImage,
        startX: Math.random() * 100,
        endX: Math.random() * 100,
        duration: 7 + Math.random() * 4,
        size: 20 + Math.random() * 20,
        rotateStart: Math.random() * 30 - 15,
        rotateEnd: Math.random() * 50 - 25,
      };

      setFlowers((prev) => {
        const updated = [...prev, newFlower];

        // Limit to max 25 flowers → no lag
        if (updated.length > 25) updated.shift();

        return updated;
      });
    };

    const interval = setInterval(createFlower, 650);

    return () => clearInterval(interval);
  }, []);

  const removeFlower = (id: number) => {
    setFlowers((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 w-full h-full overflow-hidden z-[9999]">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          initial={{
            y: -150,
            x: `${f.startX}vw`,
            rotate: f.rotateStart,
            opacity: 1,
          }}
          animate={{
            y: "105vh",
            x: `${f.endX}vw`,
            rotate: f.rotateEnd,
            opacity: 1,
          }}
          transition={{
            duration: f.duration,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => removeFlower(f.id)} // remove after fall
          className="absolute"
        >
          <Image
            src={f.img}
            alt="flower"
            width={f.size}
            height={f.size}
            unoptimized
            priority
            className="image-crisp"
          />
        </motion.div>
      ))}
    </div>
  );
}
