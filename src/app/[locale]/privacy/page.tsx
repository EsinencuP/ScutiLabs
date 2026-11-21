import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, PageHero, Section } from "@/components/ui";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/privacy", title: t.privacy.title, description: t.privacy.description });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <PageHero>
        <Breadcrumbs label={t.nav.breadcrumbs} items={[{ href: `/${locale}`, name: t.nav.home }, { name: t.privacy.title }]} />
        <h1 className="display h-page mt-8">{t.privacy.title}</h1>
        <p className="mt-6 text-ink-2">{t.privacy.updated}</p>
      </PageHero>
      <Section>
        <div className="max-w-3xl">
          {t.privacy.sections.map((s) => (
            <section key={s.title} className="border-t border-line py-8 first:border-ink">
              <h2 className="text-2xl font-medium">{s.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-2">{s.text}</p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
