
"use client"
import { useState } from "react";
import { ArrowRight, Check, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import heroDashboard from "@/app/components/ADS/src/assets/hero-dashboard.jpg";

const services = [
  "Performance Marketing (Google + Meta Ads)",
  "Google Ads Management",
  "Social Media Marketing",
  "Website Development",
  "SEO",
];

const budgets = [
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "₹5,00,000+",
];

const challenges = [
  "Not getting enough leads",
  "Leads are low quality",
  "High cost per lead",
  "Low ROAS",
  "Sales have plateaued",
  "Starting from scratch",
];

export function Hero() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Audit request received", {
        description: "A strategist will call you within 24 working hours.",
      });
    }, 700);
  };

  return (
    <section id="top" className=" relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-secondary/25 blur-[120px]"
      />
      <div
        aria-hidden
        className=" py-10 sm:py-[60px] lg:py-20 pointer-events-none absolute -bottom-52 -left-40 size-[32rem] rounded-full bg-muted blur-[110px]"
      />

      <div className="container relative grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-rise">
          <div className="border-border bg-surface inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            Mumbai · Google &amp; Meta Ads specialists
          </div>

          <h1 className="mt-6 text-[2.6rem] font-extrabold sm:text-6xl lg:text-[4.15rem]">
            The performance marketing agency in Mumbai that{" "}
            <span className="highlight-amber">engineers revenue</span>, not just reach.
          </h1>

          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            Google Ads experts and Meta ads specialists running ROAS-focused campaigns for D2C,
            ecommerce and lead-gen brands. ₹20Cr+ ad spend managed, 4X average ROAS, and reporting
            you can actually read.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {[
              "Free account audit in 48 hours",
              "Dedicated Google Ads expert",
              "Creative + media under one roof",
              "No lock-in, monthly rolling",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary">
                  <Check className="size-3 text-secondary-foreground" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">
                <strong className="text-foreground">5.0</strong> from 150+ clients
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4 text-secondary" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">1000+</strong> projects delivered
              </span>
            </div>
          </div>

          <div className="relative mt-10 hidden lg:block">
            <img
              src={heroDashboard.src}
              alt="Performance marketing dashboard showing ROAS growth, spend and campaign results"
              width={1200}
              height={1104}
              className="border-border aspect-[16/10] w-full max-w-xl rounded-2xl border object-cover object-top shadow-lift"
            />
          </div>
        </div>

        {/* Lead form */}
        <div id="audit" className="lg:sticky lg:top-28">
          <form
            onSubmit={onSubmit}
            className="card-soft animate-rise p-6 shadow-lift sm:p-8"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-extrabold">Get your free ads audit</h2>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  One page. No sales script. Real numbers.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-bold tracking-wide text-secondary-foreground uppercase">
                Free
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input required name="name" placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 98XXXXXXXX"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Work email">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Service you need">
                  <select required name="service" defaultValue="" className={inputCls}>
                    <option value="" disabled>
                      Select service
                    </option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Monthly ad budget">
                  <select required name="budget" defaultValue="" className={inputCls}>
                    <option value="" disabled>
                      Select budget
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Biggest marketing challenge">
                <select required name="challenge" defaultValue="" className={inputCls}>
                  <option value="" disabled>
                    Select challenge
                  </option>
                  {challenges.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Anything about your growth goals (optional)">
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your business and targets…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:shadow-amber disabled:opacity-70"
            >
              {sending ? "Sending…" : "Get my free audit"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-muted-foreground mt-4 text-center text-xs">
              We reply within 24 working hours. Your details stay private.
            </p>
          </form>
        </div>

        <div className="lg:hidden">
          <img
            src={heroDashboard.src}
            alt="Performance marketing dashboard showing ROAS growth, spend and campaign results"
            width={1200}
            height={1104}
            loading="lazy"
            className="border-border w-full rounded-2xl border object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-muted-foreground mb-1.5 block text-xs font-semibold">{label}</span>
      {children}
    </label>
  );
}
