import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AsciiStar } from "@/components/ascii-star";
import { HashScroll } from "@/components/hash-scroll";
import { PlusIcon } from "@/components/icons";
import { PortfolioNote } from "@/components/portfolio-note";
import { PortfolioLayout } from "@/components/portfolio-layout";
import { StarSystem } from "@/components/star-system";
import { JsonLd, Section } from "@/components/ui";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, pageMetadata, SITE_NAME } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    ...pageMetadata({ locale, title: t.meta.homeTitle, description: t.meta.homeDescription }),
    title: { absolute: t.meta.homeTitle },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);

  const systemServices = services.map((s) => ({
    slug: s.slug,
    name: s.text[locale].name,
    short: s.text[locale].short,
    processes: s.text[locale].processes,
    orbit: s.orbit,
    angle: s.angle,
    size: s.size,
  }));

  return (
    <>
      <HashScroll />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": absoluteUrl("/#organization"),
              name: SITE_NAME,
              url: absoluteUrl(`/${locale}`),
              description: t.meta.homeDescription,
              knowsAbout: services.map((s) => s.text[locale].name),
            },
            {
              "@type": "FAQPage",
              mainEntity: t.faq.items.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* Hero */}
      <div className="frame pt-2 md:pt-3">
        <section
          aria-labelledby="hero-title"
          className="panel relative flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden md:min-h-[calc(100svh-1.5rem)]"
        >
          <div className="wrap relative z-10 flex flex-col items-center pb-4 pt-28 text-center md:pt-32">
            <h1 id="hero-title" className="display h-hero max-w-[18ch]">
              {t.hero.title}
            </h1>
            <p className="lead mt-7 max-w-[52ch]">{t.hero.lead}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={`/${locale}/brief`} className="btn btn-primary btn-glow">
                {t.hero.primary}
              </Link>
              <Link href={`/${locale}/portfolio`} className="btn btn-ghost">
                {t.hero.secondary}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[14rem] flex-1">
            <AsciiStar className="absolute inset-0" />
            <p className="absolute bottom-4 left-5 z-10 rounded-full bg-white/85 px-3 py-1 text-xs text-ink-2 backdrop-blur-sm md:left-8">
              {t.hero.caption}
            </p>
          </div>
        </section>
      </div>

      {/* Directions */}
      <div className="frame pt-2 md:pt-3" id="directions">
        <section aria-labelledby="dir-title" className="panel py-20 md:py-28">
          <div className="wrap">
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <h2 id="dir-title" className="display h-section">
                {t.directions.title}
              </h2>
              <p className="lead mx-auto mt-4 max-w-[52ch]">{t.directions.lead}</p>
            </div>
            <StarSystem
              locale={locale}
              services={systemServices}
              labels={{
                processes: t.directions.processes,
                more: t.directions.more,
                map: t.directions.map,
                orbits: t.directions.orbits,
                mapNote: t.directions.mapNote,
                all: t.nav.allServices,
              }}
            />
          </div>
        </section>
      </div>

      {/* Portfolio */}
      <Section id="portfolio" labelledBy="portfolio-title">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <h2 id="portfolio-title" className="display h-section">
              {t.portfolio.title}
            </h2>
            <p className="lead mt-4 max-w-[52ch]">{t.portfolio.lead}</p>
          </div>
          <Link href={`/${locale}/portfolio`} className="link font-medium">
            {t.portfolio.catalog}
          </Link>
        </div>
        <PortfolioNote locale={locale} note={t.portfolio.note} className="mb-20 md:mb-28" />
        <PortfolioLayout projects={projects} locale={locale} t={t} />
      </Section>

      {/* How to start */}
      <div className="frame" id="start">
        <section aria-labelledby="start-title" className="panel py-20 md:py-28">
          <div className="wrap">
            <h2 id="start-title" className="display h-section">
              {t.start.title}
            </h2>
            <p className="lead mt-4 max-w-[46ch]">{t.start.lead}</p>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
              <span
                aria-hidden="true"
                className="absolute left-[0.9rem] top-2 bottom-2 w-px border-l border-dashed border-ink-3 md:inset-x-0 md:left-0 md:top-[0.9rem] md:bottom-auto md:h-px md:w-full md:border-l-0 md:border-t"
              />
              {t.start.steps.map((s, i) => (
                <li key={s.title} className="relative pl-12 md:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 flex size-7 items-center justify-center rounded-full text-sm font-medium md:static ${
                      i === 0 ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-medium leading-snug md:mt-6">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{s.text}</p>
                </li>
              ))}
            </ol>
            <Link href={`/${locale}/brief`} className="btn btn-primary mt-14">
              {t.nav.brief}
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="display h-section lg:sticky lg:top-28">
              {t.faq.title}
            </h2>
          </div>
          <div className="border-t border-ink lg:col-span-8">
            {t.faq.items.map((f) => (
              <details key={f.q} className="faq group border-b border-line">
                <summary className="flex items-start justify-between gap-6 py-5 text-lg font-medium leading-snug md:text-xl">
                  {f.q}
                  <span className="faq-sign mt-0.5 shrink-0 transition-transform duration-300">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 pr-10 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to action */}
      <div className="frame pb-2 md:pb-3">
        <section aria-labelledby="cta-title" className="panel px-5 py-20 text-center md:py-28">
          <h2 id="cta-title" className="display h-section mx-auto max-w-[22ch]">
            {t.cta.title}
          </h2>
          <p className="lead mx-auto mt-5 max-w-[46ch]">{t.cta.text}</p>
          <Link href={`/${locale}/brief`} className="btn btn-primary btn-glow mt-9">
            {t.cta.button}
          </Link>
        </section>
      </div>
    </>
  );
}
