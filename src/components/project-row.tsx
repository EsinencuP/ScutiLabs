import Link from "next/link";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ProjectVisual } from "./project-visual";
import { StatusBadge } from "./ui";

export function ProjectRow({
  project,
  locale,
  t,
  flip = false,
  headingLevel = "h3",
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const p = project.text[locale];
  const Heading = headingLevel;
  const href = `/${locale}/portfolio/${project.slug}`;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span>{p.kind}</span>
        </div>
        <Heading className="display h-section mt-5">
          <Link href={href} className="hover:underline hover:decoration-1 hover:underline-offset-[0.12em]">
            {p.name}
          </Link>
        </Heading>
        <p className="lead mt-5 max-w-[42ch]">{p.tagline}</p>
        {p.modules && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.modules.slice(0, 6).map((m) => (
              <li key={m.name} className="rounded-full bg-white px-3 py-1 text-sm text-ink-2 ring-1 ring-line">
                {m.name}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={href} className="btn btn-primary">
            {t.portfolio.open}
            <span className="sr-only">: {p.name}</span>
          </Link>
          {project.demo.length > 0 && (
            <Link href={`${href}/demo`} className="btn btn-ghost">
              {t.projectPage.demo}
              <span className="sr-only">: {p.name}</span>
            </Link>
          )}
        </div>
      </div>
      <div className={`lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block transition-transform duration-500 hover:-translate-y-1">
          <ProjectVisual project={project} locale={locale} />
        </Link>
      </div>
    </article>
  );
}
