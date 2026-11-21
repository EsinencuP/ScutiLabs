import Link from "next/link";
import { services } from "@/content/services";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { asciiDisc } from "@/lib/halftone";
import { contacts, hasContacts } from "@/lib/site";
import { LogoMark } from "./logo";

// The star sets at the bottom of the page, mirroring the hero where it rises.
const disc = asciiDisc(120, 30, 0.55, 32);

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="frame pb-2 md:pb-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-white">
        <div className="wrap relative grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-semibold">
              <LogoMark className="size-7" />
              scutilabs
            </Link>
            <p className="mt-5 max-w-[38ch] text-white/72">{t.footer.about}</p>
            <p className="mt-4 max-w-[44ch] text-sm text-white/50">{t.footer.name}</p>
            {hasContacts && (
              <div className="mt-8">
                <h2 className="text-sm text-white/50">{t.footer.contacts}</h2>
                <ul className="mt-3 space-y-2">
                  {contacts.email && (
                    <li>
                      <a className="hover:underline" href={`mailto:${contacts.email}`}>
                        {contacts.email}
                      </a>
                    </li>
                  )}
                  {contacts.telegram && (
                    <li>
                      <a className="hover:underline" href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer">
                        Telegram: @{contacts.telegram}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <nav aria-label={t.nav.footer} className="grid gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="text-sm text-white/50">{t.footer.sections}</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link className="hover:underline" href={`/${locale}/services`}>
                    {t.nav.services}
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={`/${locale}/portfolio`}>
                    {t.nav.portfolio}
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={`/${locale}#start`}>
                    {t.nav.start}
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={`/${locale}#faq`}>
                    {t.nav.faq}
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href={`/${locale}/brief`}>
                    {t.nav.brief}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm text-white/50">{t.footer.directions}</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className="hover:underline" href={`/${locale}/services/${s.slug}`}>
                      {s.text[locale].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm text-white/50">{t.nav.language}</h2>
              <ul className="mt-4 space-y-2.5">
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      className={l === locale ? "underline underline-offset-4" : "hover:underline"}
                      href={`/${l}`}
                      hrefLang={l}
                      lang={l}
                      aria-current={l === locale ? "true" : undefined}
                    >
                      {localeNames[l]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div aria-hidden="true" className="relative h-24 overflow-hidden md:h-40">
          <pre className="glyph-art absolute left-1/2 top-4 -translate-x-1/2 text-[7px] text-white/35 md:text-[11px]">{disc}</pre>
        </div>
        <div className="wrap relative flex flex-wrap items-center justify-between gap-4 border-t border-white/12 py-6 text-sm text-white/55">
          <p>© {year} scutilabs</p>
          <Link href={`/${locale}/privacy`} className="hover:text-white hover:underline">
            {t.nav.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
