import { reviewsUrl, testimonials } from "@/lib/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-brand" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i < n ? "fill-current" : "fill-white/20"}`} aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Renders nothing until real reviews are added to src/lib/testimonials.ts. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <p className="eyebrow">Reviews</p>
      <h2 id="testimonials-heading" className="h-section">
        What our customers say
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={i} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6">
            {t.rating && <Stars n={t.rating} />}
            <blockquote className="mt-4 flex-1 text-white/90">“{t.quote}”</blockquote>
            <p className="mt-5 font-semibold">
              {t.name}
              {t.location && <span className="font-normal text-white/60"> · {t.location}</span>}
            </p>
            {t.source && <p className="text-sm text-white/50">via {t.source}</p>}
          </li>
        ))}
      </ul>
      {reviewsUrl && (
        <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-8">
          Read more reviews
        </a>
      )}
    </section>
  );
}
