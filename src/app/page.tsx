import type { Metadata } from "next";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
import Cover from "./components/Cover";

export const metadata: Metadata = {
  title: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
  description:
    "Fullmers Grind LLC is a family-owned and operated business offering stump grinding, small tree removal, snow removal and small demo work service in Western, NY. We offer affordable rates and free estimates.",
  keywords:
    "Fullmers Grind, Fullmers Grind LLC, stump grinding, tree removal, Buffalo NY, tree service, stump removal, tree trimming, tree cutting, Snow Plowing, affordable rates, free estimates, Attica NY, Wyoming County, Bennington NY",
  openGraph: {
    images: [
      {
        url: `${baseURL}/meta.png`,
        width: 1200,
        height: 630,
        alt: "Fullmers Grind LLC | Stump Grinding",
      },
    ],
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 1;

export default function Home() {
  return (
    <main>
      <section>
        <Cover />
      </section>
    </main>
  );
}
