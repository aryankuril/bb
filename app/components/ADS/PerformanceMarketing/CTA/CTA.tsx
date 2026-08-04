import { cta } from "../data"; import { LinkButton, Section } from "../Shared";
export default function CTASection() { return <Section copy={{ eyebrow: cta.eyebrow, title: cta.title, body: cta.body }} dark><div className="mt-8"><LinkButton cta={cta.button} /></div></Section> }
