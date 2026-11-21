import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { services } from "@/content/services";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/services", title: t.servicesPage.title, description: t.servicesPage.description });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...breadcrumbLd([
            { name: t.nav.home, path: `/${locale}` },
            { name: t.servicesPage.title, path: `/${locale}/services` },
          ]),
        }}
      />
      <PageHero>
        <Breadcrumbs label={t.nav.breadcrumbs} items={[{ href: `/${locale}`, name: t.nav.home }, { name: t.nav.services }]} />
        <h1 className="display h-page mt-8 max-w-[14ch]">{t.servicesPage.title}</h1>
        <p className="lead mt-6 max-w-[52ch]">{t.servicesPage.lead}</p>
      </PageHero>

      <Section className="!pt-10 md:!pt-14">
        <ul className="grid gap-3 md:grid-cols-2">
          {services.map((s) => {
            const st = s.text[locale];
            return (
              <li key={s.slug} className="group relative flex flex-col rounded-[1.5rem] bg-white p-7 md:p-9">
                <span className="text-sm text-ink-3">{t.directions.orbits[s.orbit]}</span>
                <h2 className="display h-block mt-3">
                  <Link
                    href={`/${locale}/services/${s.slug}`}
                    className="after:absolute after:inset-0 after:rounded-[1.5rem] group-hover:underline group-hover:decoration-1"
                  >
                    {st.name}
                  </Link>
                </h2>
                <p className="mt-3 text-lg leading-snug text-ink-2">{st.short}</p>
                <ul className="mt-6 space-y-1.5 text-[0.9375rem] text-ink-2">
                  {st.processes.slice(0, 4).map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-3" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
