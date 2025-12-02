"use client";

import PageLoader from "./PageLoader";
import FallingFlowers from "./FallingFlowers";
import ScrollToTop from "./ScrollToTop";
import ClickBurst from "./ClickBurst";

export default function AnimatedEffects({ children }: any) {
  return (
    <>
      <PageLoader>
        <FallingFlowers />
        {children}
      </PageLoader>

      <ScrollToTop />
      <ClickBurst burstImage="/images/star.png" />
    </>
  );
}
