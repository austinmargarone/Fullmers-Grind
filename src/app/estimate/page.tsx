import type { Metadata } from "next";
import { business } from "@/lib/site";
import EstimateForm from "../components/forms/EstimateForm";
import PageHero from "../components/sections/PageHero";

export const metadata: Metadata = {
  title: "Get a Free Estimate",
  description:
    "Request a free, no-obligation estimate for stump grinding, small tree removal, snow removal, small demo or junk removal from Fullmers Grind LLC in Western NY.",
  alternates: { canonical: "/estimate" },
};

export default async function EstimatePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const defaultService = typeof service === "string" ? service : undefined;

  return (
    <main>
      <PageHero
        eyebrow="Free estimate"
        title="Get a free estimate"
        subtitle="Tell us about the job and we'll get back to you with a no-obligation quote."
        image="/Grinder.jpg"
      />
      <section className="section grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <EstimateForm defaultService={defaultService} />
        </div>
        <aside className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">What happens next</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-white/80">
              <li>We review your request.</li>
              <li>We reach out the way you prefer to ask any questions.</li>
              <li>You get a straight, no-obligation quote.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-bold">Tip</h2>
            <p className="mt-2 text-white/80">
              For stump grinding, let us know roughly how many stumps, how wide
              they are, and whether we&apos;ll need to fit through a gate.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Rather talk?</h2>
            <a href={business.phoneHref} className="mt-2 inline-block text-2xl font-extrabold text-brand hover:underline">
              {business.phone}
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
