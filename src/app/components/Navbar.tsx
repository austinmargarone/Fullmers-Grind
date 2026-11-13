"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, estimateLink, navLinks } from "@/lib/site";
import { services } from "@/lib/services";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close desktop services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const linkClass = (href: string) =>
    `relative px-1 py-2 text-[0.95rem] font-semibold transition-colors ${
      isActive(pathname, href)
        ? "text-brand after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-brand"
        : "text-white hover:text-brand"
    }`;

  return (
    <header>
      <nav
        aria-label="Main"
        className="fixed top-0 z-50 w-full border-b border-white/20 bg-[#1B1B1B]/70 shadow-md backdrop-blur-md"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5">
          <Link
            href="/"
            className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl"
          >
            {business.name}
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) =>
              link.href === "/services" ? (
                <li key={link.href} ref={servicesRef} className="relative">
                  <div className="flex items-center">
                    <Link href={link.href} className={linkClass(link.href)}>
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Show services"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="ml-0.5 rounded p-1 text-white hover:text-brand"
                    >
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <ul
                    id="services-menu"
                    className={`absolute left-0 top-full mt-2 w-60 origin-top rounded-lg border border-white/15 bg-[#1B1B1B]/95 p-2 shadow-xl backdrop-blur-md transition duration-200 ${
                      servicesOpen
                        ? "visible scale-100 opacity-100"
                        : "invisible scale-95 opacity-0"
                    }`}
                  >
                    {services.map((s) => {
                      const href = `/services/${s.slug}`;
                      return (
                        <li key={s.slug}>
                          <Link
                            href={href}
                            tabIndex={servicesOpen ? 0 : -1}
                            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                              pathname === href
                                ? "bg-brand text-black"
                                : "text-white hover:bg-white/10"
                            }`}
                          >
                            {s.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={linkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                href={estimateLink.href}
                className={`btn-primary ${pathname === estimateLink.href ? "ring-2 ring-white" : ""}`}
              >
                {estimateLink.label}
              </Link>
            </li>
          </ul>

          {/* Mobile: call + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={business.phoneHref}
              className="rounded-md bg-brand px-3 py-2 text-sm font-bold text-black"
            >
              Call
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative h-10 w-10 rounded-md bg-black/30 text-white hover:bg-black/50"
            >
              <span
                className={`absolute left-2 right-2 h-0.5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3"
                }`}
              />
              <span
                className={`absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-2 right-2 h-0.5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-3"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <ul
              className={`max-h-[calc(100dvh-72px)] space-y-1 overflow-y-auto border-t border-white/10 px-5 pb-6 pt-3 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-lg font-semibold ${
                      isActive(pathname, link.href)
                        ? "bg-white/10 text-brand"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.href === "/services" && (
                    <ul className="ml-3 border-l border-white/15 pl-3">
                      {services.map((s) => {
                        const href = `/services/${s.slug}`;
                        return (
                          <li key={s.slug}>
                            <Link
                              href={href}
                              tabIndex={open ? 0 : -1}
                              className={`block rounded-md px-3 py-2 text-base ${
                                pathname === href
                                  ? "text-brand"
                                  : "text-white/80 hover:text-white"
                              }`}
                            >
                              {s.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href={estimateLink.href}
                  tabIndex={open ? 0 : -1}
                  className="btn-primary w-full justify-center py-3 text-lg"
                >
                  Get a {estimateLink.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
