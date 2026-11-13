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

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 flex-none" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/**
 * Shows review cards once real reviews are added to src/lib/testimonials.ts.
 * Until then, shows a link to the Google Business Profile (if reviewsUrl is set).
 */
export default function Testimonials() {
  if (testimonials.length === 0) {
    if (!reviewsUrl) return null;
    return (
      <section className="section py-10" aria-label="Customer reviews">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-brand/60 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <GoogleG />
            <div>
              <p className="text-lg font-bold">See what our customers say on Google</p>
              <p className="text-white/70">Read our reviews, or leave one if we&apos;ve worked with you.</p>
            </div>
          </div>
          <span className="font-semibold text-brand group-hover:underline">Read our reviews →</span>
        </a>
      </section>
    );
  }

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
          Read more reviews on Google
        </a>
      )}
    </section>
  );
}
