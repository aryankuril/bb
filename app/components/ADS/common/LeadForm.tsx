"use client";

import { useState } from "react";
import type { FormContent, FormFieldKey } from "../types";
import Button from "./Button";

type FormValues = Record<FormFieldKey, string>;

type Props = {
  content: FormContent;
  submitEndpoint?: string;
  id?: string;
  variant?: "hero" | "contact";
};

const emptyForm = (): FormValues => ({
  name: "",
  phone: "",
  email: "",
  brand: "",
});

function parseBrandField(brand: string) {
  const trimmed = brand.trim();
  if (!trimmed) return { brand: "", website: "", instagram: "" };

  const isUrl = /^https?:\/\//i.test(trimmed) || trimmed.includes(".");
  const isInstagram = /instagram\.com|@[\w.]+/i.test(trimmed);

  if (isInstagram) {
    return { brand: trimmed.replace(/^@/, ""), website: "", instagram: trimmed };
  }
  if (isUrl) {
    return { brand: trimmed, website: trimmed.startsWith("http") ? trimmed : `https://${trimmed}`, instagram: "" };
  }
  return { brand: trimmed, website: "", instagram: "" };
}

export default function LeadForm({
  content,
  submitEndpoint = "/api/ads-enquiry",
  id,
  variant = "hero",
}: Props) {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (key: FormFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return content.validation.nameRequired;
    if (!form.email.trim()) return content.validation.emailRequired;
    if (!/^[\w-.+]+@[\w-]+\.[a-z]{2,}$/i.test(form.email)) return content.validation.emailInvalid;
    if (!form.phone.trim()) return content.validation.phoneRequired;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("idle");

    const now = new Date();
    const parsed = parseBrandField(form.brand);

    try {
      const res = await fetch(submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          brand: parsed.brand,
          website: parsed.website,
          instagram: parsed.instagram,
          date: now.toLocaleDateString("en-IN", { dateStyle: "medium" }),
          time: now.toLocaleTimeString("en-IN", { timeStyle: "short" }),
          source: variant,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || content.errorGeneric);
      }

      setStatus("success");
      setForm(emptyForm());
    } catch (err) {
      setError(err instanceof Error ? err.message : content.errorGeneric);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const fieldKeys = Object.keys(content.fields) as FormFieldKey[];

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      aria-label={content.title}
      className="space-y-4"
      noValidate
    >
      {fieldKeys.map((key) => {
        const field = content.fields[key];
        return (
          <div key={key} className="space-y-1.5">
            <label htmlFor={`${variant}-${key}`} className="subtitle block">
              {field.label}
            </label>
            <input
              id={`${variant}-${key}`}
              name={key}
              type={field.type ?? "text"}
              value={form[key]}
              onChange={(e) => update(key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              autoComplete={key === "email" ? "email" : key === "phone" ? "tel" : "name"}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 subtitle outline-none transition focus:border-[var(--color-highlight)] focus:ring-2 focus:ring-[var(--color-highlight)]/20 small-placeholder"
            />
          </div>
        );
      })}

      <div className="pt-2">
        <Button
          type="submit"
          text={loading ? content.loading : content.submit}
          disabled={loading}
          loading={loading}
          ariaLabel={content.submit}
        />
      </div>

      {status === "success" && (
        <p role="status" className="subtitle text-emerald-700">
          {content.success}
        </p>
      )}
      {status === "error" && error && (
        <p role="alert" className="subtitle text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
