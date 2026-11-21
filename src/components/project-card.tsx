import Link from "next/link";
import type { Project } from "@/content/projects";
import { getService } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ProjectVisual } from "./project-visual";
import { StatusBadge } from "./ui";

/** Compact catalogue entry: the whole card is one link to the project page. */
export function ProjectCard({ project, locale, t }: { project: Project; locale: Locale; t: Dictionary }) {
  const p = project.text[locale];
  return (
    <article className="group relative flex h-full flex-col rounded-[1.5rem] bg-white p-3">
      <ProjectVisual project={project} locale={locale} sizes="(min-width: 1024px) 40vw, 100vw" />
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span>{p.kind}</span>
          <span className="text-ink-3">{project.year}</span>
        </div>
        <h3 className="display h-block mt-4">
          <Link href={`/${locale}/portfolio/${project.slug}`} className="after:absolute after:inset-0 after:rounded-[1.5rem] group-hover:underline group-hover:decoration-1">
            {p.name}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ink-2">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2 pt-1">
          {project.services.map((slug) => {
            const s = getService(slug);
            return s ? (
              <li key={slug} className="rounded-full bg-panel px-3 py-1 text-sm text-ink-2">
                {s.text[locale].name}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </article>
  );
}
