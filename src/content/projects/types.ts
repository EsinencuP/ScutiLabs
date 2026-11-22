import type { L10n } from "@/i18n/config";
import type { ServiceSlug } from "@/content/services";
import type { IconName } from "@/components/project/module-icon";

export type ProjectStatus = "live" | "demo" | "development";

type Fact = { label: string; value: string };
type Step = { actor: string; action: string; result: string };
/** A capability: a short name and a one-line caption. */
type Module = { name: string; brief: string };

/**
 * Card text in one language. Projects in development may carry only the core fields;
 * every optional section is rendered only when present.
 */
export type ProjectText = {
  name: string;
  kind: string;
  /** Short process stages, drawn as the stars of the project preview constellation. */
  stages: string[];
  tagline: string;
  summary: string;
  purpose: string[];
  facts: Fact[];
  metaDescription: string;
  workflow?: Step[];
  modules?: Module[];
  strengths?: string[];
  benefits?: string[];
  limits?: string[];
  demoAccess?: string;
};

/** How a project page draws its process and its capabilities. */
export type ProjectLayout = {
  workflow: "relay" | "path" | "orbit";
  capabilities: "icons" | "table" | "solar";
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  year: number;
  /** Shown as a large row on the home page. */
  featured?: boolean;
  services: ServiceSlug[];
  links: { demo?: string; guide?: string; repo?: string };
  demoCredentials?: { login: string; password: string };
  /** Runtime technologies the product's logic depends on (not demo hosting or tooling). */
  stack: string[];
  layout?: ProjectLayout;
  /** One icon per capability, in the same order as `modules`. */
  moduleIcons?: IconName[];
  text: L10n<ProjectText>;
};
