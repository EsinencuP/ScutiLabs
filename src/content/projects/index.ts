import { aiPdfEditor } from "./ai-pdf-editor";
import { crmPortfolio } from "./crm-portfolio";
import { evoErp } from "./evo-erp";
import { talentco } from "./talentco";
import type { Project } from "./types";
import { upcomingProjects } from "./upcoming";

export type { DemoPart, InteractiveKind, Project, ProjectStatus, Shot } from "./types";

/** Catalogue order: open projects first, then those still in development. */
export const projects: Project[] = [evoErp, crmPortfolio, talentco, aiPdfEditor, ...upcomingProjects];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getDemoPart(project: Project, part: string) {
  return project.demo.find((d) => d.slug === part);
}
