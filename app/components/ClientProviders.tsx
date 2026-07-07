"use client";

import dynamic from "next/dynamic";

const AnimatedEffects = dynamic(() => import("./AnimatedEffects"), { ssr: false });
const AnalyticsWrapper = dynamic(() => import("./analytics-wrapper"), { ssr: false });
const GlobalRain = dynamic(() => import("./GlobalRain"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <GlobalRain />
      <AnimatedEffects />
      <AnalyticsWrapper />
    </>
  );
}