import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    dir: "rtl",
    lang: "ar",
    background_color: "#FAF8F4",
    theme_color: "#1C3522",
    icons: [{ src: "/brand/app-icon.png", sizes: "512x512", type: "image/png" }],
  }
}
