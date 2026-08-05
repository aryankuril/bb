import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/app/components/ADS/src/components/Reveal";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-7 py-14 text-secondary-foreground sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-background/25 blur-3xl"
            />
            <div className="relative max-w-3xl">
              <span className="eyebrow text-secondary-foreground/70">Next step</span>
              <h2 className="mt-4 text-4xl font-extrabold sm:text-6xl">
                Get a free account audit and the number we think we can move.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base">
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
                  href="tel:+919999999999"
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
    <footer className="bg-ink text-background pt-16 pb-10">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="bg-secondary text-secondary-foreground grid size-9 place-items-center rounded-xl font-display text-sm font-bold">
                BB
              </span>
              <span className="font-display text-lg font-extrabold">Bombay Blokes</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/65">
              A performance marketing agency in Mumbai running Google Ads, Meta Ads, SEO and web for
              brands that measure growth in revenue.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-background/65">
              {[
                "Performance marketing",
                "Google Ads management",
                "Meta ads & lead gen",
                "SEO",
                "Website development",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="transition-colors hover:text-secondary">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-background/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
                Mumbai, Maharashtra, India
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-secondary" />
                <a href="mailto:hello@bombayblokes.com" className="hover:text-secondary">
                  hello@bombayblokes.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-secondary" />
                <a href="tel:+919999999999" className="hover:text-secondary">
                  +91 99999 99999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bombay Blokes. All rights reserved.</p>
          <p>Performance marketing agency in Mumbai · Google &amp; Meta Ads</p>
        </div>
      </div>
    </footer>
  );
}
