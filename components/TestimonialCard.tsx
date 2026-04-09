import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/sanity/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full min-w-[280px] max-w-sm shrink-0 snap-center flex-col gap-5 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-7">
      {testimonial.rating ? (
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
          ))}
        </div>
      ) : null}
      <blockquote className="font-serif text-lg leading-snug">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-auto text-sm text-[var(--muted)]">
        — {testimonial.name}
        {testimonial.service?.title ? `, ${testimonial.service.title}` : null}
      </figcaption>
    </figure>
  );
}
