import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, SITE_URL } from "@/lib/site";
import { getService, services } from "@/lib/services";
import JsonLd from "../../components/JsonLd";
import CtaBand from "../../components/sections/CtaBand";
import PageHero from "../../components/sections/PageHero";
import ServiceCards from "../../components/sections/ServiceCards";
import ServiceGallery, { FeaturePhoto } from "../../components/sections/ServiceGallery";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${business.name}`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      images: [{ url: service.images[0].src, alt: service.images[0].alt }],
    },
  };
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 flex-none fill-brand" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const [hero, ...gallery] = service.images;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: business.serviceAreas.map((name) => ({ "@type": "Place", name })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
          ],
        }}
      />

      <PageHero eyebrow="Services" title={service.name} subtitle={service.summary} image={hero.src}>
        <Link href={`/estimate?service=${encodeURIComponent(service.name)}`} className="btn-primary px-6 py-3 text-lg">
          Get a Free Estimate
        </Link>
        <a href={business.phoneHref} className="btn-secondary bg-black/30 px-6 py-3 text-lg">
          Call {business.phone}
        </a>
      </PageHero>

      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-white/60">
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:text-brand">Home</Link> /</li>
          <li><Link href="/services" className="hover:text-brand">Services</Link> /</li>
          <li aria-current="page" className="text-white/90">{service.name}</li>
        </ol>
      </nav>

      <section className="section grid gap-12 pt-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="h-section">{service.name} in Western New York</h2>
          {service.intro.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-white/85">{p}</p>
          ))}

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold">What&apos;s included</h3>
              <ul className="space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-white/85"><Check />{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Great for</h3>
              <ul className="space-y-2">
                {service.goodFor.map((item) => (
                  <li key={item} className="flex gap-2 text-white/85"><Check />{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-white/70">
            Serving the Buffalo area, Wyoming County and Genesee County, NY.
          </p>
        </div>

        <FeaturePhoto images={service.images} />
      </section>

      {gallery.length > 0 && (
        <section className="section pt-0" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="mb-6 text-2xl font-bold">Photos</h2>
          <ServiceGallery images={service.images} />
        </section>
      )}

      <CtaBand
        title={`Need ${service.name.toLowerCase()}?`}
        text="Send us a few details and we'll get back to you with a free estimate."
        service={service.name}
      />

      <section className="section" aria-labelledby="other-services">
        <h2 id="other-services" className="mb-8 text-2xl font-bold">Other services</h2>
        <ServiceCards exclude={service.slug} />
      </section>
    </main>
  );
}
