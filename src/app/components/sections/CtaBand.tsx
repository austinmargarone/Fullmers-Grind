import Link from "next/link";
import { business } from "@/lib/site";

type Props = {
  title?: string;
  text?: string;
  service?: string; // pre-selects the service on the estimate form
};

export default function CtaBand({
  title = "Ready to get started?",
  text = "Tell us about your project and we'll get back to you with a free, no-obligation estimate.",
  service,
}: Props) {
  const href = service ? `/estimate?service=${encodeURIComponent(service)}` : "/estimate";
  return (
    <section className="px-5">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-brand px-8 py-10 text-black md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl font-medium text-black/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex items-center rounded-md bg-black px-5 py-3 font-bold text-white transition hover:bg-black/80"
          >
            Get a Free Estimate
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center rounded-md border-2 border-black px-5 py-3 font-bold transition hover:bg-black/10"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
