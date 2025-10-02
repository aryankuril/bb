import React from 'react'

const Firstsection = () => {
  return (
<section className="container py-10 sm:py-15 lg:py-20 relative isolate w-full overflow-hidden">
      {/* Wrapper: 9:16 on mobile, fixed 880px on desktop */}
      <div className="relative w-full aspect-[9/16] md:aspect-auto md:h-[880px]">
        <picture>
          {/* Desktop image (>=768px) */}
          <source
            media="(min-width: 768px)"
            srcSet="/images/herosection-desktop.png"
          />
          {/* Mobile fallback */}
          <img
            src="/images/herosection-mobile.jpg"
            alt="Hero section banner"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </picture>
 
      </div>
    </section>
  )
}

export default Firstsection