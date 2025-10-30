"use client";
import React from "react";
import MuxPlayer from "@mux/mux-player-react";

const Firstsection = () => {
  return (
    <section className="relative isolate w-full h-screen overflow-hidden -mt-20 lg:mt-0">
      {/* Desktop Video */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <MuxPlayer
          playbackId="4h2lgLpcOdBx3yCDYo8aOQkbHjjHU51tycqdHGJRi4s"
          autoPlay
          muted
          loop
          playsInline
          streamType="on-demand"
          preload="auto"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        />
      </div>

      {/* Mobile Video */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <video
          src="/video/home-m-Trim.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Firstsection;
