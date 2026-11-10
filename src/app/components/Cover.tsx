import Link from "next/link";
import { business } from "@/lib/site";
import ServiceTicker from "./ServiceTicker";

const Cover: React.FC = () => {
  return (
    <div className="relative flex min-h-[100svh] items-center bg-[url('/MobileBackground.jpg')] bg-cover bg-center lg:bg-[url('/AllEquipment.jpg')]">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-[120px]">
        <p className="eyebrow">Family-owned · Western New York</p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] drop-shadow-lg sm:text-5xl lg:text-6xl">
          Stump Grinding &amp; Property Services You Can Count On
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/90 drop-shadow">
          Stump grinding, small tree removal, snow removal, small demo and junk
          removal across Buffalo, Wyoming County and Genesee County.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/estimate" className="btn-primary px-6 py-3 text-lg">
            Get a Free Estimate
          </Link>
          <a href={business.phoneHref} className="btn-secondary bg-black/30 px-6 py-3 text-lg backdrop-blur-sm">
            Call {business.phone}
          </a>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20">
        <ServiceTicker />
      </div>
    </div>
  );
};

export default Cover;
