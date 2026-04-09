import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/lib/sanity/types";

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <div
      className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:-mx-8 sm:px-8"
      role="list"
      aria-label="Testimonials"
    >
      {items.map((t) => (
        <div role="listitem" key={t._id}>
          <TestimonialCard testimonial={t} />
        </div>
      ))}
    </div>
  );
}
