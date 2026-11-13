// Single source of truth for business details used across the site.

export const SITE_URL = "https://fullmersgrind.com";

export const business = {
  name: "Fullmers Grind LLC",
  shortName: "Fullmers Grind",
  phone: "(585) 409-0818",
  phoneHref: "tel:+15854090818",
  phoneDigits: "5854090818",
  email: "fullmersgrind@yahoo.com",
  facebook: "https://www.facebook.com/share/1C4tFpuSw9/?mibextid=wwXIfr",
  serviceAreaLabel: "Buffalo, NY | Wyoming & Genesee County",
  serviceAreas: ["Buffalo, NY", "Wyoming County, NY", "Genesee County, NY"],
  tagline: "Family-owned stump grinding, tree, demo and property services in Western New York.",
};

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const estimateLink: NavLink = { href: "/estimate", label: "Free Estimate" };
