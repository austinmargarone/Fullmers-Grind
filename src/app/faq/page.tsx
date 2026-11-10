import type { Metadata } from "next";
import { faqs } from "@/lib/faqs";
import JsonLd from "../components/JsonLd";
import CtaBand from "../components/sections/CtaBand";
import PageHero from "../components/sections/PageHero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about stump grinding cost, depth and cleanup, our service area in Buffalo, Wyoming and Genesee County, NY, and how to schedule with Fullmers Grind LLC.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Quick answers about stump grinding, pricing, our service area and cleanup."
        image="/Grinder.jpg"
      />
      <section className="section max-w-3xl">
        <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]">
          {faqs.map((f, i) => (
            <details key={f.q} className="group px-6 py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h2>{f.q}</h2>
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/30 text-brand transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-white/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="pb-4">
        <CtaBand title="Still have a question?" text="Send us a message or request a free estimate and we'll get back to you." />
      </div>
    </main>
  );
}
