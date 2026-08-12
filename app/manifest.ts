import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#0e1a2b",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
    ],
  };
}
