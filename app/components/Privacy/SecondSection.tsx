"use client";

import React from "react";

interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

const PrivacyPolicyData: PolicySection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      `Welcome to Bombay Blokes Digital Solutions LLP ("Bombay Blokes", "we", "us", or "our"). We are a digital solutions agency offering services including Digital Marketing, Web Design & Development, SEO & Content, and Social Media Management to clients across India and internationally.`,
      `We are committed to protecting your privacy and handling your personal information with transparency and care. This Privacy Policy explains how we collect, use, store, disclose, and protect information about you when you:`,
    ],
    list: [
      "Visit our website or digital platforms;",
      "Engage us for any of our services;",
      "Contact us through any communication channel; or",
      "Otherwise interact with us in a professional or commercial capacity.",
      "By using our services, you acknowledge that you have read and understood this Privacy Policy.",
    ],
  },

  {
    title: "2. Who We Are",
    list: [
      "Legal Name: Bombay Blokes Digital Solutions LLP",
      "Nature of Entity: Limited Liability Partnership registered in India",
      "Services: Digital Marketing | Web Design & Development | SEO & Content | Social Media Management",
      "Operating Jurisdictions: India and International",
      "Contact: hello@bombayblokes.com",
    ],
  },

  {
    title: "3. Information We Collect",
    paragraphs: [
      "We collect and process the following categories of personal information:",
    ],
    list: [
      "Full name and contact details (email address, phone number);",
      "Business name, designation, and professional details;",
      "Project briefs, requirements, and creative inputs;",
      "IP address, browser type, device information;",
      "Pages visited, time spent, referral URLs;",
      "Cookie data and tracking technologies;",
      "Information received from third-party platforms such as LinkedIn, Google, Meta.",
    ],
  },

  {
    title: "4. How We Use Your Information",
    list: [
      "To provide and manage our services;",
      "To communicate regarding projects and support;",
      "To draft proposals, agreements, and invoices;",
      "To improve our internal processes and website performance;",
      "To send marketing communications (with consent);",
      "To comply with legal obligations including the Digital Personal Data Protection Act, 2023 (DPDPA).",
    ],
  },

  {
    title: "5. Legal Basis for Processing",
    list: [
      "Consent;",
      "Contractual Necessity;",
      "Legitimate Business Interests;",
      "Legal Obligations under applicable laws;",
      "Compliance with GDPR / UK GDPR where applicable.",
    ],
  },

  {
    title: "6. Sharing and Disclosure of Information",
    paragraphs: [
      "We do not sell, rent, or trade your personal information.",
      "We may share your data only in the following circumstances:",
    ],
    list: [
      "With trusted service providers (cloud hosting, analytics, communication tools);",
      "When required by law or regulatory authorities;",
      "In the event of business transfers such as mergers or acquisitions;",
      "With your explicit consent.",
    ],
  },

  {
    title: "7. Cookies and Tracking Technologies",
    paragraphs: [
      "Our website uses cookies and similar technologies to enhance your browsing experience.",
    ],
    list: [
      "Essential Cookies;",
      "Analytics Cookies;",
      "Preference Cookies;",
      "Marketing Cookies;",
      "You may control cookie settings through your browser at any time.",
    ],
  },

  {
    title: "8. Data Retention",
    paragraphs: [
      "We retain personal data only as long as necessary for business and legal purposes.",
    ],
    list: [
      "Duration of professional engagement;",
      "Legal and regulatory requirements;",
      "Dispute resolution and enforcement of agreements;",
      "Secure deletion or anonymisation after retention period.",
    ],
  },

  {
    title: "9. International Data Transfers",
    paragraphs: [
      "As an agency serving international clients, your data may be transferred outside India.",
    ],
    list: [
      "Use of contractual safeguards;",
      "Compliance with DPDPA and GDPR mechanisms;",
      "Standard contractual clauses where required.",
    ],
  },

  {
    title: "10. Data Security",
    list: [
      "Encryption of data in transit and at rest;",
      "Restricted access to personal data;",
      "Secure cloud infrastructure;",
      "Regular security reviews and audits;",
      "Notification in case of data breaches as required by law.",
    ],
  },

  {
    title: "11. Your Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have the following rights:",
    ],
    list: [
      "Right to access your personal data;",
      "Right to correction;",
      "Right to erasure (subject to legal limits);",
      "Right to grievance redressal;",
      "Right to data portability (under GDPR);",
      "Right to withdraw consent;",
      "Right to lodge complaints with supervisory authorities.",
    ],
  },

  {
    title: "12. Third-Party Websites",
    paragraphs: [
      "We are not responsible for the privacy practices of third-party platforms linked from our website. Please review their privacy policies before sharing information.",
    ],
  },

  {
    title: "13. Children's Privacy",
    paragraphs: [
      "Our services are intended for adults aged 18 and above. We do not knowingly collect personal data from minors.",
    ],
  },

  {
    title: "14. Contact & Grievance Redressal",
    paragraphs: [
      "For any privacy-related queries, please contact:",
      "Bombay Blokes Digital Solutions LLP",
      "Grievance Officer / Data Protection Contact",
      "Name: Bombay Blokes",
      "Email: hello@bombayblokes.com",
      "Phone: +91 98200 98200",
      "Address: 21 B, Madhu Estate, 1st Floor, Pandurang Budhkar Marg, next to IKEA Worli City Store, Lower Parel, Mumbai, Maharashtra 400013",
      "We aim to acknowledge requests within 48 hours and resolve within 30 days.",
    ],
  },

  {
    title: "15. Updates to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in legal or operational requirements. Your continued use of our services constitutes acceptance of the updated Policy",
    ],
  },
];

const SecondSection = () => {
  return (
    <section className="w-full container py-10 sm:py-15 lg:py-20">
      <div className="max-w-5xl space-y-8">
        {PrivacyPolicyData.map((section, index) => (
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

export default SecondSection;