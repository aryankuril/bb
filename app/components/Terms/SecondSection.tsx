"use client";

import React from "react";

interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

const TermsData: PolicySection[] = [
  {
    title: "1. Introduction and Acceptance",
    paragraphs: [
      `These Terms and Conditions ("Terms") constitute a legally binding agreement between Bombay Blokes Digital Solutions LLP ("Bombay Blokes", "we", "us", or "our") and any individual, business, or entity ("Client", "you", or "your").`,
      `By engaging our services, signing a proposal, making a payment, or accepting deliverables, you confirm that you agree to be bound by these Terms.`,
      `These Terms apply to all services including Digital Marketing, Web Design & Development, SEO & Content, and Social Media Management, delivered in India or internationally.`,
    ],
  },

  {
    title: "2. About Bombay Blokes Digital Solutions LLP",
    list: [
      "Legal Name: Bombay Blokes Digital Solutions LLP",
      "Entity Type: Limited Liability Partnership registered under Indian law",
      "Services: Digital Marketing | Web Design & Development | SEO & Content | Social Media Management",
      "Jurisdiction: India (services offered internationally)",
      "Registered Address: Mumbai, Maharashtra, India",
    ],
  },

  {
    title: "3. Services",
    paragraphs: [
      "Services, deliverables, timelines, and fees shall be defined in a separate Proposal, Statement of Work (SOW), or Service Agreement ('Project Agreement').",
      "Any scope changes must be requested and approved in writing and may result in revised timelines or additional fees.",
      "Use of third-party platforms (Google, Meta, LinkedIn etc.) is subject to their policies and availability, which are outside our control.",
    ],
  },

  {
    title: "4. Client Obligations",
    list: [
      "Provide necessary materials, information, and approvals in a timely manner;",
      "Designate an authorised point of contact;",
      "Review deliverables within agreed timelines;",
      "Ensure provided materials do not infringe third-party rights;",
      "Maintain confidentiality of login credentials;",
      "Pay invoices within agreed payment terms.",
    ],
  },

  {
    title: "5. Fees, Invoicing, and Payment",
    paragraphs: [
      "Fees are defined in the applicable Project Agreement.",
      "Invoices are payable within 7 days unless otherwise agreed.",
      "Late payments may result in suspension of services and interest charges.",
      "Fees are exclusive of applicable taxes including GST.",
      "Fees for completed work are non-refundable unless stated otherwise.",
    ],
  },

  {
    title: "6. Intellectual Property",
    paragraphs: [
      "Client-owned materials remain the property of the Client.",
      "Upon full payment, final deliverables created specifically for the Client are assigned to the Client.",
      "Bombay Blokes retains ownership of its proprietary tools, frameworks, templates, and methodologies.",
      "We reserve the right to reference completed work in our portfolio unless otherwise agreed in writing.",
    ],
  },

  {
    title: "7. Confidentiality",
    paragraphs: [
      "Both parties agree to keep confidential all proprietary and sensitive information shared during the engagement.",
      "Confidentiality obligations survive termination for three (3) years.",
    ],
  },

  {
    title: "8. Term and Termination",
    paragraphs: [
      "Either party may terminate with written notice as defined in the Project Agreement.",
      "Upon termination, the Client must pay for services rendered up to the termination date.",
      "Bombay Blokes may terminate immediately for material breach, non-payment, unlawful conduct, or legal non-compliance.",
    ],
  },

  {
    title: "9. Limitation of Liability",
    paragraphs: [
      "We do not guarantee specific rankings, leads, revenues, or performance results.",
      "Total liability shall not exceed fees paid in the three (3) months preceding the claim.",
      "We are not liable for indirect, incidental, or consequential damages.",
      "The Client agrees to indemnify Bombay Blokes against third-party claims arising from Client-provided materials or misuse of deliverables.",
    ],
  },

  {
    title: "10. Representations and Warranties",
    paragraphs: [
      "Each party confirms it has authority to enter into these Terms.",
      "The Client warrants that all materials provided are lawful and do not infringe third-party rights.",
    ],
  },

  {
    title: "11. Force Majeure",
    paragraphs: [
      "Neither party shall be liable for delays caused by events beyond reasonable control, including natural disasters, pandemics, government actions, cyberattacks, or platform outages.",
    ],
  },

  {
    title: "12. Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms are governed by the laws of India.",
      "Courts of Mumbai, Maharashtra shall have exclusive jurisdiction.",
      "Disputes shall first be resolved through negotiation, failing which arbitration shall be conducted in Mumbai under the Arbitration and Conciliation Act, 1996.",
    ],
  },

  {
    title: "13. General Provisions",
    list: [
      "These Terms constitute the entire agreement between the parties;",
      "We may amend these Terms with notice;",
      "Invalid provisions shall not affect remaining clauses;",
      "No waiver of rights unless expressly stated;",
      "The Client may not assign rights without written consent;",
      "Bombay Blokes operates as an independent contractor;",
      "All notices must be delivered in writing.",
    ],
  },

  {
    title: "14. Contact Us",
    paragraphs: [
      "For any questions regarding these Terms & Conditions, please contact:",
      "Bombay Blokes Digital Solutions LLP",
      "Email: hello@bombayblokes.com",
      "Phone: +91 98200 98200",
      "Registered Address: 21 B, Madhu Estate, 1st Floor, Pandurang Budhkar Marg, Lower Parel, Mumbai, Maharashtra 400013",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <section className="w-full container py-10 sm:py-15 lg:py-20">
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