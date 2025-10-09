"use client";
 
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
 
type NavItem = { label: string; href?: string };
 
const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/aboutus" },
  { label: "SERVICES", href: "services" },
  { label: "WORK", href: "/ourwork" },
  { label: "CLIENTS", href: "/clients" },
  { label: "TEAM", href: "/teams" },
  { label: "CONTACT", href: "/contactus" },
  { label: "CAREERS", href: "/career" },
];
 
const BOTTOM_BAR_H = 68; // height of the bottom bar
const BORDER_W = 2;      // border thickness used in both sheet and bar
 

const MobileNav = () => {
 const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
 
  // lock/unlock body scroll with the panel
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
 
  const handleItemClick = (i: number, href?: string) => {
    setActiveIndex(i);
    // Optional: navigate after the fill animation
    // setTimeout(() => { if (href) window.location.href = href; }, 280);
  };
 
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
 
      {/* Menu sheet that "extends" from the bottom bar */}
      <nav
        id="mobile-nav-sheet"
        className={`
          fixed left-3 right-3 md:hidden z-[70]
          origin-bottom transition-[opacity,transform] duration-200
          ${open ? "opacity-100 translate-y-0 scale-y-100"
                 : "opacity-0 translate-y-1 scale-y-[0.98] pointer-events-none"}
        `}
        /* Leave EXACTLY one line between sheet and bar: the bar's top border */
        style={{ bottom: BOTTOM_BAR_H + 12 }}
      >
        <div
          className="
            rounded-t-[22px] rounded-b-none
            border-[3px] border-b-0 border-black
            bg-white shadow-none
            px-3 pt-3 pb-4
            /* No negative margin here so the bar's top remains visible as the single separator */
          "
        >
          <ul className="grid grid-cols-2 gap-2.5">
            {NAV_ITEMS.map((item, i) => {
  const active = i === activeIndex;
  return (
    <li key={item.label}>
      <Link
        href={item.href || "#"}
        onClick={() => setActiveIndex(i)}
        className={`
          relative block w-full overflow-hidden
          rounded-[14px] border-[2.5px] border-black
          transition-colors duration-300
          ${active ? "bg-[#FAB31E] text-black" : "bg-[#1D1D1D] text-white"}
          active:translate-y-[1px]
          text-center
        `}
      >
        <span
          aria-hidden
          className={`
            absolute right-0 inset-y-0 bg-[#FAB31E]
            transition-[width] duration-300 ease-out
            rounded-r-[12px]
            ${active ? "w-full" : "w-2.5"}
          `}
        />
        <span className="relative z-10 block px-4 py-3 font-semibold tracking-wide">
          {item.label}
        </span>
      </Link>
    </li>
  );
})}

          </ul>
        </div>
      </nav>
 
      {/* Bottom bar */}
      <div
        className={`
          fixed left-3 right-3 bottom-3 md:hidden z-[80]
          border-[3px] border-black bg-white
 
          ${open ? "rounded-t-[0px] rounded-b-[22px]" : "rounded-[22px]"}
        `}
        style={{ height: BOTTOM_BAR_H }}
      >
        <div className="h-full flex items-center justify-between px-4">
          {/* Brand placeholder (replace with your logo/wordmark) */}
          <div className="flex items-center gap-2">
            <Link href="/">
            <Image
              src="/images/bblogo.webp"
              alt="Bombay Blokes Logo"
              width={160}
              height={50}
              className="object-contain transition-opacity duration-300"
            />
          </Link>
          </div>
 
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-[10px] border-[2.5px] border-black px-3 py-1
                       text-[13px] font-semibold tracking-wide bg-white
                       transition-[opacity,transform] duration-200
                       active:translate-y-[1px]"
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
 
      {/* Safe-area spacer */}
      <div className="h-[84px] md:hidden" />
    </>
  );
}

export default MobileNav