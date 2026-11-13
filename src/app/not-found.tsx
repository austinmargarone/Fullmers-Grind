import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden pt-[72px]">
      <Image src="/Vertical1.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B1B1B]/60 to-[#1B1B1B]" />

      <section className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
        <p className="text-7xl font-black text-brand md:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
          Looks like this page got ground down.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try one
          of the links below, or give us a call.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary px-6 py-3 text-lg">Back to Home</Link>
          <Link href="/estimate" className="btn-secondary px-6 py-3 text-lg">Get a Free Estimate</Link>
        </div>

        <div className="mt-14">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/60">Our services</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-block rounded-full border border-white/20 px-4 py-2 font-semibold transition hover:border-brand hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-white/70">
          Need help now? Call{" "}
          <a href={business.phoneHref} className="font-bold text-brand hover:underline">
            {business.phone}
          </a>
        </p>
      </section>
    </main>
  );
}
