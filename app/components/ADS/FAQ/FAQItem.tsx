"use client";

import { useState } from "react";
import type { FAQItemData } from "../types";

type Props = {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FAQItem({ item, isOpen, onToggle }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm overflow-hidden transition-colors hover:border-[var(--color-highlight)]/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
      >
        <span className="body3 black-text">{item.question}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-highlight)]/15 text-[var(--color-highlight)] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="body2 grey-text px-5 sm:px-6 pb-5 sm:pb-6">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
