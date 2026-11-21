import type { Locale } from "./config";
import en from "./dictionaries/en";
import ro from "./dictionaries/ro";
import ru, { type Dictionary } from "./dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = { ru, ro, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replace `{key}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export type { Dictionary };
