"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Instagram, Star , ChevronDown } from "lucide-react";
import heroShoot from "../../assets/hero-shoot.jpg";

const services = ["Social media management", "Content & creative production", "Influencer & UGC", "Brand strategy", "Paid social (supporting)"];
const testimonials = [
  { quote: "Our feed finally looks like the brand we've been trying to build for years.", name: "Kaushik Shah", role: "D2C founder" },
  { quote: "They took over strategy, shoots and community management and gave us back our week. The feed finally has a personality and our DMs are full of real buyers.", name: "Alex Kriplani", role: "Marketing Head, home & living" },
  { quote: "From social media marketing to creative direction, they consistently deliver work we're proud to publish. Genuinely one of the best social media agencies in Mumbai.", name: "Tilika Vispute", role: "Co-founder, fashion label" },
];


const inputClassName = "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60";

export function Hero() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
 const [testimonialIndex, setTestimonialIndex] = useState(0);
const testimonial = testimonials[testimonialIndex]!;

useEffect(() => {
  const interval = setInterval(() => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);
  const changeTestimonial = (direction: number) => {
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const profile = String(formData.get("profile") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const requirements = String(formData.get("requirements") || "").trim();
    const validationError = validateForm({ name, email, phone, profile, service, requirements });

    if (validationError) {
      setFormError(validationError);
      setFormSuccess(null);
      toast.error("Please check the form", { description: validationError });
      return;
    }

    const { website, instagram } = parseProfile(profile);
    setLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const response = await fetch("/api/ads-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, website, instagram, challenge: service, goals: requirements, source: "social-media-hero" }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your audit request. Please try again.");

      form.reset();
      setFormSuccess("Thanks your audit request is in. A strategist will be in touch within one business day.");
      toast.success("Audit request received", { description: "A strategist will review your profiles and reply within one business day." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your audit request. Please try again.";
      setFormError(message);
      toast.error("Could not send your request", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px]" />
      <div className="container relative mx-auto grid gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 lg:px-8">
        <div className="lg:mt-10 mt-0 ">
          
          
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 subtitle font-medium text-black"><Instagram className="h-3.5 w-3.5 text-foreground" />Social media marketing agency in Mumbai</span>
             <span
  className="mt-6 block text-[1.9rem] font-extrabold sm:text-[2.8rem] lg:text-[3.2rem]"
  style={{
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontWeight: 800,
    lineHeight: 1.1,
  }}
>
   We build social media presence brands are actually <span className="highlight-accent">remembered</span> for.
</span>
          {/* <p className="mt-6 max-w-xl subtitle text-muted-foreground">Bombay Blokes is a social media marketing agency for brands that want strategy, content and creative direction under one roof a feed that looks premium, posts consistently, and turns followers into customers.</p> */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {["Strategy, content & community", "In-house creative studio", "Reporting you can read"].map((item) => <li key={item} className="flex items-center gap-2 subtitle black-text"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{item}</li>)}
          </ul>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-4">
            {[["1000+", "Projects delivered"], ["150+", "Brands partnered"], ["40M+", "Organic views"], ["4.9", "Average rating"]].map(([value, label]) => <div key={label}><div className="font-display text-2xl font-semibold sm:text-3xl">{value}</div><div className="mt-1 subtitle black-text">{label}</div></div>)}
          </div>
          {/* <img
  src={heroShoot.src}
  alt="Social media content shoot"
  className="mt-8 hidden h-64 w-full rounded-2xl object-cover lg:block"
/> */}
        </div>
       



        <div id="audit" className="lg:sticky lg:top-24">
         <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h6>Get a free social audit</h6><p className="mt-1.5 subtitle text-muted-foreground">We&apos;ll review your profiles, content and competitors and send back what we&apos;d change first.</p></div><span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-secondary-foreground">Free</span></div>
            <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate aria-busy={loading}>
              <Field label="Your name"><input required name="name" placeholder="Aarav Mehta" className={inputClassName} autoComplete="name" disabled={loading} /></Field>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Work email"><input required type="email" name="email" placeholder="you@brand.com" className={inputClassName} autoComplete="email" disabled={loading} /></Field><Field label="Phone"><input required name="phone" type="tel" inputMode="tel" placeholder="+91 98200 00000" className={inputClassName} autoComplete="tel" disabled={loading} /></Field></div>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Instagram handle or website"><input required name="profile" placeholder="@yourbrand or yourbrand.com" className={inputClassName} disabled={loading} /></Field>
              <Field label="What do you need help with?">
  <div className="relative">
    <select
      name="service"
      className={`${inputClassName} appearance-none pr-10`}
      defaultValue={services[0]}
      disabled={loading}
    >
      {services.map((service) => (
        <option key={service}>{service}</option>
      ))}
    </select>

    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    />
  </div>
</Field>
               </div>
              <Field label="Message or requirements"><textarea required name="requirements" rows={3} placeholder="Tell us what you need help with." className="min-h-28 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} /></Field>
              <button type="submit" disabled={loading} className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70">{loading ? "Sending…" : "Request my free audit"}{!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}</button>
              <p className="text-center text-xs text-muted-foreground">No decks, no spam. A real strategist replies within 24 hours.</p>
              {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-700">{formError}</p>}
              {formSuccess && <p role="status" className="rounded-lg bg-accent/10 px-3 py-2 text-center text-xs text-foreground">{formSuccess}</p>}
            </form>
          </div>

          {/* <div className="mt-4 rounded-3xl border bg-card p-3 shadow-soft">
            <div className="flex items-center gap-4"><img src={heroShoot.src} alt="Bombay Blokes social media content shoot for a beauty brand" width={1200} height={1504} className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24" /><div className="min-w-0"><div className="flex items-center gap-1 text-accent">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}</div><p className="mt-1.5 subtitle leading-snug text-foreground/80">“{testimonial.quote}”</p><p className="mt-1 text-xs text-muted-foreground">{testimonial.name} {testimonial.role}</p></div></div>
            {testimonials.length > 1 && <div className="mt-3 flex items-center justify-end gap-2 border-t pt-3"><button type="button" onClick={() => changeTestimonial(-1)} aria-label="Previous testimonial" className="grid h-8 w-8 place-items-center rounded-full border transition-colors hover:bg-secondary"><ArrowLeft className="h-3.5 w-3.5" /></button><div className="flex gap-1" aria-label={`Testimonial ${testimonialIndex + 1} of ${testimonials.length}`}>{testimonials.map((item, index) => <button key={item.name} type="button" onClick={() => setTestimonialIndex(index)} aria-label={`Show testimonial ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === testimonialIndex ? "w-4 bg-accent" : "w-1.5 bg-border"}`} />)}</div><button type="button" onClick={() => changeTestimonial(1)} aria-label="Next testimonial" className="grid h-8 w-8 place-items-center rounded-full border transition-colors hover:bg-secondary"><ArrowRight className="h-3.5 w-3.5" /></button></div>}
          </div> */}
        </div>
      </div>
    </section>
  );
}

type SocialAuditForm = { name: string; email: string; phone: string; profile: string; service: string; requirements: string };

function validateForm(values: SocialAuditForm): string | null {
  if (!values.name) return "Please enter your name.";
  if (!values.email) return "Please enter your work email.";
  if (!/^[\w-.+]+@[\w-]+\.[a-z]{2,}$/i.test(values.email)) return "Please enter a valid email address.";
  if (!values.phone) return "Please enter your phone number.";
  if (!/^[+()\d\s-]{7,20}$/.test(values.phone)) return "Please enter a valid phone number.";
  if (!values.profile) return "Please enter your Instagram handle or website.";
  if (!values.service) return "Please select the service you need help with.";
  if (!values.requirements) return "Please tell us about your requirements.";
  return null;
}

function parseProfile(profile: string) {
  const normalized = profile.trim();
  if (/instagram\.com|^@[\w.]+$/i.test(normalized)) return { website: "", instagram: normalized };
  return { website: /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`, instagram: "" };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold tracking-[0.01em] text-foreground/80">{label}</span>{children}</label>;
}
