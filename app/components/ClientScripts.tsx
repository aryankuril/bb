"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Taxi from "./Taxi";
import Whatsapp from "./Whatsapp";

export default function ClientScripts() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lerp: 0.05,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Taxi />
      <Whatsapp />
    </>
  );
}
