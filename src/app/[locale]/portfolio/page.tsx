import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioCatalog } from "@/components/portfolio-catalog";
import { PortfolioNote } from "@/components/portfolio-note";
import { ProjectCard } from "@/components/project-card";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { projects, type ProjectStatus } from "@/content/projects";
import { services } from "@/content/services";
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

  const usedServices = services.filter((s) => projects.some((p) => p.services.includes(s.slug)));
  const usedStatuses = (["live", "demo", "development"] as ProjectStatus[]).filter((st) => projects.some((p) => p.status === st));

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
        <PortfolioCatalog
          items={projects.map((p) => ({
            slug: p.slug,
            status: p.status,
            services: p.services,
            node: <ProjectCard project={p} locale={locale} t={t} />,
          }))}
          services={usedServices.map((s) => ({ value: s.slug, label: s.text[locale].name }))}
          statuses={usedStatuses.map((st) => ({ value: st, label: t.status[st] }))}
          labels={{
            direction: t.portfolioPage.direction,
            status: t.portfolioPage.status,
            all: t.portfolioPage.all,
            empty: t.portfolioPage.empty,
            reset: t.portfolioPage.reset,
            count: t.portfolioPage.count,
          }}
        />
      </Section>
    </>
  );
}
