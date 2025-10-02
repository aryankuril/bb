// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X, Instagram, Linkedin, X as TwitterIcon } from "lucide-react";
// import { motion, AnimatePresence, easeOut } from "framer-motion";
// // Assuming you have a file for the Button component
// import Button from "./Button"; 

// export default function Header() {
//   const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const fullMenuItems = [
//     { name: "HOME", href: "#home" },
//     { name: "ABOUT", href: "#about" },
//     { name: "SERVICES", href: "#services" },
//     { name: "WORK", href: "#work" },
//     { name: "CLIENTS", href: "#clients" },
//     { name: "TEAM", href: "#team" },
//     { name: "CONTACT", href: "#contact" },
//     { name: "CAREERS", href: "#careers" },
//   ];

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Framer Motion variants for the menu content (Links)
//   const menuListVariants = {
//     hidden: {},
//     visible: { transition: { delayChildren: 0.2, staggerChildren: 0.05 } },
//   };

//   const menuItemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { ease: easeOut, duration: 0.3 } 
//     },
//     exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
//   };

//   const closeAllMenus = () => {
//     setIsFullMenuOpen(false);
//     setIsMobileMenuOpen(false);
//   }

//   // Disable body scroll when the full menu is open
//   useEffect(() => {
//     document.body.style.overflow = isFullMenuOpen ? 'hidden' : 'unset';
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isFullMenuOpen]);

//   return (
//     <header
//       className={`container fixed top-0 left-1/2 -translate-x-1/2 z-[60] transition-colors duration-300 ${
//         scrolled ? "bg-[#F9B31B]" : "bg-transparent"
//       }`}
//     >
//       <div className="flex items-center justify-between py-4 ">
//         <Link href="#">
//           <Image
//             src={scrolled ? "/images/bblogo2.svg" : "/images/bblogo.webp"}
//             alt="Bombay Blokes Logo"
//             width={160}
//             height={50}
//             className="object-contain transition-opacity duration-300"
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6 font-medium text-black">
//           <Button href="#" text="Start Growing" className="font-['Poppins']" />

//           {/* The new menu button */}
//           <button 
//             className="ml-4 border border-black px-4 py-1 cursor-pointer rounded font-['Poppins'] hover:bg-black hover:text-white transition"
//             onClick={() => setIsFullMenuOpen(true)}
//           >
//             M E <br /> N U
//           </button>
//         </nav>

//         {/* Mobile toggle */}
//         <button
//           className="md:hidden text-black relative z-[70]"
//           onClick={() => setIsMobileMenuOpen((v) => !v)}
//           aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* --- Full-Screen Menu Overlay (The centered opening/closing animation) --- */}
//       <AnimatePresence>
//         {isFullMenuOpen && (
//           <motion.div
//             className="fixed inset-0 z-[90] flex items-center justify-center cursor-pointer"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => setIsFullMenuOpen(false)} // Click anywhere to close
//           >
//             {/* The Animated Dark Background Box: The KEY to the centered animation */}
//             <motion.div
//               className="absolute inset-0 bg-black"
//               // Start state: scaled down to 0 (hidden at the center)
//               initial={{ scaleY: 0 }}
//               // Animate state: scaled to 1 (full height)
//               animate={{ scaleY: 1, transition: { duration: 0.35, ease: "easeOut" } }}
//               // Exit state: scaled back to 0 (shrinking to the center)
//               exit={{ scaleY: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
//               // THIS IS THE FIX: Set the pivot point to the middle of the element (0.5)
//               style={{ originY: 0.5 }} 
//             />
            
//             {/* Menu Content (Links and CLOSE button) */}
//             <motion.div
//               className="relative z-10 w-full max-w-7xl h-full p-8 text-white font-['Poppins'] flex flex-col justify-center items-center"
//               onClick={(e) => e.stopPropagation()} 
//             >
//               <button 
//                 className="absolute top-8 right-8 text-xl font-semibold hover:text-[#F9B31B] transition"
//                 onClick={() => setIsFullMenuOpen(false)}
//               >
//                 CLOSE
//               </button>
              
//               {/* Menu Links Grid */}
//               <motion.div
//                 className="grid grid-cols-2 gap-x-12 gap-y-6 text-center"
//                 variants={menuListVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit" 
//               >
//                 {fullMenuItems.map((item, index) => (
//                   <motion.div key={item.name} variants={menuItemVariants}>
//                     <Link 
//                       href={item.href} 
//                       className="text-3xl md:text-5xl lg:text-7xl font-light hover:text-[#F9B31B] transition block p-2"
//                       onClick={closeAllMenus}
//                     >
//                       {item.name}
//                     </Link>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               {/* Social Icons */}
//               <motion.div
//                 className="absolute bottom-10 flex space-x-8"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3 } }}
//                 exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
//               >
//                 <a href="#" className="hover:text-[#F9B31B] transition"><Instagram size={28} /></a>
//                 <a href="#" className="hover:text-[#F9B31B] transition"><Linkedin size={28} /></a>
//                 <a href="#" className="hover:text-[#F9B31B] transition"><TwitterIcon size={28} /></a>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>


//       {/* --- Existing Mobile Sidebar (Unchanged) --- */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             className="fixed left-0 top-[60px] w-full h-screen bg-white z-40 flex flex-col md:hidden"
//             initial={{ y: -500 }}
//             animate={{ y: 0 }}
//             exit={{ y: -500 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//           >
//             {/* ... mobile menu content ... */}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }









// app/components/DesktopNav.tsx
"use client";
 
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
 
const YELLOW = "#FAB31E";
const DARK = "#1D1D1D";
 
export default function DesktopNav() {
  const [open, setOpen] = useState(false);
 
  // refs
  const root = useRef<HTMLDivElement | null>(null);
  const shell = useRef<HTMLDivElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
 
  const yellow = useRef<HTMLDivElement | null>(null);     // yellow block that morphs
  const black = useRef<HTMLDivElement | null>(null);      // black panel revealed by clip-path
  const divider = useRef<HTMLDivElement | null>(null);    // center rule
 
  const leftCol = useRef<HTMLUListElement | null>(null);
  const rightCol = useRef<HTMLUListElement | null>(null);
  const bottomRow = useRef<HTMLDivElement | null>(null);
 
  const tl = useRef<gsap.core.Timeline | null>(null);
 
  useLayoutEffect(() => {
    const s = stage.current!;
    const y = yellow.current!;
    const b = black.current!;
    const d = divider.current!;
    const l = leftCol.current!;
    const r = rightCol.current!;
    const br = bottomRow.current!;
    const sh = shell.current!;
 
    // base states
    gsap.set(stage.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(y, {
      position: "absolute",
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      width: 96,          // perfect square start
      height: 96,
      borderRadius: 16,
      backgroundColor: YELLOW,
    });
 
    // black layer is fully underneath but hidden by clip-path (revealed from left ➜ right)
    gsap.set(b, {
      position: "absolute",
      inset: 0,
      backgroundColor: DARK,
      clipPath: "inset(0 100% 0 0 round 0px)", // 100% right side clipped (not visible)
    });
 
    // thin right accent (we'll reuse yellow by shrinking it)
    // divider and content hidden
    gsap.set(d, { scaleY: 0, transformOrigin: "50% 50%" });
    gsap.set([l.children, r.children], { opacity: 0, y: 14 });
    gsap.set(br, { opacity: 0, y: 10 });
 
    // build timeline
    const ctx = gsap.context(() => {
      const dur1 = 0.42;   // square → rectangle
      const dur2 = 0.60;   // wipe to black while yellow pushes to edge
      const ease = "expo.inOut";
 
      tl.current = gsap.timeline({ paused: true });
 
      tl.current
        // bring stage in and lock pointer
        .to(stage.current, { opacity: 1, pointerEvents: "auto", duration: 0.12 }, 0)
 
        // 1) square ➜ rectangle (only width & height morph; stays centered)
        .to(
          y,
          {
            width: () => Math.min(640, s.clientWidth * 0.62),
            height: 148,
            borderRadius: 18,
            duration: dur1,
            ease,
          },
          0.02
        )
 
        // 2) push: black wipes in from left while yellow rides to the right and thins into the border
        //    NOTE: we keep the wipe and the yellow width tied to stage width for a single-surface feel
        .to(
          y,
          {
            // move to right edge and stretch to full height first
            left: () => s.clientWidth - 6, // target near right edge
            xPercent: -100,
            top: "50%",
            height: () => s.clientHeight,
            borderRadius: 0,
            duration: dur2,
            ease,
          },
          ">-0.08"
        )
        .to(
          b,
          {
            // clip-path inset animates from right=100% to right=0% (full reveal)
            clipPath: "inset(0 0% 0 0 round 0px)",
            duration: dur2,
            ease,
          },
          "<"
        )
        .to(
          y,
          {
            // as black fills, shrink yellow into a clean 10px accent
            width: 10,
            duration: dur2 * 0.8,
            ease,
          },
          "<"
        )
 
        // 3) center divider draws; items reveal; bottom row in
        
        .to(d, { scaleY: 1, duration: 0.35, ease: "power3.out" }, "-=0.18")
        .to(
          [l.children, r.children],
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            stagger: { each: 0.05, from: "edges" },
          },
          "-=0.22"
        )
        .to(br, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }, "-=0.22")
 
        // 4) shell top corners flatten so the open panel feels fused with the navbar
        .to(sh, { borderTopLeftRadius: 0, borderTopRightRadius: 0, duration: 0.18, ease }, 0.06);
    }, root);
 
    return () => ctx.revert();
  }, []);
 
  useLayoutEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.play();
    else tl.current.reverse();
  }, [open]);
 
  return (
    <div ref={root} className=" container py-5 fixed inset-x-0 top-0 z-[99999]">
      {/* nav shell */}
      <div
        ref={shell}
        className=" rounded-2xl  text-neutral-200"
      >
        <div className="flex items-center justify-between ">
          <Link href="#">
          <Image
            src="/images/bblogo2.svg" 
            alt="Bombay Blokes Logo"
            width={160}
            height={50}
            className="object-contain transition-opacity duration-300"
          />
         </Link>
 
          {/* HAMBURGER (animates to X) */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="relative grid h-10 w-12 place-items-center rounded-md "
          >
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "rotate-45 translate-y-[1px]" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 bg-black transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[1px]" : "translate-y-2"
              }`}
            />
          </button>
        </div>
 
        {/* stage (animation playground) */}
        <div
          ref={stage}
          className="relative mt-30 h-[400px] w-[450px] ml-[500px] flex justify-center items-center overflow-hidden rounded-xl border border-neutral-800/60"
         >
          {/* black panel below, revealed by clip-path */}
          <div ref={black} />
 
          {/* yellow block that morphs & becomes right accent */}
          <div ref={yellow} />
 
          {/* center divider */}
          <div
            ref={divider}
            className="absolute left-1/2 top-6 bottom-6 w-px bg-neutral-600/60"
          />
           <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-5 h-full bg-[#FAB31E]"></div>
 
          {/* content */}
          <div className="relative z-10 grid h-full grid-cols-2 gap-10 px-12 py-12 text-sm">
            <ul ref={leftCol} className="space-y-6 text-center px-5">
  <li>
    <Link href="/" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Home
    </Link>
  </li>
  <li>
    <Link href="/services" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Services
    </Link>
  </li>
  <li>
    <Link href="/clients" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Clients
    </Link>
  </li>
  <li>
    <Link href="/contactus" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Contact
    </Link>
  </li>
</ul>

<ul ref={rightCol} className="space-y-6 text-center">
  <li>
    <Link href="/aboutus" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      About
    </Link>
  </li>
  <li>
    <Link href="/clients" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Work
    </Link>
  </li>
  <li>
    <Link href="/teams" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Team
    </Link>
  </li>
  <li>
    <Link href="/career" className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none">
      Careers
    </Link>
  </li>
</ul>
 
            <div
              ref={bottomRow}
              className="pointer-events-none absolute  bottom-4 left-0 right-0 flex items-center justify-center px-6 text-xs uppercase tracking-wide"
            >
              <div className="pointer-events-auto flex gap-3">
                <a href="#" className="opacity-80 hover:opacity-100">IG</a>
                <a href="#" className="opacity-80 hover:opacity-100">X</a>
                <a href="#" className="opacity-80 hover:opacity-100">In</a>
              </div>

            </div>
          </div>
        </div>
        
      </div>
 
      {/* backdrop (kept super light so the header feels like one piece) */}
      <div
        className={`fixed inset-0 -z-10 transition-opacity mr-5 ${
          open ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,.2), rgba(0,0,0,.2))" }}
        onClick={() => setOpen(false)}
      />
    </div>
  );
}