import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";

export default function ServiceCards({ exclude }: { exclude?: string }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-brand/60"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.images[0].src}
                alt={s.images[0].alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-bold">{s.name}</h3>
              <p className="mt-2 flex-1 text-white/75">{s.summary}</p>
              <span className="mt-4 font-semibold text-brand">
                Learn more <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
