import type { Metadata } from "next";
import Cover from "./components/Cover";

export const metadata: Metadata = {
  title: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
  description: "Fullmers Grind LLC is a family-owned...",
  keywords: "Fullmers Grind, Fullmers Grind LLC...",
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
