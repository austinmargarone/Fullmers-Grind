"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServiceImage } from "@/lib/services";
import Lightbox from "../Lightbox";

/** Feature photo + thumbnail grid for a service page. Every photo opens the lightbox. */
export function FeaturePhoto({ images }: { images: ServiceImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const hero = images[0];
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label={`View photo: ${hero.alt}`}
        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10"
      >
        <Image src={hero.src} alt={hero.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
            View all {images.length} photos
          </span>
        )}
      </button>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}

export default function ServiceGallery({ images }: { images: ServiceImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // Thumbnails skip the feature photo, but the lightbox includes all photos
  const thumbs = images.slice(1);
  if (thumbs.length === 0) return null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {thumbs.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpen(i + 1)}
              aria-label={`View photo: ${img.alt}`}
              className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
