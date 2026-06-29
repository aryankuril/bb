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
  "/images/logo/LOGO(9).png",
  "/images/logo/LOGO(10).png",
  "/images/logo/LOGO(11).png",
  "/images/logo/LOGO(12).png",
  "/images/logo/LOGO(13).png",
  "/images/logo/LOGO(14).png",
  "/images/logo/LOGO(15).png",
  "/images/logo/LOGO(16).png",
  "/images/logo/LOGO(17).png",
  "/images/logo/LOGO(18).png",
  "/images/logo/LOGO(19).png",
  "/images/logo/LOGO(20).png",
];

const firstRow = logos.slice(0, 10);
const secondRow = logos.slice(10, 20);

export default function AdsLogoSection() {
  return (
    <div className="overflow-hidden space-y-6 container py-10 sm:py-15 lg:py-20">

<div className="w-full flex justify-center mb-8">
  <h6 className="inline-block text-center font-outfit leading-tight text-black">
    Brands That Trust Our Work
  </h6>
</div>


       {/* <h6 className="black-text text-center">Brands That Trust The Work</h6> */}

      {/* Row 1 */}
     <div className="relative overflow-hidden">
   <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" />
        <div className="flex animate-marquee gap-6">
          {[...firstRow, ...firstRow].map((logo, i) => (
            <LogoCard logo={logo} key={i} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative overflow-hidden">
       <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" />
        <div className="flex animate-marquee-reverse gap-6">
          {[...secondRow, ...secondRow].map((logo, i) => (
            <LogoCard logo={logo} key={i} />
          ))}
        </div>
      </div>

    </div>
  );
}

function LogoCard({ logo }: { logo: string }) {
  return (
    <div
      className="
      flex-shrink-0
      flex
      items-center
      justify-center

      w-[120px]
      h-[70px]

      sm:w-[150px]
      sm:h-[80px]

      md:w-[170px]
      md:h-[90px]

      lg:w-[190px]
      lg:h-[100px]

      rounded-[20px]
      border
      border-[#e8e8e8]
      bg-black
      overflow-hidden
      "
    >
      <img
        src={logo}
        alt=""
        className=" object-contain "
      />
    </div>
  );
}