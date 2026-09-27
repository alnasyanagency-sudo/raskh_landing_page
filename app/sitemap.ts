import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"
import { POLICIES } from "@/lib/policies-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/policies`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...POLICIES.map((p) => ({
      url: `${SITE.url}/policies/${p.category}/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ]
}
