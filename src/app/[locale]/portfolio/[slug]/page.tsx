import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { Breadcrumbs, ExternalLink, JsonLd, PageHero, Section, StatusBadge } from "@/components/ui";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };


export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const p = project.text[locale];
  return pageMetadata({ locale, path: `/portfolio/${slug}`, title: `${p.name}: ${p.kind}`, description: p.metaDescription });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const t = getDictionary(locale);
  const tp = t.projectPage;
  const p = project.text[locale];
  const base = `/${locale}/portfolio/${project.slug}`;
  const hasDemo = project.demo.length > 0;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: p.name,
              description: p.summary,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: absoluteUrl(base),
              ...(project.links.demo ? { sameAs: [project.links.demo] } : {}),
              ...(project.links.repo ? { codeRepository: project.links.repo } : {}),
              creator: { "@id": absoluteUrl("/#organization") },
              dateCreated: String(project.year),
            },
            breadcrumbLd([
              { name: t.nav.home, path: `/${locale}` },
              { name: t.portfolioPage.title, path: `/${locale}/portfolio` },
              { name: p.name, path: base },
            ]),
          ],
        }}
      />

      <PageHero className="!pb-6 md:!pb-8">
        <Breadcrumbs
          label={t.nav.breadcrumbs}
          items={[
            { href: `/${locale}`, name: t.nav.home },
            { href: `/${locale}/portfolio`, name: t.nav.portfolio },
            { name: p.name },
          ]}
        />
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span>{p.kind}</span>
          <span className="text-ink-3">{project.year}</span>
        </div>
        <h1 className="display h-page mt-5">{p.name}</h1>
        <p className="lead mt-6 max-w-[56ch]">{p.tagline}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {hasDemo && (
            <Link href={`${base}/demo`} className="btn btn-primary btn-glow">
              {tp.demoOpen}
            </Link>
          )}
          {project.links.demo && (
            <ExternalLink href={project.links.demo} hint={tp.external}>
              {tp.links.demo}
            </ExternalLink>
          )}
          {project.links.guide && (
            <ExternalLink href={project.links.guide} hint={tp.external}>
              {tp.links.guide}
            </ExternalLink>
          )}
          {project.links.repo && (
            <ExternalLink href={project.links.repo} hint={tp.external}>
              {tp.links.repo}
            </ExternalLink>
          )}
          {project.links.related && (
            <ExternalLink href={project.links.related.href} hint={tp.external}>
              {project.links.related.label[locale]}
            </ExternalLink>
          )}
        </div>

        <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-ink-3">{f.label}</dt>
              <dd className="mt-1 leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <ProjectVisual project={project} locale={locale} wide />
        </div>
      </PageHero>

      {/* Purpose */}
      <Section labelledBy="purpose-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="purpose-title" className="display h-section lg:col-span-4">
            {tp.purpose}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed md:text-xl lg:col-span-8">
            {p.purpose.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Workflow */}
      {p.workflow && (
      <div className="frame">
        <section aria-labelledby="workflow-title" className="panel py-20 md:py-28">
          <div className="wrap">
            <h2 id="workflow-title" className="display h-section">
              {tp.workflow}
            </h2>
            <ol className="mt-12 border-t border-ink">
              {p.workflow.map((s, i) => (
                <li
                  key={i}
                  className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)]"
                >
                  <span aria-hidden="true" className="display text-3xl leading-none text-ink-3">
                    {i + 1}
                  </span>
                  <h3 className="font-medium">{s.actor}</h3>
                  <p className="leading-relaxed">{s.action}</p>
                  <p className="leading-relaxed text-ink-2">{s.result}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
      )}

      {/* Modules */}
      {p.modules && (
      <Section labelledBy="modules-title">
        <h2 id="modules-title" className="display h-section">
          {tp.modules}
        </h2>
        <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {p.modules.map((m) => (
            <div key={m.name} className="border-t border-ink pt-5">
              <dt className="text-xl font-medium">{m.name}</dt>
              <dd className="mt-2 leading-relaxed text-ink-2">{m.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
      )}

      {/* Strengths and business value */}
      {p.benefits && p.strengths && (
      <div className="frame">
        <section className="panel py-20 md:py-28">
          <div className="wrap grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="display h-block">{tp.benefits}</h2>
              <ul className="mt-8 space-y-4">
                {p.benefits.map((b) => (
                  <li key={b} className="flex gap-4 text-lg leading-snug">
                    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-scuti" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display h-block">{tp.strengths}</h2>
              <ul className="mt-8 space-y-4">
                {p.strengths.map((s) => (
                  <li key={s} className="flex gap-4 leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full border border-ink" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      )}

      {/* Usage scenario */}
      {p.usage && (
      <Section labelledBy="usage-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="usage-title" className="display h-section lg:col-span-5">
            {p.usageTitle}
          </h2>
          <ol className="space-y-0 border-t border-ink lg:col-span-7">
            {p.usage.map((u, i) => (
              <li key={u} className="flex gap-5 border-b border-line py-5 text-lg leading-snug">
                <span aria-hidden="true" className="w-6 shrink-0 text-ink-3">
                  {i + 1}
                </span>
                {u}
              </li>
            ))}
          </ol>
        </div>
      </Section>
      )}

      {/* Screens */}
      {project.gallery.length > 0 && (
        <Section labelledBy="screens-title" className="!pt-0">
          <h2 id="screens-title" className="display h-section">
            {tp.screens}
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((g) => (
              <li key={g.src}>
                <figure>
                  <a href={g.src} target="_blank" rel="noopener" className="shot block aspect-[4/3]">
                    <Image
                      src={g.src}
                      width={g.width}
                      height={g.height}
                      alt={g.alt[locale]}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="h-full w-full object-cover object-top"
                    />
                  </a>
                  <figcaption className="mt-3 text-sm leading-snug text-ink-2">{g.alt[locale]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Demo */}
      {hasDemo && (
      <div className="frame">
        <section aria-labelledby="demo-title" className="panel overflow-hidden">
          <div className="wrap grid gap-10 py-20 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="demo-title" className="display h-section">
                {tp.demo}
              </h2>
              <p className="lead mt-5 max-w-[40ch]">{tp.demoText}</p>
              <Link href={`${base}/demo`} className="btn btn-primary mt-8">
                {tp.demoOpen}
              </Link>
            </div>
            <ul className="border-t border-ink lg:col-span-7">
              {project.demo.map((d) => (
                <li key={d.slug} className="border-b border-line">
                  <Link href={`${base}/demo/${d.slug}`} className="flex items-baseline justify-between gap-6 py-4 hover:underline">
                    <span className="text-lg">{d.text[locale].title}</span>
                    {d.interactive && (
                      <span className="shrink-0 rounded-full bg-ink px-2.5 py-0.5 text-xs text-white">{t.demo.interactive}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      )}

      {/* Limits, stack, services */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-3">
          {p.limits && (
          <div>
            <h2 className="text-2xl font-medium">{tp.limits}</h2>
            <ul className="mt-5 space-y-3 leading-relaxed text-ink-2">
              {p.limits.map((l) => (
                <li key={l} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-3" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          )}
          {project.stack.length > 0 && (
          <div>
            <h2 className="text-2xl font-medium">{tp.stack}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-line">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          )}
          <div>
            <h2 className="text-2xl font-medium">{tp.services}</h2>
            <ul className="mt-5 space-y-2">
              {project.services.map((slug) => {
                const s = getService(slug);
                return s ? (
                  <li key={slug}>
                    <Link href={`/${locale}/services/${slug}`} className="link">
                      {s.text[locale].name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      </Section>

      <div className="frame pb-2 md:pb-3">
        <section aria-labelledby="cta-title" className="panel px-5 py-20 text-center md:py-24">
          <h2 id="cta-title" className="display h-section mx-auto max-w-[22ch]">
            {t.cta.title}
          </h2>
          <Link href={`/${locale}/brief`} className="btn btn-primary btn-glow mt-9">
            {t.cta.button}
          </Link>
        </section>
      </div>
    </>
  );
}
