"use client";

import { useEffect, useRef, useState } from "react";

const RAIN_DURATION_MS = 30000;

export default function GlobalRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showMumbaiModal, setShowMumbaiModal] = useState(false);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    const showModal = () => {
      setShowMumbaiModal(true);
    };

    if (document.readyState === "complete") {
      showModal();
    } else {
      window.addEventListener("load", showModal, { once: true });
    }

    return () => {
      window.removeEventListener("load", showModal);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, []);

  const handleMumbaiAnswer = (isFromMumbai: boolean) => {
    setShowMumbaiModal(false);

    if (!isFromMumbai) return;

    setIsRaining(true);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);

    stopTimerRef.current = setTimeout(() => {
      setIsRaining(false);
    }, RAIN_DURATION_MS);
  };

  useEffect(() => {
    if (!isRaining || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const maxDrops = 260;
    const drops: Array<{
      x: number;
      y: number;
      z: number;
      width: number;
      height: number;
      vy: number;
      vw: number;
      vh: number;
      size: number;
      length: number;
      hit: number;
      alpha: number;
      va: number;
      phase: "fall" | "impact" | "splash";
      impactFrames: number;
      splashEnabled: boolean;
      wind: number;
    }> = [];

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const resetDrop = (drop: (typeof drops)[number], seed = false) => {
      drop.z = random(0.18, 1);
      const depth = drop.z;
      drop.x = random(-32, width + 32);
      drop.width = random(5, 9) * depth;
      drop.height = random(0.6, 1.2) * depth;
      drop.vy = random(18, 24) + depth * 34;
      drop.vw = random(1.1, 2.3) * depth;
      drop.vh = random(0.12, 0.34) * depth;
      drop.size = random(0.55, 1.35) + depth * 1.45;
      drop.length = random(70, 110) + depth * random(78, 132);
      drop.hit = Math.max(0, height - 5);
      drop.y = seed
        ? random(-height, Math.max(-height * 0.2, drop.hit - drop.length - 1))
        : random(-height * 0.6, -drop.length);
      drop.alpha = random(0.18, 0.38) + depth * 0.46;
      drop.va = random(0.91, 0.95);
      drop.phase = "fall";
      drop.impactFrames = 0;
      drop.splashEnabled = depth > 0.58 && Math.random() < 0.08;
      drop.wind = random(-10, -4) - depth * random(10, 18);
    };

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drops.forEach((drop) => resetDrop(drop, true));
    };

    for (let index = 0; index < maxDrops; index += 1) {
      drops.push({
        x: 0,
        y: 0,
        z: 1,
        width: 2,
        height: 1,
        vy: 7,
        vw: 3,
        vh: 1,
        size: 2,
        length: 100,
        hit: 0,
        alpha: 1,
        va: 0.96,
        phase: "fall",
        impactFrames: 0,
        splashEnabled: false,
        wind: -18,
      });
    }

    resize();
    window.addEventListener("resize", resize);

    const drawRainDrop = (drop: (typeof drops)[number]) => {
      const tailY = Math.min(drop.y + drop.length, drop.hit);
      const headY = Math.max(drop.y, tailY - drop.length);
      const gradient = context.createLinearGradient(
        drop.x,
        headY,
        drop.x + drop.wind,
        tailY
      );
      gradient.addColorStop(0, "rgba(210, 235, 255, 0)");
      gradient.addColorStop(0.42, `rgba(122, 198, 255, ${drop.alpha * 0.52})`);
      // gradient.addColorStop(1, `rgba(76, 174, 255, ${drop.alpha})`);

      context.save();
      context.beginPath();
      context.moveTo(drop.x, headY);
      context.lineTo(drop.x + drop.wind, tailY);
      context.strokeStyle = gradient;
      context.lineWidth = drop.size;
      context.lineCap = "round";
      context.stroke();
      context.restore();
    };

    const drawRipple = (drop: (typeof drops)[number]) => {
      const rippleY = drop.hit;
      const rippleHeight = Math.min(drop.height, 16);
      const rippleAlpha = drop.alpha * 0.78;

      context.beginPath();
      context.moveTo(drop.x, rippleY - rippleHeight / 2);
      context.bezierCurveTo(
        drop.x + drop.width / 2,
        rippleY - rippleHeight / 2,
        drop.x + drop.width / 2,
        rippleY + rippleHeight / 2,
        drop.x,
        rippleY + rippleHeight / 2
      );
      context.bezierCurveTo(
        drop.x - drop.width / 2,
        rippleY + rippleHeight / 2,
        drop.x - drop.width / 2,
        rippleY - rippleHeight / 2,
        drop.x,
        rippleY - rippleHeight / 2
      );
      context.strokeStyle = `rgba(76, 174, 255, ${rippleAlpha})`;
      context.lineWidth = 0.7 + drop.z;
      context.shadowColor = `rgba(76, 174, 255, ${rippleAlpha * 0.4})`;
      context.shadowBlur = 4 + drop.z * 8;
      context.stroke();
      context.closePath();
      context.shadowBlur = 0;
    };

    const updateDrop = (drop: (typeof drops)[number]) => {
      if (drop.phase === "fall" && drop.y + drop.length < drop.hit) {
        drop.y += drop.vy;
        return;
      }

      if (drop.phase === "fall") {
        drop.y = drop.hit - drop.length;
        drop.phase = "impact";
        drop.impactFrames = drop.splashEnabled ? 2 : 3;
        return;
      }

      if (drop.phase === "impact") {
        if (drop.impactFrames > 0) {
          drop.impactFrames -= 1;
          return;
        }

        if (!drop.splashEnabled) {
          resetDrop(drop);
          return;
        }

        drop.phase = "splash";
        drop.y = drop.hit;
      }

      if (drop.alpha > 0.03) {
        drop.width += drop.vw;
        drop.height += drop.vh;
        if (drop.width > 34 + drop.z * 38) {
          drop.alpha *= drop.va;
          drop.vw *= 0.98;
          drop.vh *= 0.98;
        }
        return;
      }

      resetDrop(drop);
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);

      drops
        .sort((firstDrop, secondDrop) => firstDrop.z - secondDrop.z)
        .forEach((drop) => {
          updateDrop(drop);

          if (drop.phase === "splash") {
            drawRipple(drop);
          } else {
            drawRainDrop(drop);
          }
        });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, width, height);
    };
  }, [isRaining]);

  return (
    <>
      {isRaining && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[998]"
          aria-hidden="true"
        />
      )}

      {showMumbaiModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mumbai-global-modal-title"
            className="w-full max-w-[420px] rounded-[18px] border border-black/10 bg-white px-6 py-7 text-center shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-highlight)]">
              Quick check
            </p>
            <h4
              id="mumbai-global-modal-title"
              className="mt-3 text-2xl font-semibold text-[#1D1D1D]"
            >
              Are you from Mumbai?
            </h4>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleMumbaiAnswer(true)}
                className="rounded-full bg-[var(--color-highlight)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleMumbaiAnswer(false)}
                className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-[#1D1D1D] transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}