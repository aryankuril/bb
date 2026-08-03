import type { Testimonial } from "../types";
import Card from "../common/Card";

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className="h-full p-6 sm:p-8 flex flex-col" hover>
      <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-[var(--color-highlight)]" aria-hidden>
            ★
          </span>
        ))}
      </div>

      <blockquote className="body2 flex-1 mb-6 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="border-t border-black/5 pt-4">
        <p className="body3 black-text">{testimonial.author}</p>
        <p className="subtitle grey-text">
          {testimonial.role}, {testimonial.company}
        </p>
      </figcaption>
    </Card>
  );
}
