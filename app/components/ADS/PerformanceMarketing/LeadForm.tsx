"use client";

import { FormEvent, useState } from "react";
import { googleAdsLanding as content } from "./data";

type FormValues = { name: string; email: string; phone: string; website: string };
const initialValues: FormValues = { name: "", email: "", phone: "", website: "" };

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const fields = content.hero.fields;
  const keys: (keyof FormValues)[] = ["name", "email", "phone", "website"];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/ads-enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, source: "performance-marketing-google-ads" }) });
      const result: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || content.hero.error);
      setStatus("success");
      setMessage(content.hero.success);
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : content.hero.error);
    }
  }

  return <form id="enquiry" onSubmit={submit} className="rounded-[1.75rem] border border-white/15 bg-black/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
    <h3 className="title text-black">{content.hero.formTitle}</h3>
    <p className="subtitle mt-2 text-sm leading-6 text-black/60">{content.hero.formBody}</p>
    <div className="mt-6 grid gap-3">{fields.map((field, index) => { const key = keys[index]; const type = key === "email" ? "email" : key === "phone" ? "tel" : key === "website" ? "url" : "text"; return <label key={key}><span className="sr-only">{field}</span><input required aria-label={field} type={type} value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} placeholder={field} className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3.5 text-sm text-black outline-none placeholder:text-black/40 focus:border-[#f7bf36]" /></label>; })}</div>
    <button disabled={status === "loading"} className="mt-4 min-h-12 w-full rounded-xl bg-[#f7bf36] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ffcf5b] disabled:cursor-not-allowed disabled:opacity-60">{status === "loading" ? "Sending your request…" : content.hero.formButton}</button>
    {status !== "idle" && <p role="status" aria-live="polite" className={`mt-4 text-xs leading-5 ${status === "success" ? "text-[#f7bf36]" : "text-red-300"}`}>{message}</p>}
  </form>;
}
