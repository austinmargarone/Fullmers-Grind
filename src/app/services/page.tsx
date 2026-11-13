import type { Metadata } from "next";
import CtaBand from "../components/sections/CtaBand";
import PageHero from "../components/sections/PageHero";
import ServiceCards from "../components/sections/ServiceCards";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Stump grinding, small tree removal, snow removal, small demolition and junk removal from Fullmers Grind LLC, serving Buffalo, Wyoming County and Genesee County, NY.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Property services, start to finish"
        subtitle="From grinding a single stump to clearing out a whole lot, one family-owned crew handles the job with our own equipment."
        image="/Equipment.jpg"
      />
      <section className="section">
        <ServiceCards />
      </section>
      <div className="pb-4">
        <CtaBand />
      </div>
    </main>
  );
}
