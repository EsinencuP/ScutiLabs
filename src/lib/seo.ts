import type { Metadata } from "next";
import { defaultLocale, locales, ogLocale, type Locale } from "@/i18n/config";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100").replace(/\/$/, "");
export const SITE_NAME = "scutilabs";

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Metadata with canonical URL and hreflang alternates for every site language. */
export function pageMetadata(opts: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const path = opts.path ?? "";
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));

  const image = { url: absoluteUrl(`/${opts.locale}/og`), width: 1200, height: 630, alt: SITE_NAME };

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: absoluteUrl(localePath(opts.locale, path)), languages },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      url: absoluteUrl(localePath(opts.locale, path)),
      locale: ogLocale[opts.locale],
      alternateLocale: locales.filter((l) => l !== opts.locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image.url] },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
  };
}
