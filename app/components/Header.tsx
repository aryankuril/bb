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

  const yellow = useRef<HTMLDivElement | null>(null); // yellow block
  const black = useRef<HTMLDivElement | null>(null); // black panel
  const divider = useRef<HTMLDivElement | null>(null);

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
      width: 96,
      height: 96,
      borderRadius: 16,
      backgroundColor: YELLOW,
    });

    gsap.set(b, {
      position: "absolute",
      inset: 0,
      backgroundColor: DARK,
      clipPath: "inset(0 100% 0 0 round 0px)", // hidden
    });

    gsap.set(d, { scaleY: 0, transformOrigin: "50% 50%" });
    gsap.set([l.children, r.children], { opacity: 0, y: 14 });
    gsap.set(br, { opacity: 0, y: 10 });

    // build timeline
    const ctx = gsap.context(() => {
      const dur1 = 0.80;
      const dur2 = 0.80;
      const ease = "expo.inOut";

      tl.current = gsap.timeline({ paused: true });

      tl.current
        // Stage in
        .to(stage.current, { opacity: 1, pointerEvents: "auto", duration: 1 }, 0)

        // 1) Yellow expands to fill stage
        .to(
          y,
          {
            width: () => s.clientWidth,
            height: () => s.clientHeight,
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            borderRadius: 0,
            duration: dur1,
            ease,
          },
          0.02
        )

        // 2) Black wipes in
        .to(
          b,
          {
            clipPath: "inset(0 0% 0 0 round 0px)",
            duration: dur2,
            ease,
          },
          ">-0.05"
        )

        // 3) Yellow shrinks into right accent line
        .to(
          y,
          {
            width: 10,
            height: () => s.clientHeight,
            left: () => s.clientWidth,
            xPercent: -100,
            top: "50%",
            yPercent: -50,
            duration: dur2 * 1,
            ease,
          },
          "<+0.1"
        )

        // 4) Divider + content
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
    <div ref={root} className="container py-5 absolute inset-x-0 top-0 z-[99999]">
      {/* nav shell */}
      <div ref={shell} className="rounded-2xl text-neutral-200">
        <div className="flex items-center justify-between">
          <Link href="#">
            <Image
              src="/images/bblogo.webp"
              alt="Bombay Blokes Logo"
              width={160}
              height={50}
              className="object-contain transition-opacity duration-300"
            />
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="relative grid h-13 w-12 text-[26px] border-2 border-black leading-6 cursor-pointer font-miso place-items-center text-black"
          >
            M E <br />N U
          </button>
        </div>

        {/* stage */}
        <div
          ref={stage}
          className="relative mt-30 h-[400px] w-[450px] ml-[500px] flex justify-center items-center overflow-hidden rounded-xl border border-neutral-800/60"
        >
          <div ref={black} />
          <div ref={yellow} />

          {/* divider */}
          <div
            ref={divider}
            className="absolute left-1/2 mt-[200px] -translate-y-1/2 w-[2px] h-[60%]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #737373 0 20px, transparent 20px 40px)",
            }}
          />

          {/* <div className="absolute right-0 top-0 w-3 sm:w-5 md:w-5 h-full bg-[#FAB31E]"></div> */}

          {/* content */}
          <div className="relative z-10 grid h-full grid-cols-2 gap-10 px-12 py-12 text-sm">
            <ul ref={leftCol} className="space-y-6 text-center px-5">
              <li>
                <Link
                  href="/"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <ul ref={rightCol} className="space-y-6 text-center">
              <li>
                <Link
                  href="/aboutus"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/ourwork"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="text-white font-[Miso] text-[40px] font-normal uppercase leading-none"
                >
                  Careers
                </Link>
              </li>
            </ul>

            <div
              ref={bottomRow}
              className="pointer-events-none absolute  bottom-4 left-0 right-0 flex items-center justify-center px-6 text-xs uppercase tracking-wide"
            >
              <div className="pointer-events-auto flex gap-3">
                <a href="#" className="opacity-80 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
  <path d="M16.0012 0C11.6558 0 11.1104 0.0190003 9.40376 0.096667C7.70041 0.174667 6.53774 0.444334 5.52039 0.84C4.46805 1.24867 3.57537 1.79533 2.68603 2.685C1.79602 3.57433 1.24935 4.467 0.839342 5.519C0.442671 6.53667 0.172669 7.69967 0.0960011 9.40233C0.0200003 11.109 0 11.6547 0 16C0 20.3453 0.0193338 20.889 0.096668 22.5957C0.175002 24.299 0.444672 25.4617 0.840009 26.479C1.24901 27.5313 1.79569 28.424 2.68536 29.3133C3.57437 30.2033 4.46705 30.7513 5.51872 31.16C6.53674 31.5557 7.69975 31.8253 9.40277 31.9033C11.1095 31.981 11.6545 32 15.9995 32C20.3452 32 20.8889 31.981 22.5956 31.9033C24.2989 31.8253 25.4629 31.5557 26.4809 31.16C27.533 30.7513 28.4243 30.2033 29.3133 29.3133C30.2033 28.424 30.75 27.5313 31.16 26.4793C31.5533 25.4617 31.8233 24.2987 31.9033 22.596C31.98 20.8893 32 20.3453 32 16C32 11.6547 31.98 11.1093 31.9033 9.40267C31.8233 7.69933 31.5533 6.53667 31.16 5.51933C30.75 4.467 30.2033 3.57433 29.3133 2.685C28.4233 1.795 27.5333 1.24833 26.4799 0.84C25.4599 0.444334 24.2966 0.174667 22.5932 0.096667C20.8866 0.0190003 20.3432 0 15.9965 0H16.0012ZM14.5658 2.88333C14.9918 2.88267 15.4672 2.88333 16.0012 2.88333C20.2732 2.88333 20.7796 2.89867 22.4666 2.97533C24.0266 3.04667 24.8733 3.30733 25.4373 3.52633C26.1839 3.81633 26.7163 4.163 27.276 4.723C27.836 5.283 28.1826 5.81633 28.4733 6.563C28.6923 7.12633 28.9533 7.973 29.0243 9.533C29.101 11.2197 29.1176 11.7263 29.1176 15.9963C29.1176 20.2663 29.101 20.773 29.0243 22.4597C28.953 24.0197 28.6923 24.8663 28.4733 25.4297C28.1833 26.1763 27.836 26.708 27.276 27.2677C26.7159 27.8277 26.1843 28.1743 25.4373 28.4643C24.8739 28.6843 24.0266 28.9443 22.4666 29.0157C20.7799 29.0923 20.2732 29.109 16.0012 29.109C11.7288 29.109 11.2225 29.0923 9.53577 29.0157C7.97575 28.9437 7.12908 28.683 6.56474 28.464C5.81806 28.174 5.28472 27.8273 4.72472 27.2673C4.16471 26.7073 3.81804 26.1753 3.52737 25.4283C3.30837 24.865 3.04737 24.0183 2.97637 22.4583C2.8997 20.7717 2.88436 20.265 2.88436 15.9923C2.88436 11.7197 2.8997 11.2157 2.97637 9.529C3.0477 7.969 3.30837 7.12233 3.52737 6.55833C3.81737 5.81167 4.16471 5.27833 4.72472 4.71833C5.28472 4.15833 5.81806 3.81167 6.56474 3.521C7.12874 3.301 7.97575 3.041 9.53577 2.96933C11.0118 2.90267 11.5838 2.88267 14.5658 2.87933V2.88333Z" fill="#FAB31E"/>
  <path d="M24.5075 5.5007C24.1277 5.5007 23.7565 5.61332 23.4407 5.82432C23.125 6.03532 22.8789 6.33523 22.7336 6.6861C22.5883 7.03697 22.5503 7.42305 22.6244 7.79552C22.6986 8.16798 22.8815 8.51009 23.1501 8.77858C23.4187 9.04707 23.7609 9.22988 24.1333 9.30389C24.5058 9.3779 24.8919 9.33978 25.2427 9.19436C25.5936 9.04893 25.8934 8.80274 26.1043 8.48691C26.3152 8.17108 26.4277 7.7998 26.4275 7.42003C26.4275 6.36003 25.5675 5.5007 24.5075 5.5007Z" fill="#FAB31E"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M15.9668 7.74403C11.429 7.74403 7.75001 11.423 7.75001 15.9607C7.75001 20.4984 11.429 24.1757 15.9668 24.1757C20.5045 24.1757 24.1825 20.4984 24.1825 15.9607C24.1825 11.423 20.5045 7.74403 15.9668 7.74403ZM16 21.25C18.8995 21.25 21.25 18.8995 21.25 16C21.25 13.1005 18.8995 10.75 16 10.75C13.1005 10.75 10.75 13.1005 10.75 16C10.75 18.8995 13.1005 21.25 16 21.25Z" fill="#FAB31E"/>
</svg></a>
                <a href="#" className="opacity-80 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M5.32462 0C2.38391 0 0 2.38782 0 5.33333V26.6667C0 29.6122 2.38391 32 5.32462 32H26.0087C28.9494 32 31.3333 29.6122 31.3333 26.6667V5.33333C31.3333 2.38781 28.9494 0 26.0087 0H5.32462ZM4.30029 7.1584C4.30029 8.76735 5.51816 9.94313 7.02043 9.94313C8.52293 9.94313 9.74079 8.76735 9.74079 7.1584C9.74079 5.54969 8.52293 4.37256 7.02043 4.37256C5.51816 4.37256 4.30029 5.54969 4.30029 7.1584ZM22.0559 27.5017H26.7741V17.9701C26.7741 13.2627 23.9291 11.6572 21.2963 11.6572C18.8619 11.6572 17.2082 13.2769 16.7516 14.2256V12.0903H12.214V27.5017H16.9322V19.1461C16.9322 16.9183 18.3046 15.8348 19.7047 15.8348C21.0289 15.8348 22.0559 16.6007 22.0559 19.0843V27.5017ZM9.37944 12.0785V27.4898H4.66143V12.0785H9.37944Z" fill="#FAB31E"/>
</svg></a>
                <a href="#" className="opacity-80 hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 30" fill="none">
  <path d="M0.0769656 0.0213623L12.4317 16.5443L0 29.9786H2.79869L13.6837 18.2172L22.4777 29.9786H32L18.9507 12.5262L30.5228 0.0213623H27.7241L17.7006 10.8533L9.60113 0.0213623H0.0788216H0.0769656ZM4.19145 2.08297H8.56499L27.8818 27.9169H23.5082L4.19145 2.08297Z" fill="#FAB31E"/>
</svg></a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* backdrop */}
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
