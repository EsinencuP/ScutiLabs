import { automationHub } from "./automation-hub";
import { crm } from "./crm";
import { evoErp } from "./evo-erp";
import { revenueWorkspace } from "./revenue-workspace";
import { talentco } from "./talentco";
import type { Project } from "./types";

export type { Project, ProjectLayout, ProjectStatus } from "./types";

/** Catalogue order. */
export const projects: Project[] = [crm, evoErp, revenueWorkspace, talentco, automationHub];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
