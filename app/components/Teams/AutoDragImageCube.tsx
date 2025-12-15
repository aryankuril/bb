"use client";

import * as React from "react";
import { motion, useMotionValue, Easing, animate } from "framer-motion";


/* ================== TYPES ================== */
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

type Direction = "up" | "down" | "left" | "right" | null;

/* ================== CONSTANTS ================== */
const defaultSize = 350;
const FACE_ROTATION = 90;
const HOLD_DELAY = 2000;
const JOYSTICK_RADIUS = 45;
const DRAG_SENSITIVITY = 7;

/* ================== COMPONENT ================== */
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

  /* ---------------- Responsive size ---------------- */
  const [cubeSize, setCubeSize] = React.useState(size);

  React.useEffect(() => {
    const resize = () => setCubeSize(window.innerWidth < 768 ? 250 : size);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [size]);

  /* ---------------- Motion values ---------------- */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  /* ---------------- Explicit angles ---------------- */
  const angleXRef = React.useRef(0);
  const angleYRef = React.useRef(0);

const applyRotation = () => {
  animate(rotateX, angleXRef.current, {
    duration: 0.7,
    ease: "easeInOut",
  });

  animate(rotateY, angleYRef.current, {
    duration: 0.7,
    ease: "easeInOut",
  });
};

let rafId: number | null = null;

const applyRotationInstant = () => {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    rotateX.set(angleXRef.current);
    rotateY.set(angleYRef.current);
  });
};




  /* ---------------- Auto rotate ---------------- */
  const [localAutoRotate, setLocalAutoRotate] = React.useState(autoRotate);
  const resumeAutoRef = React.useRef<NodeJS.Timeout | null>(null);

  const pauseAutoRotate = (delay = 2000) => {
    if (resumeAutoRef.current) clearTimeout(resumeAutoRef.current);

    setLocalAutoRotate(false);

    resumeAutoRef.current = setTimeout(() => {
      setLocalAutoRotate(autoRotate);
    }, delay);
  };

  /* ---------------- Hold control ---------------- */
  const holdIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const activeDirectionRef = React.useRef<Direction>(null);

  const stopHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    holdIntervalRef.current = null;
    activeDirectionRef.current = null;
  };

  const rotateOneFace = (dir: Direction) => {
    if (!dir) return;

    pauseAutoRotate();

    switch (dir) {
      case "up":
        angleXRef.current -= FACE_ROTATION;
        break;
      case "down":
        angleXRef.current += FACE_ROTATION;
        break;
      case "left":
        angleYRef.current -= FACE_ROTATION;
        break;
      case "right":
        angleYRef.current += FACE_ROTATION;
        break;
    }

    applyRotation();
  };

  const startHold = (dir: Direction) => {
    if (activeDirectionRef.current === dir) return;

    stopHold();
    activeDirectionRef.current = dir;

    rotateOneFace(dir);

    holdIntervalRef.current = setInterval(() => {
      rotateOneFace(dir);
    }, HOLD_DELAY);
  };

  const getDirection = (x: number, y: number): Direction => {
    if (Math.abs(x) < 10 && Math.abs(y) < 10) return null;
    return Math.abs(x) > Math.abs(y)
      ? x > 0
        ? "right"
        : "left"
      : y > 0
      ? "down"
      : "up";
  };

  /* ---------------- Cube faces ---------------- */
  const z = cubeSize / 2;

  const faceStyle = (img?: string): React.CSSProperties => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 18,
    backgroundImage: img
      ? `url(${img})`
      : "linear-gradient(135deg,#0EA5E9,#22C55E)",
  });

  const faces = [
    { t: `translateZ(${z}px)`, img: frontImage },
    { t: `rotateY(180deg) translateZ(${z}px)`, img: backImage },
    { t: `rotateY(90deg) translateZ(${z}px)`, img: rightImage },
    { t: `rotateY(-90deg) translateZ(${z}px)`, img: leftImage },
    { t: `rotateX(90deg) translateZ(${z}px)`, img: topImage },
    { t: `rotateX(-90deg) translateZ(${z}px)`, img: bottomImage },
  ];

  /* ---------------- Hand drag ---------------- */
  const lastPos = React.useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    pauseAutoRotate();
    stopHold();
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!lastPos.current) return;

    pauseAutoRotate();

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    angleYRef.current += dx * DRAG_SENSITIVITY;
    angleXRef.current -= dy * DRAG_SENSITIVITY;

    applyRotationInstant();
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    lastPos.current = null;
    pauseAutoRotate();
    applyRotation();
    (e.target as Element).releasePointerCapture(e.pointerId);
  };


  const joystickX = useMotionValue(0);
const joystickY = useMotionValue(0);


  /* ---------------- Render ---------------- */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        perspective: cubeSize * 4,
        gap: 40,
        padding: 40,
      }}
    >

      <h1 className="black-text md:text-left w-full mb-15">
        The Squad That Turns <span className="text-highlight">What If</span>’ Into <br />
        ‘<span className="text-highlight">What’s Next.</span>’
      </h1>

    
      {/* ===== Cube ===== */}
      <motion.div
        style={{
          width: cubeSize,
          height: cubeSize,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={
          localAutoRotate
            ? { rotateX: 360, rotateY: 360 }
            : { rotateX: 0, rotateY: 0 }
        }
        transition={
          localAutoRotate
            ? { repeat: Infinity, duration: rotationSpeed, ease: "linear" as Easing }
            : { duration: 0 }
        }
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            cursor: "grab",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {faces.map((f, i) => (
            <div key={i} style={{ ...faceStyle(f.img), transform: f.t }} />
          ))}
        </motion.div>
      </motion.div>

      {/* ===== Gyro Joystick ===== */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "2px solid #fab31e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: "none",
          marginTop: "90px",
        }}
      >
        <motion.div
  drag
  dragMomentum={false}
  dragConstraints={{
    left: -JOYSTICK_RADIUS,
    right: JOYSTICK_RADIUS,
    top: -JOYSTICK_RADIUS,
    bottom: JOYSTICK_RADIUS,
  }}
  dragElastic={0}
  style={{
    x: joystickX,
    y: joystickY,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#fab31e",
    cursor: "grab",
  }}
  onDrag={(e, info) => {
    const dir = getDirection(info.offset.x, info.offset.y);

    if (!dir) {
      stopHold();
      pauseAutoRotate();
      return;
    }

    startHold(dir);
  }}
  onDragEnd={() => {
    stopHold();
    pauseAutoRotate();

    // ✅ FORCE SNAP TO CENTER
    joystickX.set(0);
    joystickY.set(0);
  }}
/>


      </div>
    </div>
  );
}
