"use client";
import { useEffect, useState } from "react";
import Image from "next/image";


interface Burst {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function ClickBurst({
  burstImage = "/images/star.png", // ✅ replace with your image
}: {
  burstImage?: string;
}) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create 8 particles per click
      const newBursts = Array.from({ length: 1 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6,
      }));

      setBursts((prev) => [...prev, ...newBursts]);

      // Remove after animation
      setTimeout(() => {
        setBursts((prev) => prev.slice(newBursts.length));
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999]">
      {bursts.map((b) => (
        <Image
          alt=""
          width={40}
          height={40}
          key={b.id}
          src={burstImage}
          className="global-burst-img"
          style={{
            left: b.x,
            top: b.y,
            transform: `translate(-50%, -50%) rotate(${b.rotation}deg) scale(${b.scale})`,
          }}
        />
      ))}
    </div>
  );
}
