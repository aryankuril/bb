import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";
import Image from "next/image";
import Link from "next/link";


export function FinalCTA() {
  return (
    <section className="py-8 sm:py-8 lg:py-8">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-7 py-14 text-secondary-foreground sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-background/25 blur-3xl"
            />
            <div className="relative max-w-3xl">
              <span className="eyebrow text-secondary-foreground/70 subtitle">Next step</span>
              <a className="mt-4 heading block ">
                Get a free account audit and the number we think we can move.
              </a>
              <p className="mt-5 max-w-xl subtitle">
                No decks, no jargon. One call with a Google Ads and Meta ads expert who has already
                looked at your account.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#audit"
                  className="group bg-ink text-background inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5"
                >
                  Get free audit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+919833037816"
                  className="border-ink/25 inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-bold transition-colors hover:bg-background/25"
                >
                  <Phone className="size-4" />
                  Talk to a strategist
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto container py-5 mt-3 ">
        {/* Top Section */}
      {/* Top Section */}
<div className="flex items-center justify-between w-full">
  {/* Logo */}
  <div className="hidden sm:flex justify-start relative">
    <Link href="/paid-marketing">
      <Image
        src="/images/bblogo.webp"
        alt="Bombay Blokes Logo"
        width={250}
        height={60}
        className="object-contain"
      />
    </Link>
  </div>

  {/* Social Icons - Far Right */}
  <div className="hidden sm:flex items-center gap-5 ml-auto">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/bombay_blokes"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
       className="text-black transition-colors duration-300 hover:text-[#FAB31E]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </a>

    {/* LinkedIn */}
   <a
  href="https://in.linkedin.com/company/bombay-blokes-digital-solutions-llp"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="text-black transition-colors duration-300 hover:text-[#FAB31E]"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
</a>
  </div>

    {/* mobiel Social Icons - Far Right */}
  <div className="flex items-center lg:gap-5 gap-3 lg:hidden">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/bombay_blokes"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
       className="text-black transition-colors duration-300 hover:text-[#FAB31E]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </a>

    {/* LinkedIn */}
   <a
  href="https://in.linkedin.com/company/bombay-blokes-digital-solutions-llp"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="text-black transition-colors duration-300 hover:text-[#FAB31E]"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
</a>
  </div>
</div>

        {/* Bottom Section */}
     <div className="body4 lg:mt-6 mt-2 border-t pt-4 lg:pt-1 flex flex-col gap-4 md:flex-row md:justify-center md:items-center black-text text-sm">
  {/* Copyright */}
  <p className="text-center mt-2 body4">
    Copyright ©{new Date().getFullYear()} Bombay Blokes. All rights
    reserved.
  </p>
</div>
      </div>
    </footer>
  );
}
