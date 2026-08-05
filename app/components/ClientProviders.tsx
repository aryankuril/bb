"use client";

// Static imports instead of next/dynamic to avoid server-side bailout in dev.
import AnimatedEffects from "./AnimatedEffects";
import AnalyticsWrapper from "./analytics-wrapper";
import GlobalRain from "./GlobalRain";

export default function ClientProviders() {
  return (
    <>
      {/* <GlobalRain /> */}
      <AnimatedEffects />
      <AnalyticsWrapper />
    </>
  );
}