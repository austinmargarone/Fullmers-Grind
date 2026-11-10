// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";
import { ThemeProvider } from "../../ThemeProvider";
import { business, SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ui/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const description =
  "Fullmers Grind LLC is a family-owned and operated business offering stump grinding, small tree removal, snow removal, small demo and junk removal in Buffalo, Wyoming County and Genesee County, NY. Free estimates.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
    template: "%s | Fullmers Grind LLC",
  },
  description,
  keywords: [
    "Fullmers Grind",
    "stump grinding",
    "stump removal",
    "small tree removal",
    "snow plowing",
    "snow removal",
    "small demolition",
    "shed demolition",
    "junk removal",
    "Buffalo NY",
    "Wyoming County NY",
    "Genesee County NY",
    "Attica NY",
    "free estimates",
  ],
  openGraph: {
    title: "Fullmers Grind LLC | Stump Grinding & Tree Removal",
    description,
    url: "/",
    siteName: business.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Fullmers Grind LLC equipment" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1B1B1B",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  description,
  url: SITE_URL,
  telephone: "+1-585-409-0818",
  email: business.email,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/Logo.jpeg`,
  areaServed: business.serviceAreas.map((name) => ({ "@type": "Place", name })),
  sameAs: [business.facebook],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#1B1B1B] font-sans`}>
        <JsonLd data={localBusiness} />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastProvider />
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18117004957"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18117004957');
          `}
        </Script>
      </body>
    </html>
  );
}
