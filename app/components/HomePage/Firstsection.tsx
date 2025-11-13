"use client";

import React from "react";
import MuxPlayer from "@mux/mux-player-react";

const Firstsection = () => {
  return (
    <section className="overflow-hidden h-screen -mt-[82px] md:-mt-8">
      <div className="relative w-full h-full">
        {/* Desktop Video */}
        <MuxPlayer
          playbackId="xKFPixwl02Sgj2GS0102adUvMzcOlxk7mqpGSQgpQbH0001U"
          autoPlay
          muted
          loop
          playsInline
          streamType="on-demand"
          preload="metadata"
          // poster={`https://image.mux.com/xKFPixwl02Sgj2GS0102adUvMzcOlxk7mqpGSQgpQbH0001U/thumbnail.jpg?time=0.8`}
          className="hidden md:block absolute inset-0 w-full h-full"
          style={
            {
              "--controls": "none",
              "--media-object-fit": "cover",
              "--media-object-position": "center",
              width: "100%",
              height: "100%",
            } as React.CSSProperties
          }
        />

        {/* Mobile Video */}
        <MuxPlayer
          playbackId="rg2PyjG3QOsQCobdMgIlk3T02t66BMwOm1FkHScWabHM"
          autoPlay
          muted
          loop
          playsInline
          streamType="on-demand"
          preload="metadata"
          poster={`https://image.mux.com/rg2PyjG3QOsQCobdMgIlk3T02t66BMwOm1FkHScWabHM/thumbnail.jpg?time=0`}
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          style={
            {
              "--controls": "none",
              "--media-object-fit": "cover",
              "--media-object-position": "center",
              width: "100%",
              height: "100%",
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  );
};

export default Firstsection;
