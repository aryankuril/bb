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

const defaultSize = 260;

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

  // Adjust size on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCubeSize(180); // smaller cube for mobile
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

  const outerAnimate = autoRotate ? { rotateX: 360, rotateY: 360 } : { rotateX: 0, rotateY: 0 };
  const outerTransition = autoRotate
    ? { repeat: Infinity, duration: rotationSpeed, ease: "linear" as Easing }
    : { duration: 0 };

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
          style={{ ...cubeBaseStyle, rotateX, rotateY, cursor: "grab" }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            rotateY.set(rotateY.get() + e.movementX * 0.4);
            rotateX.set(rotateX.get() - e.movementY * 0.4);
          }}
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
