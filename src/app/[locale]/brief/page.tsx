import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefForm } from "@/components/brief-form";
import { Breadcrumbs, PageHero, Section } from "@/components/ui";
import { services } from "@/content/services";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { contacts } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/brief", title: t.brief.title, description: t.brief.description });
}

export default async function BriefPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero>
        <Breadcrumbs label={t.nav.breadcrumbs} items={[{ href: `/${locale}`, name: t.nav.home }, { name: t.brief.title }]} />
        <h1 className="display h-page mt-8">{t.brief.title}</h1>
        <p className="lead mt-6 max-w-[56ch]">{t.brief.lead}</p>
      </PageHero>
      <Section className="!pt-6 md:!pt-8">
        <BriefForm
          t={t.brief}
          locale={locale}
          contacts={contacts}
          services={services.map((s) => ({ slug: s.slug, name: s.text[locale].name }))}
        />
      </Section>
    </>
  );
}
