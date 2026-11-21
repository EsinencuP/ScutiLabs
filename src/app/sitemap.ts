import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { defaultLocale, locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/portfolio", priority: 0.9 },
    ...projects.flatMap((p) => [
      { path: `/portfolio/${p.slug}`, priority: 0.9 },
      ...(p.demo.length > 0 ? [{ path: `/portfolio/${p.slug}/demo`, priority: 0.6 }] : []),
      ...p.demo.map((d) => ({ path: `/portfolio/${p.slug}/demo/${d.slug}`, priority: 0.5 })),
    ]),
    { path: "/brief", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
  ];

  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
          "x-default": absoluteUrl(`/${defaultLocale}${path}`),
        },
      },
    })),
  );
}
