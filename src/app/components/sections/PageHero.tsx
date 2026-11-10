import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
};

/** Banner used at the top of inner pages. */
export default function PageHero({ eyebrow, title, subtitle, image = "/AllEquipment.jpg", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[72px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/65 to-[#1B1B1B]" />
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight drop-shadow md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
