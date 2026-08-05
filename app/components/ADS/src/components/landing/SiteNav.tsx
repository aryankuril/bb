"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/app/components/ADS/src/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/85 border-b backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="bg-ink text-background grid size-9 shrink-0 place-items-center rounded-xl font-display text-sm font-bold">
            BB
          </span>
          <span className="truncate font-display text-base leading-tight font-extrabold tracking-tight">
            Bombay Blokes
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#audit"
            className="bg-ink text-background hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-lift sm:inline-flex hover:-translate-y-0.5"
          >
            Get Free Audit
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="border-border grid size-10 shrink-0 place-items-center rounded-full border lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="bg-background border-b lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:bg-muted rounded-lg px-3 py-3 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setOpen(false)}
              className="bg-ink text-background mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
