// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../../ThemeProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ui/ToastProvider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#1B1B1B]`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastProvider /> {/* ✅ render it here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
