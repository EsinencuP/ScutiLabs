import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/logo";
import { ProjectCard } from "@/components/project-card";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };


export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};
  const st = service.text[locale];
  return pageMetadata({ locale, path: `/services/${slug}`, title: st.name, description: st.metaDescription });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) notFound();
  const t = getDictionary(locale);
  const st = service.text[locale];
  const related = projects.filter((p) => p.services.includes(service.slug));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: st.name,
              description: st.purpose,
              serviceType: st.name,
              provider: { "@id": absoluteUrl("/#organization") },
              url: absoluteUrl(`/${locale}/services/${slug}`),
            },
            breadcrumbLd([
              { name: t.nav.home, path: `/${locale}` },
              { name: t.servicesPage.title, path: `/${locale}/services` },
              { name: st.name, path: `/${locale}/services/${slug}` },
            ]),
          ],
        }}
      />
      <PageHero>
        <Breadcrumbs
          label={t.nav.breadcrumbs}
          items={[
            { href: `/${locale}`, name: t.nav.home },
            { href: `/${locale}/services`, name: t.nav.services },
            { name: st.name },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-sm text-ink-3">{t.directions.orbits[service.orbit]}</p>
            <h1 className="display h-page mt-3 max-w-[14ch]">{st.name}</h1>
            <p className="lead mt-6 max-w-[56ch]">{st.purpose}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/${locale}/brief?service=${service.slug}`} className="btn btn-primary btn-glow">
                {t.servicePage.brief}
              </Link>
              {related.length > 0 && (
                <a href="#projects" className="btn btn-ghost">
                  {t.servicePage.projects}
                </a>
              )}
            </div>
          </div>
        </div>
      </PageHero>

      <Section labelledBy="processes-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="processes-title" className="display h-section lg:col-span-5">
            {t.servicePage.processes}
          </h2>
          <ul className="border-t border-ink lg:col-span-7">
            {st.processes.map((p) => (
              <li key={p} className="flex items-baseline gap-4 border-b border-line py-4 text-lg leading-snug md:text-xl">
                <LogoMark className="size-3.5 shrink-0 translate-y-0.5 text-ink-3" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <div className="frame">
        <section aria-labelledby="outcomes-title" className="panel py-20 md:py-24">
          <div className="wrap">
            <h2 id="outcomes-title" className="display h-section max-w-[18ch]">
              {t.servicePage.outcomes}
            </h2>
            <ul className="mt-12 grid gap-8 md:grid-cols-3">
              {st.outcomes.map((o) => (
                <li key={o} className="border-t border-ink pt-5 text-lg leading-snug">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {related.length > 0 && (
        <Section id="projects" labelledBy="projects-title">
          <h2 id="projects-title" className="display h-section">
            {t.servicePage.projects}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} locale={locale} t={t} />
            ))}
          </div>
        </Section>
      )}

      <Section labelledBy="other-title" className={related.length > 0 ? "!pt-0" : ""}>
        <div className="grid gap-10 border-t border-line pt-16 lg:grid-cols-12">
          <h2 id="other-title" className="text-2xl font-medium lg:col-span-4">
            {t.servicePage.other}
          </h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {others.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/${locale}/services/${s.slug}`} className="block py-4 hover:underline">
                  <span className="block text-lg font-medium">{s.text[locale].name}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug text-ink-2">{s.text[locale].short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
