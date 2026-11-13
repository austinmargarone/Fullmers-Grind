"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/lib/site";
import { seasonKey, winter } from "@/lib/seasonal";
import Snowfall from "./Snowfall";

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
 * Snow plowing offer shown once per visitor per winter, after a short delay,
 * with snow falling over the page while it's open.
 *
 * Desktop: centered pop-up over a dimmed page.
 * Phones: compact bottom banner with no overlay, so the page stays visible and
 * usable. Google demotes mobile pages whose content is covered by pop-ups when
 * visitors arrive from search; reasonably sized banners are fine.
 */
export default function WinterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const excluded = winter.popupExcludePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (excluded || alreadySeen()) return;
    const t = window.setTimeout(() => {
      if (alreadySeen()) return;
      markSeen();
      setCompact(window.matchMedia("(max-width: 639px)").matches);
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
    // Only move focus for the desktop pop-up; the phone banner shouldn't steal it
    if (!compact) closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, compact, close]);

  if (!open) return null;

  const badge = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
        <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" />
      </svg>
      Winter {seasonKey().replace("-", "–")}
    </span>
  );

  const closeButton = (extra: string) => (
    <button
      ref={closeRef}
      type="button"
      onClick={close}
      aria-label="Close"
      className={`rounded-full p-2 text-white hover:bg-white/10 ${extra}`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );

  // Phones: compact banner, page stays visible and usable behind it
  if (compact) {
    return (
      <>
        {winter.snow && <Snowfall className="fixed inset-0 z-[45]" />}
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="winter-popup-title"
          className="fixed inset-x-2 bottom-2 z-[90] rounded-2xl border border-white/15 bg-[#1B1B1B]/95 p-4 shadow-2xl backdrop-blur-md animate-[popIn_260ms_ease-out]"
        >
          <div className="flex items-start justify-between gap-2">
            {badge}
            {closeButton("-mr-2 -mt-2")}
          </div>
          <h2 id="winter-popup-title" className="mt-2 text-lg font-extrabold leading-snug">
            Snow&apos;s coming. Get on the plow list!
          </h2>
          <div className="mt-3 flex gap-2">
            <Link href={ESTIMATE_HREF} onClick={close} className="btn-primary flex-1 justify-center py-2.5 text-[0.95rem]">
              Free Plowing Quote
            </Link>
            <a href={business.phoneHref} onClick={close} className="btn-secondary justify-center px-4 py-2.5 text-[0.95rem]">
              Call
            </a>
          </div>
        </div>
      </>
    );
  }

  // Desktop: centered pop-up over a dimmed page
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="presentation">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-[fadeIn_200ms_ease-out]"
        onClick={close}
        aria-hidden
      />
      {winter.snow && <Snowfall className="absolute inset-0" />}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="winter-popup-title"
        aria-describedby="winter-popup-text"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#1B1B1B] shadow-2xl animate-[popIn_260ms_ease-out]"
      >
        <div className="relative h-44">
          <Image src="/plow.jpg" alt="" fill sizes="448px" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/30 to-transparent" />
          <div className="absolute left-4 top-4">{badge}</div>
        </div>

        {closeButton("absolute right-3 top-3 bg-black/50 backdrop-blur-sm hover:bg-black/70")}

        <div className="px-7 pb-7 pt-1">
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
