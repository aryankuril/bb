"use client";

const logos = [
  "/images/logo/LOGO(1).png",
  "/images/logo/LOGO(2).png",
  "/images/logo/LOGO(3).png",
  "/images/logo/LOGO(4).png",
  "/images/logo/LOGO(5).png",
  "/images/logo/LOGO(6).png",
  "/images/logo/LOGO(7).png",
  "/images/logo/LOGO(8).png",
  "/images/logo/LOGO(1).png",
  "/images/logo/LOGO(2).png",
  "/images/logo/LOGO(3).png",
  "/images/logo/LOGO(4).png",
  "/images/logo/LOGO(5).png",
  "/images/logo/LOGO(6).png",
  "/images/logo/LOGO(7).png",
];

export default function LogoSlider() {
  return (
    <section className="w-full container overflow-hidden">
     <div className="flex animate-logo-slider gap-4 md:gap-6">
  {[...logos, ...logos].map((logo, index) => (
    <div
      key={index}
      className="
        flex-shrink-0
        w-[140px]
        h-[90px]
        sm:w-[160px]
        sm:h-[100px]
        md:w-[190px]
        md:h-[110px]
        lg:w-[220px]
        lg:h-[120px]
        border
      
        rounded-xl
        bg-black
    
        flex
        items-center
        justify-center
  
      "
    >
      <img
        src={logo}
        alt={`Logo ${index + 1}`}
        className="
          w-full
          h-full
          object-contain
        "
      />
    </div>
  ))}
</div>
    </section>
  );
}