import type { Metadata } from "next";
import Link from "next/link";
import Cover from "./components/Cover";
import Slideshow from "./components/Slideshow";
import CtaBand from "./components/sections/CtaBand";
import ServiceCards from "./components/sections/ServiceCards";
import Testimonials from "./components/sections/Testimonials";

export const metadata: Metadata = {
  title: { absolute: "Fullmers Grind LLC | Stump Grinding & Tree Removal in Western NY" },
  description:
    "Family-owned stump grinding, small tree removal, snow removal, small demo and junk removal serving Buffalo, Wyoming County and Genesee County, NY. Free estimates.",
  alternates: { canonical: "/" },
};

const reasons = [
  {
    title: "Family-owned & operated",
    text: "You deal directly with the people doing the work, not a call center.",
  },
  {
    title: "Our own equipment",
    text: "Stump grinder, mini excavator, plow and more, so we can take on the whole job.",
  },
  {
    title: "Free estimates",
    text: "Tell us about the job and we'll give you a straight, no-obligation quote.",
  },
  {
    title: "Local to Western NY",
    text: "Serving Buffalo, Wyoming County and Genesee County.",
  },
];

export default function Home() {
  return (
    <main>
      <Cover />

      <section className="section" aria-labelledby="services-heading">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 id="services-heading" className="h-section">Our Services</h2>
          </div>
          <Link href="/services" className="font-semibold text-brand hover:underline">
            View all services →
          </Link>
        </div>
        <ServiceCards />
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section">
          <p className="eyebrow">Why Fullmers Grind</p>
          <h2 className="h-section max-w-2xl">We treat your property like it&apos;s our own</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <li key={r.title} className="border-l-4 border-brand pl-4">
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-1 text-white/75">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />

      <section className="section" aria-labelledby="work-heading">
        <p className="eyebrow">Our work</p>
        <h2 id="work-heading" className="h-section mb-8">Recent Jobs &amp; Equipment</h2>
        <div className="mx-auto max-w-2xl">
          <Slideshow />
        </div>
      </section>

      <div className="pb-4">
        <CtaBand />
      </div>
    </main>
  );
}
