import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Capabilities } from "@/components/project/capabilities";
import { Workflow } from "@/components/project/workflow";
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
  const layout = project.layout ?? { workflow: "relay", capabilities: "icons" };

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

        {(project.links.demo || project.links.guide || project.links.repo) && (
          <div className="mt-9 flex flex-wrap gap-3">
            {project.links.demo && (
              <ExternalLink href={project.links.demo} hint={tp.external} className="btn btn-primary btn-glow">
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
          </div>
        )}
        {project.links.demo && (project.demoCredentials || p.demoAccess) && (
          <div className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ink-2">
            {project.demoCredentials && (
              <p>
                {tp.credentials}: <span className="select-all font-medium text-ink">{project.demoCredentials.login}</span>
                {" / "}
                <span className="select-all font-medium text-ink">{project.demoCredentials.password}</span>
              </p>
            )}
            {p.demoAccess && <p className="mt-1 text-ink-3">{p.demoAccess}</p>}
          </div>
        )}

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

      {/* What it is: a large statement so it holds its own after the hero */}
      <Section labelledBy="purpose-title">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="purpose-title" className="flex items-center gap-3 text-lg font-medium lg:col-span-3 lg:items-start lg:pt-3">
            <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-scuti lg:mt-2" />
            {tp.purpose}
          </h2>
          <div className="lg:col-span-9">
            <p className="display text-[clamp(1.55rem,2.6vw,2.4rem)] leading-[1.22] tracking-[-0.025em]">{p.purpose[0]}</p>
            {p.purpose.slice(1).map((para) => (
              <p key={para.slice(0, 32)} className="mt-8 max-w-[64ch] text-lg leading-relaxed text-ink-2 md:text-xl">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {p.workflow && (
        <div className="frame">
          <section aria-labelledby="workflow-title" className="panel py-20 md:py-24">
            <div className="wrap">
              <h2 id="workflow-title" className="display h-section">
                {tp.workflow}
              </h2>
              <p className="lead mt-4 max-w-[52ch]">{tp.workflowLead}</p>
              <div className="mt-12">
                <Workflow steps={p.workflow} variant={layout.workflow} center={p.name} />
              </div>
            </div>
          </section>
        </div>
      )}

      {p.modules && (
        <Section labelledBy="modules-title">
          <h2 id="modules-title" className="display h-section">
            {tp.modules}
          </h2>
          <div className="mt-12">
            <Capabilities modules={p.modules} icons={project.moduleIcons ?? []} variant={layout.capabilities} name={p.name} />
          </div>
        </Section>
      )}

      {p.benefits && p.strengths && (
        <div className="frame">
          <section className="panel py-20 md:py-24">
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
              {project.services.map((s) => {
                const service = getService(s);
                return service ? (
                  <li key={s}>
                    <Link href={`/${locale}/services/${s}`} className="link">
                      {service.text[locale].name}
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
          <p className="lead mx-auto mt-5 max-w-[60ch]">{tp.custom}</p>
          <Link href={`/${locale}/brief`} className="btn btn-primary btn-glow mt-9">
            {t.cta.button}
          </Link>
        </section>
      </div>
    </>
  );
}
