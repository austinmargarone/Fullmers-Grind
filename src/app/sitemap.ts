import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fullmersgrind@yahoo.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },

    // add all your pages here
  ];
}
