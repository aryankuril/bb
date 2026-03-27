"use client";
import dynamic from "next/dynamic";

const PageLoader = dynamic(() => import("./PageLoader"), { ssr: false });
const ScrollToTop = dynamic(() => import("./ScrollToTop"), { ssr: false });
const ClickBurst = dynamic(() => import("./ClickBurst"), { ssr: false });

export default function AnimatedEffects() {
  return (
    <>
      <PageLoader />
      <ScrollToTop />
      <ClickBurst burstImage="/images/star.png" />
    </>
  );
}