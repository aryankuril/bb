"use client";

import dynamic from "next/dynamic";

const AnimatedEffects = dynamic(() => import("./AnimatedEffects"), { ssr: false });
const AnalyticsWrapper = dynamic(() => import("./analytics-wrapper"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <AnimatedEffects />
      <AnalyticsWrapper />
    </>
  );
}