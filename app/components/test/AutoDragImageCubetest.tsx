"use client";

import * as React from "react";
import { motion, useMotionValue, Easing } from "framer-motion";

type CubeProps = {
  size?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  frontImage?: string;
  backImage?: string;
  rightImage?: string;
  leftImage?: string;
  topImage?: string;
  bottomImage?: string;
};

const defaultSize = 350;

export default function AutoDragImageCubetest(props: CubeProps) {
  const {
    size = defaultSize,
    autoRotate = true,
    rotationSpeed = 20,
    frontImage,
    backImage,
    rightImage,
    leftImage,
    topImage,
    bottomImage,
  } = props;

  /* -------------------- Responsive size -------------------- */
  const [cubeSize, setCubeSize] = React.useState(size);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCubeSize(250);
      } else {
        setCubeSize(size);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  /* -------------------- Motion values -------------------- */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  /* -------------------- Interaction state -------------------- */
  const [localAutoRotate, setLocalAutoRotate] = React.useState(autoRotate);

  const isDraggingRef = React.useRef(false);
  const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = React.useRef<number | null>(null);

  const velocityRef = React.useRef({ vx: 0, vy: 0 });
  const rafRef = React.useRef<number | null>(null);

  /* -------------------- Tuned values -------------------- */
  const DRAG_SENSITIVITY = isMobile ? 0.22 : 0.4;
  const INERTIA_DECAY = isMobile ? 0.0045 : 0.0028;

  /* -------------------- Helpers -------------------- */
  const stopInertia = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  /* -------------------- Styles -------------------- */
  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    perspective: cubeSize * 4,
    gap: 40,
    paddingTop: 40,
    paddingBottom: 40,
  };

  const cubeBaseStyle: React.CSSProperties = {
    position: "relative",
    width: cubeSize,
    height: cubeSize,
    transformStyle: "preserve-3d",
    touchAction: "none",
    userSelect: "none",
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 18,
  };

  const face = (img?: string): React.CSSProperties => ({
    ...faceBase,
    backgroundImage: img
      ? `url(${img})`
      : "linear-gradient(135deg, #0EA5E9, #22C55E)",
  });

  const z = cubeSize / 2;

  const faces = [
    { style: { ...face(frontImage), transform: `translateZ(${z}px)` } },
    { style: { ...face(backImage), transform: `rotateY(180deg) translateZ(${z}px)` } },
    { style: { ...face(rightImage), transform: `rotateY(90deg) translateZ(${z}px)` } },
    { style: { ...face(leftImage), transform: `rotateY(-90deg) translateZ(${z}px)` } },
    { style: { ...face(topImage), transform: `rotateX(90deg) translateZ(${z}px)` } },
    { style: { ...face(bottomImage), transform: `rotateX(-90deg) translateZ(${z}px)` } },
  ];

  /* -------------------- Auto rotate -------------------- */
  const outerAnimate = localAutoRotate
    ? { rotateX: 360, rotateY: 360 }
    : { rotateX: 0, rotateY: 0 };

  const outerTransition = localAutoRotate
    ? { repeat: Infinity, duration: rotationSpeed, ease: "linear" as Easing }
    : { duration: 0 };

  /* -------------------- Pointer handlers -------------------- */
  const handlePointerDown = (e: React.PointerEvent) => {
    stopInertia();
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastMoveTimeRef.current = performance.now();
    setLocalAutoRotate(false);

    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    lastPosRef.current = null;
    lastMoveTimeRef.current = null;

    (e.target as Element).releasePointerCapture?.(e.pointerId);
    startInertia();
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    startInertia();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const last = lastPosRef.current;
    if (!last) return;

    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    const dt = Math.max(1, now - (lastMoveTimeRef.current ?? now));

    rotateY.set(rotateY.get() + dx * DRAG_SENSITIVITY);
    rotateX.set(rotateX.get() - dy * DRAG_SENSITIVITY);

    velocityRef.current.vx = dx / dt;
    velocityRef.current.vy = dy / dt;

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastMoveTimeRef.current = now;
  };

  /* -------------------- Inertia -------------------- */
  const startInertia = () => {
    stopInertia();
    const threshold = 0.0005;
    let lastT = performance.now();

    const step = (t: number) => {
      if (isDraggingRef.current) return;

      const dt = t - lastT;
      lastT = t;

      rotateY.set(rotateY.get() + velocityRef.current.vx * dt * DRAG_SENSITIVITY);
      rotateX.set(rotateX.get() - velocityRef.current.vy * dt * DRAG_SENSITIVITY);

      const decay = Math.exp(-INERTIA_DECAY * dt);
      velocityRef.current.vx *= decay;
      velocityRef.current.vy *= decay;

      if (
        Math.abs(velocityRef.current.vx) < threshold &&
        Math.abs(velocityRef.current.vy) < threshold
      ) {
        setTimeout(() => setLocalAutoRotate(autoRotate), 80);
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  React.useEffect(() => () => stopInertia(), []);

  /* -------------------- Render -------------------- */
  return (
    <div
      className="container py-0 sm:py-15 lg:py-20 lg:mt-20 -mt-20"
      style={wrapperStyle}
    >
      <h1 className="black-text md:text-left w-full mb-6">
        The Squad That Turns <span className="text-highlight">What If</span>’ Into <br />
        ‘<span className="text-highlight">What’s Next.</span>’
      </h1>

      {/* Mobile hint */}
      <p className="text-sm text-gray-500 md:hidden mb-10">
        Drag with your finger to rotate
      </p>

      <motion.div style={cubeBaseStyle} animate={outerAnimate} transition={outerTransition}>
        <motion.div
          style={{
            ...cubeBaseStyle,
            rotateX,
            rotateY,
            cursor: isDraggingRef.current ? "grabbing" : "grab",
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerMove={handlePointerMove}
          whileTap={{ scale: 1.03 }}
        >
          {faces.map((f, i) => (
            <div key={i} style={f.style} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
