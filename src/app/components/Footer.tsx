import Image from "next/image";
import Link from "next/link";
import React from "react";
import { business, estimateLink, navLinks } from "@/lib/site";
import { services } from "@/lib/services";
import CopyNumber from "./ui/CopyNumber";
import JeremyEmail from "./ui/JeremyEmail";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 px-4 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 text-white md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/Fullmers grind llc.jpg"
            alt="Fullmers Grind LLC logo"
            width={574}
            height={435}
            className="h-auto w-[220px] rounded-xl"
          />
          <p className="mt-4 max-w-[340px] text-white/80">
            A family-owned and operated business. We understand how important
            your property is to you, and we&apos;re here to help.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Services</h2>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="space-y-2">
            {navLinks
              .filter((l) => l.href !== "/services")
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href={estimateLink.href} className="text-white/80 hover:text-brand">
                {estimateLink.label}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Service Area</h2>
          <div className="mb-5 flex items-center">
            <Image src="/Map.png" alt="" width={14} height={14} className="mr-2 h-[14px] w-[14px]" />
            <p className="text-white/80">{business.serviceAreaLabel}</p>
          </div>

          <h2 className="footer-heading">Contact</h2>
          <div className="my-2 flex items-center">
            <Image className="mr-2" src="/Phone.svg" alt="" width={14} height={14} />
            <CopyNumber />
          </div>
          <div className="flex items-center gap-2">
            <Image src="/Mail.svg" alt="" width={14} height={14} />
            <JeremyEmail />
          </div>

          <div className="mt-5 flex items-center gap-4">
            <Link href={business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Fullmers Grind on Facebook">
              <Image
                src="/facebook.svg"
                alt=""
                width={32}
                height={32}
                className="rounded-full bg-[#3b5998] transition-all duration-200 ease-in-out hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl justify-center lg:justify-end">
        <Link href="https://www.fcvt.dev/" target="_blank" rel="noopener">
          <span className="flex h-[48px] w-[205px] flex-col items-start justify-center rounded-lg border border-white/60 px-4 text-white">
            <span className="text-[.5rem]">Developed by</span>
            <span className="pb-1">Flower City Virtual Tours</span>
          </span>
        </Link>
      </div>

      <div className="mt-8 flex w-full justify-center border-t border-white/10 py-2 text-[.7rem] text-white/70">
        © {new Date().getFullYear()} {business.name} | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
