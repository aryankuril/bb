"use client";

import React from "react";
import FirstsectionDesktop from "./FirstsectionDesktop";
import AutoDragImageCube from "./AutoDragImageCube";

export default function Firstsection() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {isMobile ? <AutoDragImageCube size={300}
  autoRotate={true}
  rotationSpeed={25}
  frontImage="/images/teams/team5.webp"
  backImage="/images/teams/6.png"
  rightImage="/images/teams/4.png"
  leftImage="/images/teams/5.png"
  topImage="/images/teams/1.png"
  bottomImage="/images/teams/2.png" /> : <FirstsectionDesktop />}
    </>
  );
}
