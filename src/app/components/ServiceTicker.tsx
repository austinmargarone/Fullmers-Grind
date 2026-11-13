import Link from "next/link";
import { services } from "@/lib/services";

/**
 * Scrolling services bar under the homepage hero.
 * The list is rendered twice and shifted by exactly one copy's width, so the
 * loop is seamless at any screen size. Pauses on hover and respects
 * the user's reduced-motion setting.
 */
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex flex-none items-center" aria-hidden={hidden || undefined}>
      {/* repeat within each copy so one copy is always wider than the screen */}
      {[0, 1].flatMap((rep) =>
        services.map((s) => (
          <li key={`${rep}-${s.slug}`} className="flex flex-none items-center">
            <Link
              href={`/services/${s.slug}`}
              tabIndex={hidden || rep > 0 ? -1 : undefined}
              className="whitespace-nowrap px-8 text-lg font-semibold text-white transition-colors hover:text-brand"
            >
              {s.name}
            </Link>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
          </li>
        ))
      )}
    </ul>
  );
}

const ServiceTicker: React.FC = () => {
  return (
    <nav
      aria-label="Services"
      className="group overflow-hidden border-t border-white/10 bg-white/[0.08] py-4 backdrop-blur-md"
    >
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track hidden />
      </div>
    </nav>
  );
};

export default ServiceTicker;
