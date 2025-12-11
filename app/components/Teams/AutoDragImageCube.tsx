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
export default function AutoDragImageCube(props: CubeProps) {
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
  const [cubeSize, setCubeSize] = React.useState(size);
  // local control to pause auto-rotate while dragging / inertia
  const [localAutoRotate, setLocalAutoRotate] = React.useState(autoRotate);
  // Adjust size on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCubeSize(250); // smaller cube for mobile
      } else {
        setCubeSize(size); // default for desktop
      }
    };
    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // dragging state refs (using refs to avoid rerenders)
  const isDraggingRef = React.useRef(false);
  const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = React.useRef<number | null>(null);
  // velocity in px per ms
  const velocityRef = React.useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  // inertia animation frame id
  const rafRef = React.useRef<number | null>(null);
  // stops any running inertia loop
  const stopInertia = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };
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
  };
  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 18,
    boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
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
  const outerAnimate = localAutoRotate ? { rotateX: 360, rotateY: 360 } : { rotateX: 0, rotateY: 0 };
  const outerTransition = localAutoRotate
    ? { repeat: Infinity, duration: rotationSpeed, ease: "linear" as Easing }
    : { duration: 0 };
  // Pointer handlers that work for mouse and touch and track velocity
  const handlePointerDown = (e: React.PointerEvent) => {
    // stop any inertia currently running
    stopInertia();
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastMoveTimeRef.current = performance.now();
    // pause auto-rotate while interacting
    setLocalAutoRotate(false);
    // capture pointer so we continue to get events if finger/mouse leaves element
    const target = e.target as Element;
    try {
      target.setPointerCapture?.(e.pointerId);
    } catch (err) {
      // ignore if not supported
    }
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    lastPosRef.current = null;
    lastMoveTimeRef.current = null;
    const target = e.target as Element;
    try {
      target.releasePointerCapture?.(e.pointerId);
    } catch (err) {
      // ignore if not supported
    }
    // start inertia using the last measured velocity
    startInertia();
  };
  const handlePointerCancel = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    lastPosRef.current = null;
    lastMoveTimeRef.current = null;
    startInertia();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    // only move when dragging (works for mouse and touch)
    if (!isDraggingRef.current) return;
    const now = performance.now();
    // Prefer movementX/ movementY if available (fast path)
    const moveX = (e as any).movementX;
    const moveY = (e as any).movementY;
    if (typeof moveX === "number" && typeof moveY === "number") {
      // movementX/Y are in pixels since last event
      rotateY.set(rotateY.get() + moveX * 0.4);
      rotateX.set(rotateX.get() - moveY * 0.4);
      // approximate velocity (px per ms). Use a tiny dt to avoid divide by zero.
      const dt = Math.max(1, now - (lastMoveTimeRef.current ?? now));
      velocityRef.current.vx = moveX / dt;
      velocityRef.current.vy = moveY / dt;
      lastMoveTimeRef.current = now;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }
    // Fallback: compute delta from last position (some mobile browsers don't provide movementX/Y)
    const last = lastPosRef.current;
    const lastTime = lastMoveTimeRef.current ?? now;
    if (last) {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dt = Math.max(1, now - lastTime); // ms
      rotateY.set(rotateY.get() + dx * 0.4);
      rotateX.set(rotateX.get() - dy * 0.4);
      // store velocity in px/ms
      velocityRef.current.vx = dx / dt;
      velocityRef.current.vy = dy / dt;
    }
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastMoveTimeRef.current = now;
  };
  // inertia loop: use velocities stored in velocityRef (px/ms)
  const startInertia = () => {
    stopInertia();
    // if velocities are tiny, just restore auto-rotate and exit
    const threshold = 0.0005; // px/ms (very small)
    if (Math.abs(velocityRef.current.vx) < threshold && Math.abs(velocityRef.current.vy) < threshold) {
      // small delay to avoid immediate jump back to auto-rotate
      setTimeout(() => setLocalAutoRotate(autoRotate), 60);
      return;
    }
    let lastT = performance.now();
    const step = (t: number) => {
      // if user started dragging again, cancel inertia
      if (isDraggingRef.current) {
        stopInertia();
        return;
      }
      const dt = t - lastT;
      lastT = t;
      // apply velocity -> rotation change
      // velocity is px per ms, multiply by dt to get px, then * 0.4 to match drag sensitivity => degrees
      rotateY.set(rotateY.get() + velocityRef.current.vx * dt * 0.4);
      rotateX.set(rotateX.get() - velocityRef.current.vy * dt * 0.4);
      // apply exponential decay to velocity
      // decayFactor per ms (tuned for smooth feel)
      const decayPerMs = 0.0028; // larger = stops faster, smaller = longer glide
      const decay = Math.exp(-decayPerMs * dt);
      velocityRef.current.vx *= decay;
      velocityRef.current.vy *= decay;
      // stop condition
      if (Math.abs(velocityRef.current.vx) < threshold && Math.abs(velocityRef.current.vy) < threshold) {
        // finish, restore auto-rotate after tiny delay for smoothness
        stopInertia();
        setTimeout(() => setLocalAutoRotate(autoRotate), 60);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };
  // cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopInertia();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="container py-0 sm:py-15 lg:py-20 lg:mt-20 -mt-20"
      style={wrapperStyle}
    >
      <h1 className="black-text md:text-left w-full mb-20">
        The Squad That Turns <span className="text-highlight">What If</span>’ Into <br />
        ‘<span className="text-highlight">What’s Next.</span>’
      </h1>
      <motion.div style={cubeBaseStyle} animate={outerAnimate} transition={outerTransition}>
        <motion.div
          style={{ ...cubeBaseStyle, rotateX, rotateY, cursor: isDraggingRef.current ? "grabbing" : "grab" }}
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