import Link from "next/link";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ProjectVisual } from "./project-visual";
import { ExternalLink, StatusBadge } from "./ui";

type Props = { project: Project; locale: Locale; t: Dictionary };

/** The main project: the largest block, with every capability listed. */
function Flagship({ project, locale, t }: Props) {
  const p = project.text[locale];
  const href = `/${locale}/portfolio/${project.slug}`;
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] bg-white p-3 ring-1 ring-ink">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block transition-transform duration-500 hover:-translate-y-1">
        <ProjectVisual project={project} locale={locale} />
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6 md:px-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-white">
            <span aria-hidden="true" className="size-2 rounded-full bg-scuti" />
            {t.portfolio.flagship}
          </span>
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span>{p.kind}</span>
        </div>
        <h3 className="display h-section mt-5">
          <Link href={href} className="hover:underline hover:decoration-1 hover:underline-offset-[0.12em]">
            {p.name}
          </Link>
        </h3>
        <p className="lead mt-4">{p.tagline}</p>
        {p.modules && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.modules.map((m) => (
              <li key={m.name} className="rounded-full bg-panel px-3 py-1 text-sm text-ink-2">
                {m.name}
              </li>
            ))}
          </ul>
        )}
        <dl className="mt-8 grid gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-ink-3">{f.label}</dt>
              <dd className="mt-1 leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Link href={href} className="btn btn-primary">
            {t.portfolio.open}
            <span className="sr-only">: {p.name}</span>
          </Link>
          {project.links.demo && (
            <ExternalLink href={project.links.demo} hint={t.projectPage.external}>
              {t.projectPage.links.demo}
              <span className="sr-only">: {p.name}</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}

/** A compact tile beside the flagship: the whole tile is one link. */
function Tile({ project, locale, t }: Props) {
  const p = project.text[locale];
  return (
    <article className="group relative flex h-full flex-col rounded-[1.5rem] bg-white p-2.5">
      <ProjectVisual project={project} locale={locale} />
      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-2">
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span>{p.kind}</span>
        </div>
        <h3 className="display h-block mt-4">
          <Link
            href={`/${locale}/portfolio/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-[1.5rem] group-hover:underline group-hover:decoration-1"
          >
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">{p.tagline}</p>
      </div>
    </article>
  );
}

/**
 * The flagship in the centre, the other projects in two columns around it, two tiles each.
 * Below `lg` the flagship comes first, then the tiles in a 2×2 grid.
 */
export function PortfolioLayout({ projects, locale, t }: { projects: Project[]; locale: Locale; t: Dictionary }) {
  const flagship = projects.find((p) => p.flagship) ?? projects[0];
  const rest = projects.filter((p) => p !== flagship);
  const half = Math.ceil(rest.length / 2);
  const place = (i: number) => {
    const col = i < half ? "lg:col-start-1" : "lg:col-start-3";
    const row = (i < half ? i : i - half) + 1;
    return `${col} ${row === 1 ? "lg:row-start-1" : row === 2 ? "lg:row-start-2" : ""}`;
  };

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-5">
      <li className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <Flagship project={flagship} locale={locale} t={t} />
      </li>
      {rest.map((p, i) => (
        <li key={p.slug} className={place(i)}>
          <Tile project={p} locale={locale} t={t} />
        </li>
      ))}
    </ul>
  );
}
