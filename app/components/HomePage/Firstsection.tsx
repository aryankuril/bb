"use client";
import React from "react";
import MuxPlayer from "@mux/mux-player-react";

const Firstsection = () => {
  return (
    <section className="overflow-hidden h-screen -mt-[82px] md:-mt-8">
      <div className="relative w-full h-full">
        {/* Desktop Video */}
        <MuxPlayer
          playbackId="4tdWrZysgvhfwL02vOUGtdL69Oqp5dGo9FPdUM02SxFNk"
          autoPlay
          muted
          loop
          playsInline
          streamType="on-demand"
          preload="none"
          crossOrigin="anonymous"
          preferPlayback="m3u8"
          poster="https://image.mux.com/4tdWrZysgvhfwL02vOUGtdL69Oqp5dGo9FPdUM02SxFNk/thumbnail.jpg?time=0.8"
          className="hidden md:block absolute inset-0 w-full h-full"
          style={{
            "--controls": "none",
            "--media-object-fit": "cover",
            "--media-object-position": "center",
            width: "100%",
            height: "100%",
          } as React.CSSProperties}
        />

        {/* Mobile Video */}
        <MuxPlayer
          playbackId="RTxv016M5wWZTtHayQ1hMJlrpCnFItiONQc01yn7BZaGU"
          autoPlay
          muted
          loop
          playsInline
          streamType="on-demand"
          preload="none"
          crossOrigin="anonymous"
          preferPlayback="m3u8"
          poster="https://image.mux.com/RTxv016M5wWZTtHayQ1hMJlrpCnFItiONQc01yn7BZaGU/thumbnail.jpg?time=0"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          style={{
            "--controls": "none",
            "--media-object-fit": "cover",
            "--media-object-position": "center",
            width: "100%",
            height: "100%",
          } as React.CSSProperties}
        />
      </div>
    </section>
  );
};

export default Firstsection;
