import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full  ">
      <div className=" mx-auto  container py-5 mt-3 ">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start lg:gap-8 gap-4 text-left">
          {/* Logo */}
          <div className="flex justify-start">
            <Link href="#">
            <Image
              src="/images/bblogo.webp"
              alt="Bombay Blokes Logo"
              width={250}
              height={60}
              className="object-contain"
            />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="font-['Poppins']  lg:mt-6 mt-2 border-t pt-4 lg:pt-1 flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-gray-500 text-sm">
          {/* Links */}
         <div className="flex flex-wrap items-start gap-1 md:gap-3 md:order-2">
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors border-r border-gray-400 pr-2"
  >
    Home
  </Link>
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors border-r border-gray-400 pr-2"
  >
    Our Clients
  </Link>
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors border-r border-gray-400 pr-2"
  >
    Contact
  </Link>
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors border-r border-gray-400 pr-2"
  >
    Client Registration
  </Link>
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors border-r border-gray-400 pr-2"
  >
    Service Affiliates
  </Link>
  <Link
    href="#"
    className="hover:text-[#F9B31B] transition-colors"
  >
    Blogs
  </Link>
</div>

          {/* Copyright */}
          <p className="text-left md:order-1 mt-2 font-['Poppins'] lg:text-[14px] text-[12px] ">
            Copyright ©2023 Bombay Blokes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
