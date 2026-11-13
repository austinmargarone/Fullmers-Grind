"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/lib/site";
import { seasonKey, winter } from "@/lib/seasonal";

const ESTIMATE_HREF = `/estimate?service=${encodeURIComponent("Snow Removal")}`;

function storageKey() {
  return `fg-winter-popup-${seasonKey()}`;
}

function alreadySeen() {
  try {
    return window.localStorage.getItem(storageKey()) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(storageKey(), "1");
  } catch {
    /* storage blocked (private mode etc.): pop-up may show again, that's fine */
  }
}

/**
 * Snow plowing offer shown once per visitor per winter, after a short delay.
 * Centered card on desktop, bottom sheet on phones (Google penalizes
 * full-screen pop-ups on mobile page entry).
 */
export default function WinterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const excluded = winter.popupExcludePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (excluded || alreadySeen()) return;
    const t = window.setTimeout(() => {
      if (alreadySeen()) return;
      markSeen();
      setOpen(true);
    }, winter.popupDelaySeconds * 1000);
    return () => window.clearTimeout(t);
  }, [excluded]);

  // Navigating to an excluded page (like the estimate form) closes it
  useEffect(() => {
    if (excluded) setOpen(false);
  }, [excluded]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4" role="presentation">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-[fadeIn_200ms_ease-out]"
        onClick={close}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="winter-popup-title"
        aria-describedby="winter-popup-text"
        className="relative w-full overflow-hidden rounded-t-2xl border border-white/15 bg-[#1B1B1B] shadow-2xl animate-[popIn_260ms_ease-out] sm:max-w-md sm:rounded-2xl"
      >
        <div className="relative h-36 sm:h-44">
          <Image src="/plow.jpg" alt="" fill sizes="(min-width: 640px) 448px, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/30 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
              <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" />
            </svg>
            Winter {seasonKey().replace("-", "–")}
          </span>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-7">
          <h2 id="winter-popup-title" className="text-2xl font-extrabold leading-tight">
            Snow&apos;s coming. Is your driveway ready?
          </h2>
          <p id="winter-popup-text" className="mt-2 text-white/80">
            Get on the {business.shortName} plow list before the first big storm. Driveway and
            small lot plowing across Western New York.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link href={ESTIMATE_HREF} onClick={close} className="btn-primary justify-center py-3 text-lg">
              Get a Free Plowing Quote
            </Link>
            <a href={business.phoneHref} onClick={close} className="btn-secondary justify-center py-3">
              Call {business.phone}
            </a>
          </div>
          <button type="button" onClick={close} className="mx-auto mt-3 block text-sm text-white/50 hover:text-white/80">
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
