"use client";

import React from "react";

interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

const TermsData: PolicySection[] = [

  {
    title: "01 Scope of Work",
    paragraphs: [
      "Your proposal or scope of work document is the single source of truth for what we are delivering, by when, and for how much. If it is not written there, it is not in scope.",
      "That is not us being rigid. It protects both sides. When something new comes up mid-engagement, we will scope it, price it, and get your approval before it becomes billable. Nothing lands on your invoice as a surprise.",
      "Unless your proposal states otherwise, every deliverable includes up to two rounds of revisions. A revision refines the agreed direction. A completely new direction is treated as a new brief and quoted separately.",
    ],
  },

  {
    title: "02 Payment Terms",
    list: [
      "Projects: 50% advance to begin, balance before final handover unless milestones are defined in the proposal.",
      "Retainers: Invoiced at the start of each month and payable within 7 days.",
      "Invoices overdue by 15 days may pause work. Beyond 30 days, the engagement may be suspended until dues are cleared.",
      "All fees are exclusive of GST and applicable taxes.",
      "Third-party costs such as ad spend, hosting, stock assets, plugins, software licenses and printing are billed separately at actual cost.",
      "Advance payments are non-refundable once work has commenced.",
    ],
  },

  {
    title: "03 Ownership & Rights",
    paragraphs: [
      "Once invoices for a deliverable are paid in full, the final approved work belongs entirely to you.",
    ],
    list: [
      "Working files such as layered design files, raw footage or source code are not included unless specifically agreed.",
      "Bombay Blokes retains ownership of its internal frameworks, reusable code libraries and proprietary processes.",
      "Third-party assets remain subject to their respective licenses.",
      "We may showcase completed work in our portfolio unless restricted by an NDA or written agreement.",
    ],
  },

  {
    title: "04 Working Together",
    paragraphs: [
      "Great work requires collaboration from both sides.",
    ],
    list: [
      "Provide one authorised point of contact.",
      "Share feedback within 3 working days.",
      "Provide brand assets, approvals and required access on time.",
      "Approvals must be provided in writing (Email or WhatsApp).",
      "You are responsible for the legality and accuracy of all materials supplied to us.",
    ],
  },

  {
    title: "05 Confidentiality",
    paragraphs: [
      "Both parties agree to keep all non-public information confidential during and after the engagement. This includes pricing, strategies, customer information, performance data and unreleased work. Public information or disclosures required by law are excluded.",
    ],
  },

  {
    title: "06 Termination",
    paragraphs: [
      "Either party may terminate the engagement by providing 30 days written notice.",
    ],
    list: [
      "The Client must pay for all completed and in-progress work up to the termination date.",
      "Retainer engagements remain billable during the notice period.",
      "Final files and handover documents are released after all outstanding payments are cleared.",
      "Bombay Blokes may immediately terminate an engagement for unpaid invoices beyond 30 days or unlawful use of our work.",
    ],
  },

  {
    title: "07 Liability & Legal Framework",
    paragraphs: [
      "We commit to delivering quality work, strategy and execution. However, we do not guarantee rankings, reach, leads, revenue or advertising performance because external platforms and market conditions remain outside our control.",
      "Our total liability under any engagement is limited to the fees paid during the previous three months (or the project fee for one-time engagements).",
      "Neither party is liable for delays caused by circumstances beyond reasonable control.",
      "These Terms, together with your signed proposal, form the complete agreement. Where both documents differ, the signed proposal takes precedence.",
      "These Terms are governed by the laws of India under the jurisdiction of the courts of Mumbai.",
      "We may update these Terms from time to time. The version accepted during onboarding will continue to govern your engagement.",
    ],
  },

  {
    title: "Questions?",
    paragraphs: [
      "If you have any questions about these Terms of Engagement, please contact us before signing.",
      "Email: hello@bombayblokes.com",
      "We would rather explain a clause than have you agree to something you skimmed.",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <section className="w-full container py-10 sm:py-15 lg:py-20">

      {/* Page Header */}
   <div className="mb-12 lg:mt-20 mt-0 text-center">
  <h1 className="text-4xl md:text-5xl font-bold black-text dark:text-white">
    Terms of Engagement
  </h1>

  <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400">
    <strong>Bombay Blokes Digital Solutions LLP</strong> · Last Updated:
    August 2026 · Version 1.0
  </p>

  <p className="mt-5 body2 black-text dark:text-gray-300 leading-relaxed max-w-6xl ">
    These Terms of Engagement apply to every project with Bombay Blokes and
    complement your signed proposal or scope of work. By checking the consent
    box during onboarding, you confirm that you have read, understood, and
    agree to these terms. We believe in clear communication, straightforward
    obligations, and complete transparency without unnecessary legal jargon.
  </p>
</div>
      <div className="max-w-5xl space-y-8">
        {TermsData.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold black-text dark:text-white">
              {section.title}
            </h3>
               <ul className=" space-y-1">
            {section.paragraphs?.map((para, i) => (
              <p
                key={i}
                className="body2 black-text dark:text-gray-300 leading-relaxed"
              >
                {para}
              </p>
            ))}
            </ul>

            {section.list && (
              <ul className="list-disc pl-6 space-y-1">
                {section.list.map((item, i) => (
                  <li
                    key={i}
                    className="body2 black-text dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsAndConditions;