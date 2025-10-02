import React from "react";

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Research',
      image: "/images/section2-img1.png",
    },
    {
      number: '02',
      title: 'Strategy',
      image: "/images/section2-img2.png",
    },
    {
      number: '03',
      title: 'Identity Creation',
      image: "/images/section2-img3.png",
    },
    {
      number: '04',
      title: 'Experience Design',
      image: "/images/section2-img4.png",
    },
    {
      number: '05',
      title: 'Activation',
      image: "/images/section2-img5.png",
    },
    {
      number: '06',
      title: 'Growth & Optimization',
      image: "/images/section2-img6.png",
    }
  ]

const SecondSection = () => {
  return (
 <section className="container py-10 sm:py-15 lg:py-20">
  {/* Title */}
  <div className="text-center mb-8 sm:mb-12 ">
    <h2 className="font-[miso] text-[#1D1D1D] text-[32px] sm:text-[50px] md:text-[80px] leading-[40px] sm:leading-[60px] md:leading-[80px] tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2.4px] font-normal capitalize lg:w-[950px] flex-[1_0_0] mx-auto">
      How do <span className="text-[#FAB31E]">stories</span> turn into strategy, and strategy into growth?
    </h2>
  </div>

  <div className="space-y-6">
    {/* Row 1 */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Left (wider) */}
      <div className="col-span-1 md:col-span-3 relative h-[220px] sm:h-[300px] md:h-[400px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[0].image}
          alt={processSteps[0].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[0].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[0].title}
          </h3>
        </div>
      </div>

      {/* Right (smaller) */}
      <div className="col-span-1 md:col-span-2 relative h-[220px] sm:h-[300px] md:h-[400px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[1].image}
          alt={processSteps[1].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[1].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[1].title}
          </h3>
        </div>
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Left (smaller) */}
      <div className="col-span-1 md:col-span-2 relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[2].image}
          alt={processSteps[2].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[2].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[2].title}
          </h3>
        </div>
      </div>

      {/* Right (bigger) */}
      <div className="col-span-1 md:col-span-3 relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[3].image}
          alt={processSteps[3].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[3].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[3].title}
          </h3>
        </div>
      </div>
    </div>

    {/* Row 3 */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Left (wider) */}
      <div className="col-span-1 md:col-span-3 relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[4].image}
          alt={processSteps[4].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[4].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[4].title}
          </h3>
        </div>
      </div>

      {/* Right (smaller) */}
      <div className="col-span-1 md:col-span-2 relative h-[220px] sm:h-[300px] md:h-[370px] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gradient-to-t from-black/100 to-black/0">
        <img
          src={processSteps[5].image}
          alt={processSteps[5].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-end gap-2 sm:gap-4">
          <span className="font-[miso] text-[#FAB31E] text-[50px] sm:text-[80px] md:text-[120px] leading-[50px] sm:leading-[80px] md:leading-[120px] font-normal capitalize">
            {processSteps[5].number}
          </span>
          <h3 className="font-['Poppins'] text-white text-[24px] sm:text-[36px] md:text-[50px] leading-[36px] sm:leading-[50px] md:leading-[73px] font-normal capitalize">
            {processSteps[5].title}
          </h3>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default SecondSection;
