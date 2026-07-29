import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://portfolio-evans-abah.vercel.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://portfolio-evans-abah.vercel.app/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://portfolio-evans-abah.vercel.app/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://portfolio-evans-abah.vercel.app/#projects", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://portfolio-evans-abah.vercel.app/#certifications", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://portfolio-evans-abah.vercel.app/#testimonials", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
