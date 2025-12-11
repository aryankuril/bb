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
  frontImage="/images/teams/team1.webp"
  backImage="/images/teams/team2.webp"
  rightImage="/images/teams/team5.webp"
  leftImage="/images/teams/team8.jpg"
  topImage="/images/teams/team8.jpg"
  bottomImage="/images/teams/team10.jpg" /> : <FirstsectionDesktop />}
    </>
  );
}
