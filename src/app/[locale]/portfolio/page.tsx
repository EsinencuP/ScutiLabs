import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioNote } from "@/components/portfolio-note";
import { PortfolioLayout } from "@/components/portfolio-layout";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { projects } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/portfolio", title: t.portfolioPage.title, description: t.portfolioPage.description });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: t.portfolioPage.title,
              url: absoluteUrl(`/${locale}/portfolio`),
              hasPart: projects.map((p) => ({
                "@type": "CreativeWork",
                name: p.text[locale].name,
                url: absoluteUrl(`/${locale}/portfolio/${p.slug}`),
              })),
            },
            breadcrumbLd([
              { name: t.nav.home, path: `/${locale}` },
              { name: t.portfolioPage.title, path: `/${locale}/portfolio` },
            ]),
          ],
        }}
      />
      <PageHero>
        <Breadcrumbs label={t.nav.breadcrumbs} items={[{ href: `/${locale}`, name: t.nav.home }, { name: t.nav.portfolio }]} />
        <h1 className="display h-page mt-8">{t.portfolioPage.title}</h1>
        <p className="lead mt-6 max-w-[52ch]">{t.portfolioPage.lead}</p>
      </PageHero>
      <Section className="!pt-12 md:!pt-16">
        <PortfolioNote locale={locale} note={t.portfolio.note} className="mb-12" />
        <PortfolioLayout projects={projects} locale={locale} t={t} />
      </Section>
    </>
  );
}
