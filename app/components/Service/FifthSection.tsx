import React from 'react';
import Image from 'next/image';

const FifthSection = () => {
  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden text-center">
      {/* Title */}
      <h2 className="text-3xl font-medium mb-12 text-neutral-800">Our Results</h2>

      {/* Card with layered shadow effect */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Shadow Layers */}
        <div className="absolute top-4 left-4 w-full h-full rounded-2xl bg-neutral-400 opacity-40 blur-md -z-10" />
        <div className="absolute top-8 left-8 w-full h-full rounded-2xl bg-neutral-300 opacity-30 blur-lg -z-20" />

        {/* Card Content */}
        <div className="relative z-10 bg-black text-white rounded-2xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Left Side Text */}
          <div className="text-left md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-white/80 text-lg font-medium mb-2">WOGAN</h3>
            <p className="text-yellow-400 text-[80px] leading-none font-bold">80%</p>
            <p className="mt-4 text-white text-base">Increase In Organic Visits After 1 Month</p>
          </div>

          {/* Right Side Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-xl overflow-hidden">
              <Image
                src="/images/wogan.png" // ✅ Replace with your actual image
                alt="Stand Tall"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-12 flex justify-center">
        <button className="relative bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition">
          EXPLORE OUR WORK +
        </button>
      </div>
    </section>
  );
};

export default FifthSection;
