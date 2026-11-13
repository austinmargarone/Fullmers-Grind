import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/site";
import { services } from "@/lib/services";
import CtaBand from "../components/sections/CtaBand";
import PageHero from "../components/sections/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fullmers Grind LLC is a family-owned and operated stump grinding and property services business serving Buffalo, Wyoming County and Genesee County, NY.",
  alternates: { canonical: "/about" },
};

// TODO(client): Swap in Jeremy's own story (how the business started, how
// long he's been at it, anything that makes it personal) and an owner photo
// at /public/owner.jpg, then set OWNER_PHOTO below.
const OWNER_PHOTO: string | null = null;

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="A family business that shows up and does the job right"
        image="/X1.jpg"
      />

      <section className="section grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="h-section">Family-owned &amp; operated</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            At {business.name}, we are proud to be a family-owned and operated
            business. We understand how important your property is to you, and
            we treat every job, big or small, with the same care we&apos;d give
            our own.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            We offer a full lineup of property services:{" "}
            {services.map((s) => s.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.
            We run our own equipment, so one crew can take a job from start to
            cleanup.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            When you call, you talk to the people who&apos;ll be doing the work.
            Thank you for choosing {business.name}. We look forward to serving you!
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
          <Image
            src={OWNER_PHOTO ?? "/AllEquipment.jpg"}
            alt={OWNER_PHOTO ? "The owner of Fullmers Grind LLC" : "Fullmers Grind LLC equipment"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 className="h-section">Proudly serving Western New York</h2>
            <p className="mt-4 text-lg text-white/85">
              We work throughout the Buffalo area and across Wyoming and
              Genesee counties. Just outside the area? Reach out anyway and
              we&apos;ll let you know if we can make it work.
            </p>
            <ul className="mt-6 space-y-2">
              {business.serviceAreas.map((a) => (
                <li key={a} className="flex items-center gap-2 text-lg font-semibold">
                  <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="h-section">Straightforward from the first call</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Tell us about the job", "Use the free estimate form, send a message or give us a call."],
                ["Get a straight quote", "We'll talk through the work and give you a no-obligation estimate."],
                ["We get it done", "We show up with the right equipment and clean up when we're finished."],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand font-extrabold text-black">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-white/75">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/faq" className="mt-6 inline-block font-semibold text-brand hover:underline">
              Have questions? Read our FAQ →
            </Link>
          </div>
        </div>
      </section>

      <div className="py-16">
        <CtaBand />
      </div>
    </main>
  );
}
