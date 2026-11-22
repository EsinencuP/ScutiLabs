import type { Metadata, Viewport } from "next";
import { Google_Sans, JetBrains_Mono, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { services } from "@/content/services";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "../globals.css";

const onest = Onest({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-onest", display: "swap" });
const display = Google_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-google-sans",
  display: "swap",
  // next/font has no metric overrides for Google Sans; fall back to the body face instead
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#e6e7ea",
  colorScheme: "light",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: { default: t.meta.homeTitle, template: t.meta.titleTemplate },
    description: t.meta.homeDescription,
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const navServices = services.map((s) => ({ slug: s.slug, name: s.text[locale].name, short: s.text[locale].short }));

  return (
    <html lang={locale} className={`${onest.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {t.nav.skip}
        </a>
        <SiteHeader locale={locale} nav={t.nav} services={navServices} />
        <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
