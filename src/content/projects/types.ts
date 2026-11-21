import type { L10n } from "@/i18n/config";
import type { ServiceSlug } from "@/content/services";

export type ProjectStatus = "live" | "demo" | "development";
export type InteractiveKind = "stock-ledger";

export type Shot = { src: string; width: number; height: number; alt: L10n };

type Fact = { label: string; value: string };
type Step = { actor: string; action: string; result: string };
type Module = { name: string; text: string };

/**
 * Card text in one language. Projects in development may carry only the core fields;
 * every optional section is rendered only when present.
 */
export type ProjectText = {
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  purpose: string[];
  facts: Fact[];
  metaDescription: string;
  workflow?: Step[];
  modules?: Module[];
  strengths?: string[];
  benefits?: string[];
  usageTitle?: string;
  usage?: string[];
  limits?: string[];
  demoAccess?: string;
};

export type DemoPart = {
  slug: string;
  shot?: Shot;
  interactive?: InteractiveKind;
  text: L10n<{ title: string; summary: string; points: string[] }>;
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  year: number;
  /** Shown as a large row on the home page. */
  featured?: boolean;
  services: ServiceSlug[];
  links: { demo?: string; guide?: string; repo?: string; related?: { href: string; label: L10n } };
  demoCredentials?: { login: string; password: string };
  stack: string[];
  cover?: Shot;
  gallery: Shot[];
  text: L10n<ProjectText>;
  demo: DemoPart[];
};

export const shot = (dir: string, name: string, width: number, height: number, alt: L10n): Shot => ({
  src: `/projects/${dir}/${name}.png`,
  width,
  height,
  alt,
});
