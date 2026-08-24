"use client";

const logos = [
  "/images/lp-logos/logo(1).png",
  "/images/lp-logos/logo(2).png",
  "/images/lp-logos/logo(3).png",
  "/images/lp-logos/logo(4).png",
  "/images/lp-logos/logo(5).png",
  "/images/lp-logos/logo(6).png",
  "/images/lp-logos/logo(7).png",
  "/images/lp-logos/logo(8).png",
  "/images/lp-logos/logo(9).png",
  "/images/lp-logos/logo(11).png",
  "/images/lp-logos/logo(12).png",
  "/images/lp-logos/logo(13).png",
  "/images/lp-logos/logo(14).png",
  "/images/lp-logos/logo(15).png",
   "/images/lp-logos/logo(1).png",
  "/images/lp-logos/logo(2).png",
  "/images/lp-logos/logo(3).png",
  "/images/lp-logos/logo(4).png",
  "/images/lp-logos/logo(5).png",
];

const firstRow = logos.slice(0, 10);
const secondRow = logos.slice(10, 20);

export default function LogoMarquee() {
  return (
    <section  id="section-3" className="overflow-hidden border-y bg-sand py-8 sm:py-8 lg:py-8">
      <div className="container">

        {/* Heading */}
        <div className="mb-8 w-full mx-auto text-center">
          <h2 className="heading">
            Brands That Trust Our Work
          </h2>
        </div>

       {/* ROW 1 */}
<div className="group relative mb-6 overflow-hidden">
  {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" /> */}

  <div className="flex w-max gap-6 animate-marquee">
    {[...firstRow, ...firstRow].map((logo, i) => (
      <LogoCard logo={logo} key={i} />
    ))}
  </div>
</div>

{/* ROW 2 */}
<div className="group relative overflow-hidden">
  {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" /> */}

  <div className="flex w-max gap-6 animate-marquee-reverse">
    {[...secondRow, ...secondRow].map((logo, i) => (
      <LogoCard logo={logo} key={i} />
    ))}
  </div>
</div>

      </div>
    </section>
  );
}

function LogoCard({ logo }: { logo: string }) {
  return (
    <div
      className="
        flex
        flex-shrink-0
        items-center
        justify-center
        overflow-hidden
        border-none
        p-3
     

        w-[120px]
        h-[70px]

        sm:w-[150px]
        sm:h-[80px]

        md:w-[170px]
        md:h-[90px]

        lg:w-[150px]
        lg:h-[80px]
      "
    >
      <img
        src={logo}
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}