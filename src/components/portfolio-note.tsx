import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LogoMark } from "./logo";

/** Explains that the portfolio shows capabilities; every client gets an individual audit and build. */
export function PortfolioNote({
  locale,
  note,
  className = "",
}: {
  locale: Locale;
  note: Dictionary["portfolio"]["note"];
  className?: string;
}) {
  return (
    <aside
      className={`grid items-center gap-6 rounded-[1.5rem] bg-white p-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-8 md:p-8 ${className}`}
    >
      <LogoMark className="hidden size-12 text-ink md:block" />
      <div>
        <h3 className="text-xl font-medium leading-snug">{note.title}</h3>
        <p className="mt-2 max-w-[72ch] leading-relaxed text-ink-2">{note.text}</p>
      </div>
      <Link href={`/${locale}/brief`} className="btn btn-primary justify-self-start md:justify-self-end">
        {note.cta}
      </Link>
    </aside>
  );
}
