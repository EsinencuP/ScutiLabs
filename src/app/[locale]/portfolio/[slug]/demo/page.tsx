import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ExternalLink, JsonLd, PageHero, Section } from "@/components/ui";
import { getProject, projects } from "@/content/projects";
import { isLocale, locales } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };


export function generateStaticParams() {
  return locales.flatMap((locale) => projects.filter((p) => p.demo.length > 0).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const t = getDictionary(locale);
  const name = project.text[locale].name;
  return pageMetadata({
    locale,
    path: `/portfolio/${slug}/demo`,
    title: fill(t.demo.of, { name }),
    description: `${fill(t.demo.of, { name })}: ${project.demo.map((d) => d.text[locale].title).join(", ")}.`,
  });
}

export default async function DemoPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project || project.demo.length === 0) notFound();
  const t = getDictionary(locale);
  const p = project.text[locale];
  const base = `/${locale}/portfolio/${project.slug}`;
  const interactive = project.demo.filter((d) => d.interactive);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...breadcrumbLd([
            { name: t.nav.home, path: `/${locale}` },
            { name: t.portfolioPage.title, path: `/${locale}/portfolio` },
            { name: p.name, path: base },
            { name: t.demo.title, path: `${base}/demo` },
          ]),
        }}
      />
      <PageHero>
        <Breadcrumbs
          label={t.nav.breadcrumbs}
          items={[
            { href: `/${locale}`, name: t.nav.home },
            { href: `/${locale}/portfolio`, name: t.nav.portfolio },
            { href: base, name: p.name },
            { name: t.demo.title },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg text-ink-2">{p.name}</p>
            <h1 className="display h-page mt-2">{t.demo.title}</h1>
            <p className="lead mt-6 max-w-[50ch]">{t.demo.lead}</p>
          </div>
          <aside className="self-end rounded-[1.25rem] bg-panel p-6 lg:col-span-5">
            <h2 className="font-medium">{t.demo.access}</h2>
            <p className="mt-2 leading-relaxed text-ink-2">{p.demoAccess}</p>
            {project.demoCredentials && (
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.9375rem]">
                <dt className="text-ink-3">{t.demo.login}</dt>
                <dd className="select-all font-medium">{project.demoCredentials.login}</dd>
                <dt className="text-ink-3">{t.demo.password}</dt>
                <dd className="select-all font-medium">{project.demoCredentials.password}</dd>
              </dl>
            )}
            {project.links.demo && (
              <ExternalLink href={project.links.demo} hint={t.projectPage.external} className="btn btn-primary mt-5">
                {t.demo.openApp}
              </ExternalLink>
            )}
          </aside>
        </div>
      </PageHero>

      <Section labelledBy="parts-title">
        <h2 id="parts-title" className="display h-section">
          {t.demo.parts}
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.demo.map((d, i) => (
            <li key={d.slug} className="group relative flex flex-col rounded-[1.5rem] bg-white p-3">
              {d.shot ? (
                <div className="shot aspect-[16/10]">
                  <Image
                    src={d.shot.src}
                    width={d.shot.width}
                    height={d.shot.height}
                    alt=""
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div aria-hidden="true" className="flex aspect-[16/10] items-center justify-center rounded-[1rem] bg-[#0d0e12]">
                  <span className="display text-7xl text-white/85">{i + 1}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                <div className="flex items-center gap-3 text-sm text-ink-3">
                  <span>{i + 1}</span>
                  {d.interactive && <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs text-white">{t.demo.interactive}</span>}
                </div>
                <h3 className="mt-2 text-xl font-medium leading-snug">
                  <Link
                    href={`${base}/demo/${d.slug}`}
                    className="after:absolute after:inset-0 after:rounded-[1.5rem] group-hover:underline"
                  >
                    {d.text[locale].title}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed text-ink-2">{d.text[locale].summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {interactive.length > 0 && (
        <div className="frame pb-2 md:pb-3">
          <section aria-labelledby="interactive-title" className="panel py-20 md:py-24">
            <div className="wrap grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 id="interactive-title" className="display h-section">
                  {t.demo.interactive}
                </h2>
                <p className="lead mt-5 max-w-[40ch]">{t.demo.sample}</p>
              </div>
              <ul className="border-t border-ink lg:col-span-7">
                {interactive.map((d) => (
                  <li key={d.slug} className="border-b border-line">
                    <Link href={`${base}/demo/${d.slug}#interactive`} className="block py-5 hover:underline">
                      <span className="block text-xl font-medium">{d.text[locale].title}</span>
                      <span className="mt-1 block text-ink-2">{d.text[locale].summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
