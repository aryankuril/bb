import React from 'react';

const Firstsection = () => {
  return (
    <section className="lg:mt-0 -mt-35 relative isolate w-full overflow-hidden">
      {/* Wrapper: 9:16 on mobile, fixed 880px on desktop */}
      <div className="relative w-full h-full aspect-[9/16] md:h-[850px]">
        {/* Desktop Video */}
        <video
          src="/video/home.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-contain"
        />

        {/* Mobile Video */}
        <video
          src="/video/home-m.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="block md:hidden absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default Firstsection;
