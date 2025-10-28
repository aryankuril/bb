import React from 'react';

const Firstsection = () => {
  return (
    <section className="lg:mt-0 -mt-20 relative isolate w-full overflow-hidden">
      {/* Wrapper: 9:16 on mobile, fixed 880px on desktop */}
      <div className="relative w-full h-screen  aspect-[9/16] ">
        {/* Desktop Video */}
        <video
          src="/video/home.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute inset-0 w-full h-screen object-cover"
        />

        {/* Mobile Video */}
        <video
          src="/video/home-m-Trim.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Firstsection;