import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/site";
import ContactForm from "../components/forms/ContactForm";
import PageHero from "../components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Fullmers Grind LLC for stump grinding, tree removal, snow removal, demo and junk removal in Buffalo, Wyoming County and Genesee County, NY. Call (585) 409-0818.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions, scheduling or anything else, send us a message and we'll get back to you."
        image="/X.jpg"
      />
      <section className="section grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="mb-2 text-xl font-bold">Call</h2>
            <a href={business.phoneHref} className="text-2xl font-extrabold text-brand hover:underline">
              {business.phone}
            </a>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">Email</h2>
            <a href={`mailto:${business.email}`} className="text-lg text-white/90 hover:text-brand">
              {business.email}
            </a>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">Service area</h2>
            <p className="text-white/85">{business.serviceAreaLabel}</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-bold">Follow us</h2>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-brand">
              Facebook →
            </a>
          </div>
          <div className="rounded-xl border border-brand/50 bg-brand/10 p-5">
            <h2 className="font-bold">Looking for a price?</h2>
            <p className="mt-1 text-white/80">The estimate form asks for the details we need to quote your job.</p>
            <Link href="/estimate" className="btn-primary mt-4">Get a Free Estimate</Link>
          </div>
        </aside>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
