import { footerCTA } from "../data";
import Button from "../common/Button";

export default function FooterCTA() {
  return (
    <footer
      className="container py-10 sm:py-12 border-t border-black/5"
      aria-label="Footer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <p className="body3 black-text mb-1">{footerCTA.brand}</p>
          <p className="subtitle grey-text">{footerCTA.tagline}</p>
        </div>
        <Button text={footerCTA.cta} href={footerCTA.ctaHref} ariaLabel={footerCTA.cta} />
      </div>

      <nav aria-label="Footer navigation">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {footerCTA.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="body4 grey-text hover:text-[var(--color-highlight)] transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="body4 grey-text">{footerCTA.copyright}</p>
    </footer>
  );
}
