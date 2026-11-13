"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number | null; // null = closed
  onChange: (index: number | null) => void;
};

/** Full-screen photo viewer: arrows, swipe, keyboard (← → Esc), click backdrop to close. */
export default function Lightbox({ images, index, onChange }: Props) {
  const open = index !== null;
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState<string | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open, go, onChange]);

  if (index === null) return null;
  const img = images[index];
  const multiple = images.length > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-[fadeIn_150ms_ease-out]"
      onClick={() => onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50 && multiple) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="relative h-[85vh] w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="92vw"
          className={`object-contain transition-opacity duration-200 ${loaded === img.src ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(img.src)}
          priority
        />
        {loaded !== img.src && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-brand" />
          </div>
        )}
      </div>

      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4 text-white">
        <span className="text-sm text-white/80">
          {multiple && `${index + 1} / ${images.length}`}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onChange(null)}
          aria-label="Close photo viewer"
          className="rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {multiple && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {img.alt && (
        <p className="absolute bottom-4 left-1/2 max-w-[90vw] -translate-x-1/2 text-center text-sm text-white/80">
          {img.alt}
        </p>
      )}
    </div>,
    document.body
  );
}
