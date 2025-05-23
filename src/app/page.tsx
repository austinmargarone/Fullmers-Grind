import type { Metadata } from "next";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
import Cover from "./components/Cover";

export const metadata: Metadata = {
  title: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
  description:
    "Fullmers Grind LLC is a family-owned and operated stump grinding and tree removal service in Rochester, NY. We offer affordable rates and free estimates.",
  keywords:
    "Fullmers Grind, stump grinding, tree removal, Buffalo NY, tree service, stump removal, tree trimming, tree cutting, affordable rates, free estimates",
  openGraph: {
    images: [
      {
        url: `${baseURL}/meta.png`,
        width: 1200,
        height: 630,
        alt: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
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
