export const locales = ["ru", "ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  ro: "Română",
  en: "English",
};

export const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  ro: "ro_RO",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text that exists in every site language. */
export type L10n<T = string> = Record<Locale, T>;
