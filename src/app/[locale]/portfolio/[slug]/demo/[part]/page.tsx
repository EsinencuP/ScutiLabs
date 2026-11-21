import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StockLedger } from "@/components/demo/stock-ledger";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { getDemoPart, getProject, projects } from "@/content/projects";
import { isLocale, locales } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/get-dictionary";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string; part: string }> };


export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.flatMap((p) => p.demo.map((d) => ({ locale, slug: p.slug, part: d.slug }))),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, part } = await params;
  const project = getProject(slug);
  const demo = project && getDemoPart(project, part);
  if (!isLocale(locale) || !project || !demo) return {};
  const d = demo.text[locale];
  return pageMetadata({
    locale,
    path: `/portfolio/${slug}/demo/${part}`,
    title: `${d.title} — ${project.text[locale].name}`,
    description: `${d.summary} ${fill(getDictionary(locale).demo.of, { name: project.text[locale].name })}.`,
  });
}

export default async function DemoPartPage({ params }: Props) {
  const { locale, slug, part } = await params;
  const project = getProject(slug);
  const demo = project && getDemoPart(project, part);
  if (!isLocale(locale) || !project || !demo) notFound();
  const t = getDictionary(locale);
  const p = project.text[locale];
  const d = demo.text[locale];
  const base = `/${locale}/portfolio/${project.slug}`;
  const index = project.demo.findIndex((x) => x.slug === demo.slug);
  const prev = project.demo[index - 1];
  const next = project.demo[index + 1];

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
            { name: d.title, path: `${base}/demo/${demo.slug}` },
          ]),
        }}
      />
      <PageHero>
        <Breadcrumbs
          label={t.nav.breadcrumbs}
          items={[
            { href: `/${locale}/portfolio`, name: t.nav.portfolio },
            { href: base, name: p.name },
            { href: `${base}/demo`, name: t.demo.title },
            { name: d.title },
          ]}
        />
        <p className="mt-8 text-lg text-ink-2">{p.name}</p>
        <h1 className="display h-page mt-2 max-w-[16ch]">{d.title}</h1>
        <p className="lead mt-6 max-w-[56ch]">{d.summary}</p>
      </PageHero>

      <Section className="!pb-14">
        <div className={`grid gap-12 ${demo.shot ? "lg:grid-cols-12" : ""}`}>
          <ol className={`border-t border-ink ${demo.shot ? "lg:col-span-5" : "max-w-3xl"}`}>
            {d.points.map((pt, i) => (
              <li key={pt} className="flex gap-5 border-b border-line py-5 text-lg leading-snug">
                <span aria-hidden="true" className="w-5 shrink-0 text-ink-3">
                  {i + 1}
                </span>
                {pt}
              </li>
            ))}
          </ol>
          {demo.shot && (
            <figure className="lg:col-span-7">
              <a href={demo.shot.src} target="_blank" rel="noopener" className="shot block">
                <Image
                  src={demo.shot.src}
                  width={demo.shot.width}
                  height={demo.shot.height}
                  alt={demo.shot.alt[locale]}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="h-auto w-full"
                  priority
                />
              </a>
              <figcaption className="mt-3 text-sm text-ink-2">{demo.shot.alt[locale]}</figcaption>
            </figure>
          )}
        </div>
      </Section>

      {demo.interactive && (
        <section id="interactive" aria-labelledby="interactive-title" className="frame scroll-mt-24">
          <div className="rounded-[1.75rem] bg-panel/0 py-6 md:py-10">
            <div className="wrap">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <h2 id="interactive-title" className="display h-block">
                  {t.demo.interactive}
                </h2>
                <p className="max-w-[48ch] text-sm text-ink-2">{t.demo.sample}</p>
              </div>
              {demo.interactive === "stock-ledger" && <StockLedger t={t.stock} />}
            </div>
          </div>
        </section>
      )}

      <nav aria-label={t.demo.parts} className="wrap grid gap-3 py-16 sm:grid-cols-3">
        <div>
          {prev && (
            <Link href={`${base}/demo/${prev.slug}`} className="group block rounded-[1.25rem] bg-white p-5 hover:ring-1 hover:ring-ink-3">
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <ArrowLeft />
                {t.demo.prev}
              </span>
              <span className="mt-1 block font-medium">{prev.text[locale].title}</span>
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Link href={`${base}/demo`} className="link text-[0.9375rem]">
            {t.demo.back}
          </Link>
        </div>
        <div>
          {next ? (
            <Link href={`${base}/demo/${next.slug}`} className="block rounded-[1.25rem] bg-white p-5 text-right hover:ring-1 hover:ring-ink-3">
              <span className="flex items-center justify-end gap-2 text-sm text-ink-3">
                {t.demo.next}
                <ArrowRight />
              </span>
              <span className="mt-1 block font-medium">{next.text[locale].title}</span>
            </Link>
          ) : (
            <Link href={base} className="block rounded-[1.25rem] bg-white p-5 text-right hover:ring-1 hover:ring-ink-3">
              <span className="flex items-center justify-end gap-2 text-sm text-ink-3">
                {t.demo.toProject}
                <ArrowRight />
              </span>
              <span className="mt-1 block font-medium">{p.name}</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
