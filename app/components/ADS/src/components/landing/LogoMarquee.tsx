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
  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" />

  <div className="flex w-max gap-6 animate-marquee">
    {[...firstRow, ...firstRow].map((logo, i) => (
      <LogoCard logo={logo} key={i} />
    ))}
  </div>
</div>

{/* ROW 2 */}
<div className="group relative overflow-hidden">
  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white/90 via-white/40 to-transparent" />

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
        rounded-[20px]
        border
        border-[#e8e8e8]
        bg-black

        w-[120px]
        h-[70px]

        sm:w-[150px]
        sm:h-[80px]

        md:w-[170px]
        md:h-[90px]

        lg:w-[190px]
        lg:h-[100px]
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