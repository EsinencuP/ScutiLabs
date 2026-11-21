import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

const field = [
  "   .        +          .     ",
  "        .        .        +  ",
  " +    .     ( )     .        ",
  "    .     .     .       .    ",
  "  .           .      +    .  ",
].join("\n");

async function requestLocale() {
  const header = (await headers()).get("x-site-locale") ?? "";
  return isLocale(header) ? header : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await requestLocale());
  return { title: t.notFound.title };
}

export default async function NotFound() {
  const locale = await requestLocale();
  const t = getDictionary(locale);

  return (
    <div className="frame pt-2 md:pt-3">
      <section className="panel flex min-h-[calc(100svh-1rem)] flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
        <pre aria-hidden="true" className="glyph-art text-sm text-ink-3">
          {field}
        </pre>
        <p className="display mt-6 text-[clamp(6rem,18vw,13rem)] leading-none">404</p>
        <h1 className="mt-4 text-2xl font-medium">{t.notFound.title}</h1>
        <p className="lead mt-3 max-w-[44ch]">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-9">
          {t.notFound.home}
        </Link>
      </section>
    </div>
  );
}
